#!/usr/bin/env node
/**
 * The standard tasks of a Profinity 2.3 documentation review, behind one command (scripts/REVIEW.md).
 *
 * Usage: npm run review -- <task> [options]
 *
 *   check              Lint, build, URL check and tests. Run before calling any docs change done.
 *   status             Ledger counts, blockers still open, pages awaiting re-review, and objective counts.
 *   prepass            Fresh objective pre-pass of every page.
 *   score              Fresh pre-pass, then scores and a ranking from the ledger, with the change since last time.
 *   chunks [--run n]   Split the pages into chunks of up to 10 for review agents, in tasks/reviews/<run>/.
 *   phrasing [--run n] Export every line that may break the positive-phrasing rule, in batches of about 60.
 *   prompt <kind> [id] Print the brief for an agent step: page, blocker, section, sweep or meaning.
 *   all                check, prepass, score, status.
 *
 * Output goes to tasks/reviews/ (local, not committed). <run> defaults to today's date.
 */

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const { phrasingHits, classify } = require('./review-pages');

const repoRoot = path.resolve(__dirname, '..');
const docsRoot = path.join(repoRoot, 'docs', 'Profinity_Software', 'Profinity_Version_2.3');
const reviews = path.join(repoRoot, 'tasks', 'reviews');
const files = {
  ledger: path.join(reviews, 'ledger.json'),
  prepass: path.join(reviews, 'prepass-latest.json'),
  ranking: path.join(reviews, 'ranking-latest.md'),
  scores: path.join(reviews, 'scores-latest.json'),
};
const CHUNK_SIZE = 10;
const BATCH_SIZE = 60;

const today = () => new Date().toISOString().slice(0, 10);
const read = (file) => JSON.parse(fs.readFileSync(file, 'utf8'));
const rel = (file) => path.relative(repoRoot, file);

function run(cmd, args, opts = {}) {
  const r = spawnSync(cmd, args, { cwd: repoRoot, encoding: 'utf8', ...opts });
  return { code: r.status === null ? 1 : r.status, out: `${r.stdout || ''}${r.stderr || ''}` };
}

const node = (script, ...args) => run('node', [path.join(__dirname, script), ...args]);

/** Split pages into chunks of up to `size`, keeping each top-level section together. */
function makeChunks(pages, size = CHUNK_SIZE) {
  const bySection = {};
  for (const p of pages) {
    const section = p.page.includes('/') ? p.page.split('/')[0] : 'Home';
    (bySection[section] ||= []).push(p);
  }
  const chunks = [];
  for (const [section, ps] of Object.entries(bySection)) {
    const n = Math.ceil(ps.length / size);
    const each = Math.ceil(ps.length / n);
    for (let i = 0; i < ps.length; i += each) chunks.push({ section, pages: ps.slice(i, i + each) });
  }
  return chunks.map((c, i) => ({ id: String(i + 1).padStart(2, '0'), ...c }));
}

function batchesOf(items, size = BATCH_SIZE) {
  const n = Math.max(1, Math.ceil(items.length / size));
  const each = Math.ceil(items.length / n);
  return Array.from({ length: n }, (_, i) => items.slice(i * each, (i + 1) * each)).filter((b) => b.length);
}

/** The briefs for the agent steps (REVIEW_GUIDE.md section 10). Each points at the guides and names the files. */
function promptFor(kind, id, runName = today()) {
  const dir = `${rel(path.join(reviews, runName))}`;
  const pages = `${rel(docsRoot)}/`;
  const guides = 'REVIEW_GUIDE.md and STYLE_GUIDE.md in full';
  const briefs = {
    page: `You are a page reviewer for the Profinity 2.3 documentation, as described in section 10 of REVIEW_GUIDE.md.
Read ${guides}.
Pages, relative to ${pages}: ${dir}/chunks/pages-${id}.txt
Pre-pass entries for those pages: ${dir}/chunks/prepass-${id}.json
Write your findings, in the "Reviewer output" format, to ${dir}/findings/findings-${id}.json
You see source only, so leave out visual flow. Do not edit any docs file and do not open source code.`,
    blocker: `You are the blocker reviewer for the Profinity 2.3 documentation, as described under "Blocker pass" in section 10 of REVIEW_GUIDE.md.
Read ${guides}.
Pages, relative to ${pages}: ${dir}/chunks/pages-${id}.txt
The page review's findings: ${dir}/findings/findings-${id}.json
Write your output to ${dir}/findings/blockers-${id}.json
Do not edit any docs file and do not open source code.`,
    section: `You are the section reviewer for the "${id}" section of the Profinity 2.3 documentation, as described in section 10 of REVIEW_GUIDE.md.
Read ${guides}, especially section 6.
The section's pages are under ${pages}${id}/. The page findings are in ${dir}/findings/.
Apply only the section-level checks in section 6. Write { "section": "${id}", "findings": [...], "queries": [...] } in an array to ${dir}/findings/section-${id}.json
Do not edit any docs file and do not open source code.`,
    sweep: `You are a sweep agent for the phrasing sweep described under "Phrasing sweep" in section 10 of REVIEW_GUIDE.md.
Read that subsection and STYLE_GUIDE.md sections 2.4 and 2.5.
Batch: ${dir}/phrasing/batch-${id}.json
Decide keep or rewrite for every item, and write the array to ${dir}/phrasing/sweep-${id}.json
Do not open the docs pages or source code.`,
    meaning: `You are the meaning checker for the phrasing sweep described under "Phrasing sweep" in section 10 of REVIEW_GUIDE.md.
Read that subsection and STYLE_GUIDE.md section 2.4.
Sweep output: ${dir}/phrasing/sweep-${id}.json. Batch with the surrounding lines: ${dir}/phrasing/batch-${id}.json
Check every rewrite and write the full array to ${dir}/phrasing/checked-${id}.json
Do not open the docs pages or source code.`,
  };
  if (!briefs[kind]) throw new Error(`prompt kind must be one of ${Object.keys(briefs).join(', ')}`);
  if (!id) throw new Error(`prompt ${kind} needs an id: a chunk number, a batch number or, for section, the section name`);
  return `${briefs[kind]}\n\nA review of many pages runs these steps with the lowest-cost model that works (REVIEW_GUIDE.md section 10). Verify any claim about product behaviour against the code before a fix, never from a finding alone.`;
}

const results = [];
function step(name, fn) {
  const r = fn();
  results.push({ name, ...r });
  console.log(`${r.ok ? 'PASS' : r.warn ? 'WARN' : 'FAIL'}  ${name}${r.detail ? `: ${r.detail}` : ''}`);
  return r;
}

function check() {
  step('lint', () => {
    const r = node('lint-docs.js');
    const m = r.out.match(/Findings: (\d+) errors, (\d+) warnings/);
    const failed = r.out.split('\n').filter((l) => /^\s+docs\/.*\(\d+\)\s*$/.test(l)).map((l) => l.trim());
    return { ok: r.code === 0, detail: m ? `${m[1]} errors, ${m[2]} warnings${failed.length ? `; ${failed.join(', ')}` : ''}` : 'no summary' };
  });
  step('build', () => {
    const r = run(path.join(repoRoot, 'venv', 'bin', 'mkdocs'), ['build', '-q']);
    const lines = r.out.split('\n').filter((l) => /WARNING|ERROR/.test(l));
    const errors = lines.filter((l) => /ERROR/.test(l));
    return { ok: r.code === 0 && !lines.length, warn: r.code === 0 && !errors.length && lines.length > 0,
      detail: lines.length ? `${lines.length} warning/error lines; first: ${lines[0].trim().slice(0, 140)}` : '' };
  });
  step('urls', () => {
    const r = node('verify-2.3-doc-urls.js');
    const m = r.out.match(/Pages: (\d+)\s+Missing on disk: (\d+)\s+HTTP failures: (\d+)/);
    return { ok: r.code === 0, detail: m ? `${m[1]} pages, ${m[2]} missing, ${m[3]} HTTP failures` : '' };
  });
  step('tests', () => {
    const r = run('npm', ['--prefix', __dirname, 'run', 'test-lint']);
    const pass = (r.out.match(/# pass (\d+)/) || [])[1];
    const fail = (r.out.match(/# fail (\d+)/) || [])[1];
    return { ok: r.code === 0, detail: `${pass} passed, ${fail} failed` };
  });
  return results.every((r) => r.ok || r.warn);
}

function prepass() {
  fs.mkdirSync(reviews, { recursive: true });
  const r = node('review-pages.js', 'prepass', files.prepass);
  console.log(r.out.trim());
  return r.code === 0;
}

function score() {
  if (!fs.existsSync(files.ledger)) throw new Error(`No ledger at ${rel(files.ledger)}. Build one with: npm run review-ledger -- init`);
  const previous = fs.existsSync(files.scores) ? read(files.scores) : null;
  if (!prepass()) return false;
  const r = node('review-ledger.js', 'score', files.ledger, files.prepass, '--out', files.ranking, '--json', files.scores);
  console.log(r.out.trim());
  const now = read(files.scores);
  const mean = (s) => Math.round(s.pages.reduce((n, p) => n + p.score, 0) / s.pages.length);
  const bands = now.pages.reduce((acc, p) => ({ ...acc, [p.band]: (acc[p.band] || 0) + 1 }), {});
  console.log(`Mean page score ${mean(now)}${previous ? ` (was ${mean(previous)})` : ''}. Bands: ${JSON.stringify(bands)}`);
  console.log(`Ranking: ${rel(files.ranking)}`);
  return r.code === 0;
}

function status() {
  if (!fs.existsSync(files.ledger)) throw new Error(`No ledger at ${rel(files.ledger)}.`);
  console.log(node('review-ledger.js', 'summary', files.ledger).out.trim());
  const ledger = read(files.ledger);
  const open = ledger.findings.filter((f) => ['open', 'deferred'].includes(f.status) && f.severity === 'blocker');
  const byPage = open.reduce((acc, f) => ({ ...acc, [f.page || `section ${f.section}`]: (acc[f.page || `section ${f.section}`] || 0) + 1 }), {});
  const top = Object.entries(byPage).sort((a, b) => b[1] - a[1]).slice(0, 10);
  console.log(`\nBlockers counting: ${open.length} on ${Object.keys(byPage).length} pages. Most:`);
  for (const [p, n] of top) console.log(`  ${n}  ${p}`);
  const pending = Object.entries(ledger.pages).filter(([, m]) => m.recheck).map(([p]) => p);
  console.log(`\nAwaiting re-review: ${pending.length ? pending.join(', ') : 'none'}`);
  if (fs.existsSync(files.prepass)) {
    const pre = read(files.prepass);
    const c = {};
    for (const p of pre) for (const f of [...p.auto, ...p.candidates]) c[f.check] = (c[f.check] || 0) + 1;
    console.log(`\nObjective checks (${rel(files.prepass)}):`);
    for (const [k, v] of Object.entries(c).sort((a, b) => b[1] - a[1])) console.log(`  ${String(v).padStart(4)}  ${k}`);
  } else {
    console.log('\nNo pre-pass yet: run npm run review -- prepass');
  }
  return true;
}

function chunks(runName) {
  const dir = path.join(reviews, runName);
  fs.mkdirSync(path.join(dir, 'chunks'), { recursive: true });
  fs.mkdirSync(path.join(dir, 'findings'), { recursive: true });
  if (!prepass()) return false;
  const list = makeChunks(read(files.prepass));
  for (const c of list) {
    fs.writeFileSync(path.join(dir, 'chunks', `pages-${c.id}.txt`), `${c.pages.map((p) => p.page).join('\n')}\n`);
    fs.writeFileSync(path.join(dir, 'chunks', `prepass-${c.id}.json`), JSON.stringify(c.pages, null, 1));
  }
  fs.writeFileSync(path.join(dir, 'chunks', 'chunks.json'), JSON.stringify(list.map((c) => ({ id: c.id, section: c.section, pages: c.pages.length })), null, 1));
  console.log(`${list.length} chunks of up to ${CHUNK_SIZE} pages -> ${rel(path.join(dir, 'chunks'))}`);
  console.log(`Next: npm run review -- prompt page <id>, then prompt blocker <id>, and prompt section <name>.`);
  return true;
}

function phrasing(runName) {
  const dir = path.join(reviews, runName, 'phrasing');
  fs.mkdirSync(dir, { recursive: true });
  const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : e.name.endsWith('.md') ? [path.join(d, e.name)] : []));
  const items = walk(docsRoot).sort().flatMap((file) => {
    const text = fs.readFileSync(file, 'utf8');
    const lines = text.split('\n');
    const fm = text.match(/^---[\s\S]*?\n---/);
    const kinds = classify(lines, fm ? fm[0].split('\n').length : 0);
    return phrasingHits(lines, kinds).map((h) => ({
      page: path.relative(docsRoot, file), line: h.line, patterns: h.patterns, text: h.text,
      before: (lines[h.line - 2] || '').trim(), after: (lines[h.line] || '').trim(),
    }));
  });
  fs.writeFileSync(path.join(dir, 'candidates.json'), JSON.stringify(items, null, 1));
  const batches = batchesOf(items);
  batches.forEach((b, i) => fs.writeFileSync(path.join(dir, `batch-${String(i + 1).padStart(2, '0')}.json`), JSON.stringify(b, null, 1)));
  console.log(`${items.length} lines on ${new Set(items.map((i) => i.page)).size} pages, in ${batches.length} batches -> ${rel(dir)}`);
  console.log('Next: npm run review -- prompt sweep <batch>, then prompt meaning <batch>.');
  return true;
}

if (require.main === module) {
  const [task, ...args] = process.argv.slice(2);
  const flag = (name) => {
    const i = args.indexOf(name);
    return i >= 0 ? args.splice(i, 2)[1] : undefined;
  };
  const runName = flag('--run') || today();
  const tasks = {
    check: () => check(),
    status: () => status(),
    prepass: () => prepass(),
    score: () => score(),
    chunks: () => chunks(runName),
    phrasing: () => phrasing(runName),
    prompt: () => { console.log(promptFor(args[0], args[1], runName)); return true; },
    all: () => { const ok = check(); return [prepass(), score(), status()].every(Boolean) && ok; },
  };
  if (!tasks[task]) {
    console.error(`Usage: npm run review -- <${Object.keys(tasks).join('|')}> (see the header of scripts/review.js)`);
    process.exit(2);
  }
  try {
    process.exit(tasks[task]() ? 0 : 1);
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
}

module.exports = { makeChunks, batchesOf, promptFor };
