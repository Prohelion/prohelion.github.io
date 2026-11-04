#!/usr/bin/env node
/**
 * Support an editorial review of the Profinity 2.3 documentation (REVIEW_GUIDE.md).
 *
 * prepass  Runs the objective checks on every page and writes them as JSON. Each page gets
 *          `auto` findings, which the reviewer accepts as given, and `candidates`, which the
 *          reviewer confirms or rejects with a quoted line. Reuses the lint structure checks
 *          and adds the review checks the lint does not hold.
 * phrasing Lists every sentence that may use a negative where a positive form says the same thing
 *          (STYLE_GUIDE 2.4), with the lines either side, for the phrasing sweep.
 * apply-phrasing  Applies the rewrites the author accepted, only where the line is unchanged.
 * score    Reads the prepass file and the reviewers' findings files, applies the scoring
 *          model in REVIEW_GUIDE.md section 8, and writes a ranked Markdown summary.
 *
 * Usage:
 *   npm run review-prepass -- <out.json> [file-or-folder]
 *   npm run review-phrasing -- <out.json> [file-or-folder]
 *   npm run review-apply-phrasing -- <decisions.json>
 *   npm run review-score -- <prepass.json> <findings.json>... --out <ranking.md> [--json <scores.json>]
 */

const fs = require('fs');
const path = require('path');
const { structureFindings } = require('./lint-docs');

const repoRoot = path.resolve(__dirname, '..');
const defaultRoot = path.join(repoRoot, 'docs', 'Profinity_Software', 'Profinity_Version_2.3');

// REVIEW_GUIDE.md section 8. Visual flow is scored only when a reviewer saw the built page.
const CATEGORIES = {
  reader: 25, audience: 15, consistency: 10, voice: 15, structure: 15, flow: 10, visual: 10,
};
const DEDUCTION = { blocker: 10, improvement: 4, polish: 1 };
const BANDS = [[90, 'Ready'], [75, 'Good'], [60, 'Needs revision'], [40, 'Substantial rework'], [0, 'Rewrite']];
const NO_NEXT_STEP_TYPES = ['reference'];
const MAX_PARAGRAPH_SENTENCES = 4;
const WIDESPREAD = 3;

// Lint rules that are review findings, with the category they score against.
const LINT_CATEGORY = {
  FrontMatter: 'structure', Description: 'structure', Title: 'structure', PageType: 'structure',
  Owner: 'structure', LastReviewed: 'structure', Headings: 'structure', Structure: 'structure',
  EmptyListItem: 'structure', Procedure: 'reader',
};

// Negative phrasing (STYLE_GUIDE 2.4). These are leads for a reviewer, not findings: a negative is right for a
// safety prohibition, a symptom, a state defined by an absence, or a contrast the reader needs.
const NEGATION = /\b(not|no|never|without|cannot|none|nothing|neither|nor|unless)\b|n't\b/gi;
const PHRASING_PATTERNS = {
  'double-negative': (s) => (s.match(NEGATION) || []).length >= 2,
  'negative-for-positive': (s) => /\b(with no|without (a|an|any|the) \w+|and not|but not|nothing else|not only)\b/i.test(s)
    || /\b(is|are|does|do)\s+not\s+(shown|required|needed|available|possible|supported|included|allowed|enabled)\b/i.test(s),
  'negative-condition': (s) => /\b(not|cannot|no)\b[^.]*\b(until|unless|except|other than|apart from)\b/i.test(s),
  'position-reference': (s) => /\b(the (last|first) (\w+ )?(rows?|states?|entries|items|columns?)|(table|section|list|image|diagram|example|panel) (above|below)|(above|below) (table|list|section))\b/i.test(s),
};

/** The reader-facing words of a line: no code, link targets, bold UI labels, quoted output or one-word table cells. */
function phrasingText(line, kind) {
  let s = line.replace(/`[^`]*`/g, '').replace(/\]\([^)]*\)/g, ']').replace(/\{[^}]*\}/g, '').replace(/:[a-z0-9-]+:/g, '')
    .replace(/\*\*[^*]+\*\*/g, 'LABEL').replace(/"[^"]*"/g, 'QUOTE');
  if (kind === 'table') s = s.split('|').filter((cell) => cell.trim().split(/\s+/).length >= 4).join(' | ');
  return s;
}

function phrasingHits(lines, kinds) {
  return lines.flatMap((line, i) => {
    if (!['prose', 'list', 'table', 'admonition'].includes(kinds[i])) return [];
    const s = phrasingText(line, kinds[i]);
    const patterns = Object.keys(PHRASING_PATTERNS).filter((p) => PHRASING_PATTERNS[p](s));
    return patterns.length ? [{ line: i + 1, text: line.trim(), patterns }] : [];
  });
}

function finding(check, severity, category, line, evidence) {
  return { check, severity, category, line, evidence: String(evidence).trim().slice(0, 160) };
}

function listPages(target) {
  const stat = fs.statSync(target);
  if (stat.isFile()) return [target];
  return fs.readdirSync(target, { withFileTypes: true }).flatMap((e) => {
    const full = path.join(target, e.name);
    if (e.isDirectory()) return listPages(full);
    return e.name.endsWith('.md') ? [full] : [];
  }).sort();
}

function frontMatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const data = {};
  if (!m) return { data, start: 0 };
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (kv) data[kv[1]] = kv[2].trim().replace(/^["']|["']$/g, '');
  }
  return { data, start: m[0].split('\n').length };
}

/** Label each line as fm, code, admonition, blank, heading, table, list, html or prose. */
function classify(lines, start) {
  const kinds = [];
  let inCode = false;
  let inAdmonition = false;
  lines.forEach((raw, i) => {
    const s = raw.trim();
    if (i < start) return kinds.push('fm');
    if (/^(`{3,}|~{3,})/.test(s)) {
      inCode = !inCode;
      return kinds.push('code');
    }
    if (inCode) return kinds.push('code');
    if (/^(!!!|\?\?\?)/.test(s)) {
      inAdmonition = true;
      return kinds.push('admonition');
    }
    if (inAdmonition) {
      if (s === '') return kinds.push('blank');
      if (/^(\s{4}|\t)/.test(raw)) return kinds.push('admonition');
      inAdmonition = false;
    }
    if (s === '') return kinds.push('blank');
    if (s.startsWith('#')) return kinds.push('heading');
    if (s.startsWith('|')) return kinds.push('table');
    if (/^([-*+]|\d+\.)\s/.test(s)) return kinds.push('list');
    if (/^\s{2,}/.test(raw) && kinds[kinds.length - 1] === 'list') return kinds.push('list');
    if (s.startsWith('<') || s.startsWith('![')) return kinds.push('html');
    return kinds.push('prose');
  });
  return kinds;
}

/** Table header rows: a table line followed by its |---| separator. */
function tableHeaders(lines, kinds) {
  return lines.filter((l, i) => kinds[i] === 'table' && /^\s*\|[\s:|-]+\|\s*$/.test(lines[i + 1] || ''));
}

function prepassPage(file, root) {
  const text = fs.readFileSync(file, 'utf8');
  const rel = path.relative(root, file);
  const { data, start } = frontMatter(text);
  const lines = text.split('\n');
  const kinds = classify(lines, start);
  const type = data.type || '';
  const auto = [];
  const candidates = [];
  const text_ = (i) => lines[i].replace(/`[^`]*`/g, '').replace(/\]\([^)]*\)/g, ']');
  const inProse = (i) => ['prose', 'list', 'table', 'admonition', 'heading'].includes(kinds[i]);

  for (const f of structureFindings(text).findings) {
    if (!LINT_CATEGORY[f.rule]) continue;
    const severity = f.rule === 'Procedure' ? 'improvement' : 'polish';
    auto.push(finding(`lint-${f.rule}`, severity, LINT_CATEGORY[f.rule], f.line, f.message));
  }

  // Paragraphs over four sentences (STYLE_GUIDE 2.3). Each sentence starts on its own line.
  const long = [];
  let run = 0;
  let runStart = 0;
  [...kinds, 'blank'].forEach((k, i) => {
    if (k === 'prose') {
      if (run === 0) runStart = i;
      run += Math.max(1, (lines[i].match(/[.?!](\s|$)/g) || []).length);
    } else {
      if (run > MAX_PARAGRAPH_SENTENCES) long.push({ line: runStart + 1, run });
      run = 0;
    }
  });
  if (long.length) {
    auto.push(finding('paragraph-over-four-sentences', long.length >= WIDESPREAD ? 'improvement' : 'polish', 'flow',
      long[0].line, `${long.length} paragraph(s), longest ${Math.max(...long.map((p) => p.run))} sentences`));
  }

  // Troubleshooting written as the three-column table (STYLE_GUIDE section 1)
  const headings = lines.map((l, i) => ({ i, m: kinds[i] === 'heading' && l.match(/^(#+)\s+(.*)$/) }))
    .filter((h) => h.m).map((h) => ({ i: h.i, level: h.m[1].length, text: h.m[2] }));
  const trouble = headings.find((h) => /troubleshoot/i.test(h.text) || /^fix /i.test(h.text));
  if (trouble) {
    const next = headings.find((h) => h.i > trouble.i && h.level <= trouble.level);
    const section = lines.slice(trouble.i, next ? next.i : lines.length).join('\n').toLowerCase();
    if (!['what you see', 'cause', 'what to do'].every((c) => section.includes(c))) {
      auto.push(finding('troubleshooting-not-table', 'improvement', 'structure', trouble.i + 1, lines[trouble.i]));
    }
  }

  // Cross-references introduced with "see" (STYLE_GUIDE section 6)
  const see = lines.map((_, i) => i).filter((i) => inProse(i) && /\b[Ss]ee \[/.test(lines[i]));
  if (see.length) {
    auto.push(finding('link-see-not-refer-to', 'polish', 'structure', see[0] + 1, `${see.length} line(s), first: ${lines[see[0]]}`));
  }

  // Project rules (REVIEW_GUIDE section 3)
  if (!rel.includes('Release_Notes')) {
    const patch = lines.findIndex((l, i) => inProse(i) && /\b2\.3\.\d/.test(text_(i)));
    if (patch >= 0) auto.push(finding('version-patch-number', 'polish', 'consistency', patch + 1, lines[patch]));
  }
  const vPrefix = lines.findIndex((l, i) => inProse(i) && /(?<![\w/])[Vv]2\.\d/.test(text_(i)));
  if (vPrefix >= 0) auto.push(finding('version-v-prefix-in-prose', 'polish', 'consistency', vPrefix + 1, lines[vPrefix]));
  const client = lines.findIndex((l) => /\b(Rinstrum|Vaulta)\b/i.test(l));
  if (client >= 0) auto.push(finding('internal-client-named', 'improvement', 'consistency', client + 1, lines[client]));
  const oldLink = lines.findIndex((l) => /\]\([^)]*Profinity_Version_(1|2\.[0-2])\b/.test(l));
  if (oldLink >= 0) candidates.push(finding('link-to-earlier-version', 'improvement', 'consistency', oldLink + 1, lines[oldLink]));

  // Closing next step (STYLE_GUIDE section 1). Reference pages are exempt (REVIEW_GUIDE section 3).
  if (!NO_NEXT_STEP_TYPES.includes(type)) {
    const last = kinds.map((k, i) => (['prose', 'list', 'table', 'admonition', 'html'].includes(k) ? i : -1)).filter((i) => i >= 0).pop();
    const tail = last === undefined ? '' : lines[last];
    if (!/\]\([^)]+\)/.test(tail)) {
      candidates.push(finding('no-closing-next-step', 'polish', 'reader', (last ?? 0) + 1, tail));
    }
  }

  // Page shape hints (STYLE_GUIDE section 1 and 2.9). Shapes are maximums, so the reviewer rules on each.
  const headers = tableHeaders(lines, kinds);
  const settings = headers.filter((h) => /\|\s*(setting|parameter|field|option|property)\b/i.test(h));
  if (settings.some((h) => !/\|\s*default\b/i.test(h))) {
    candidates.push(finding('settings-table-no-default-column', 'improvement', 'structure', 1,
      `settings table header without a Default column: ${settings.find((h) => !/\|\s*default\b/i.test(h))}`));
  }
  if (type === 'component' && !/```\s*(ya?ml|json)/.test(text)) {
    candidates.push(finding('component-no-example', 'improvement', 'reader', 1, 'component page has no YAML or JSON example'));
  }
  if (['component', 'concept'].includes(type) && !text.includes('```mermaid') && !text.includes('![')) {
    candidates.push(finding('no-diagram', 'polish', 'structure', 1, `${type} page has no diagram`));
  }

  // Negative phrasing (STYLE_GUIDE 2.4): every flagged line, so a fix pass can reach each one
  const negatives = phrasingHits(lines, kinds);
  if (negatives.length) {
    const f = finding('negative-phrasing', negatives.length >= WIDESPREAD ? 'improvement' : 'polish', 'voice',
      negatives[0].line, `${negatives.length} line(s), first: ${negatives[0].text}`);
    f.lines = negatives.map((n) => n.line);
    candidates.push(f);
  }

  return { page: rel, type, words: text.split(/\s+/).length, auto, candidates };
}

/** Every flagged sentence with the lines either side, for the phrasing sweep (REVIEW_GUIDE.md section 10). */
function phrasing(out, target) {
  const root = defaultRoot;
  const items = listPages(target || root).flatMap((file) => {
    const text = fs.readFileSync(file, 'utf8');
    const lines = text.split('\n');
    const kinds = classify(lines, frontMatter(text).start);
    return phrasingHits(lines, kinds).map((h) => ({
      page: path.relative(root, file), line: h.line, patterns: h.patterns, text: h.text,
      before: (lines[h.line - 2] || '').trim(), after: (lines[h.line] || '').trim(),
    }));
  });
  fs.writeFileSync(out, JSON.stringify(items, null, 1));
  console.log(`${items.length} lines flagged on ${new Set(items.map((i) => i.page)).size} pages -> ${out}`);
}

function prepass(out, target) {
  const root = defaultRoot;
  const results = listPages(target || root).map((f) => prepassPage(f, root));
  fs.writeFileSync(out, JSON.stringify(results, null, 1));
  const count = (key) => results.reduce((n, r) => n + r[key].length, 0);
  console.log(`${results.length} pages, ${count('auto')} auto findings, ${count('candidates')} candidates -> ${out}`);
}

/**
 * Apply accepted phrasing rewrites: an array of { page, line, original, rewrite }. A line is replaced only while it
 * still matches `original`, keeping its indent, so an edit made since the sweep is never overwritten.
 */
function applyPhrasing(decisionsFile, root = defaultRoot) {
  const decisions = JSON.parse(fs.readFileSync(decisionsFile, 'utf8'));
  const byPage = {};
  for (const d of decisions) (byPage[d.page] ||= []).push(d);
  const skipped = [];
  let applied = 0;
  for (const [page, items] of Object.entries(byPage)) {
    const file = path.join(root, page);
    const lines = fs.readFileSync(file, 'utf8').split('\n');
    for (const d of items) {
      const current = lines[d.line - 1];
      if (current === undefined || current.trim() !== d.original.trim() || !d.rewrite || !d.rewrite.trim()) {
        skipped.push(`${page}:${d.line}`);
        continue;
      }
      lines[d.line - 1] = current.match(/^\s*/)[0] + d.rewrite.trim();
      applied += 1;
    }
    fs.writeFileSync(file, lines.join('\n'));
  }
  console.log(`${applied} lines rewritten on ${Object.keys(byPage).length} pages`);
  if (skipped.length) console.warn(`Skipped, line changed since the sweep or no rewrite:\n  ${skipped.join('\n  ')}`);
  return { applied, skipped };
}

/** Score one page from its findings (REVIEW_GUIDE section 8). */
function scorePage(findings, { judged = Object.keys(CATEGORIES).filter((c) => c !== 'visual'), noPurpose = false } = {}) {
  const scores = Object.fromEntries(judged.map((c) => [c, CATEGORIES[c]]));
  for (const f of findings) {
    if (!(f.category in scores)) continue;
    scores[f.category] = Math.max(0, scores[f.category] - DEDUCTION[f.severity]);
  }
  const available = judged.reduce((n, c) => n + CATEGORIES[c], 0);
  const earned = Object.values(scores).reduce((n, v) => n + v, 0);
  let score = Math.round((earned / available) * 100);
  const blockers = findings.filter((f) => f.severity === 'blocker').length;
  if (blockers === 1) score = Math.min(score, 69);
  if (blockers >= 2) score = Math.min(score, 49);
  if (noPurpose) score = Math.min(score, 39);
  return { scores, score, band: BANDS.find(([min]) => score >= min)[1], provisional: !judged.includes('visual') };
}

/**
 * Merge every review of a page (page review, blocker pass) into one. A blocker-pass finding with
 * `upgrades` replaces the page-review finding of that title (REVIEW_GUIDE.md section 10).
 */
function mergeReviews(reviews) {
  const merged = {};
  for (const r of reviews) {
    const m = merged[r.page] ||= { page: r.page, findings: [], queries: [], note: '', noPurpose: false };
    for (const f of r.findings || []) {
      if (f.upgrades) m.findings = m.findings.filter((x) => x.title !== f.upgrades);
      m.findings.push(f);
    }
    m.queries.push(...(r.queries || []));
    m.note ||= r.note || '';
    m.noPurpose ||= Boolean(r.noPurpose);
  }
  return merged;
}

function sectionOf(page) {
  return page.includes(path.sep) ? page.split(path.sep)[0] : 'Home';
}

// REVIEW_GUIDE.md section 8, Section score: a large section is not penalised for its size.
const SECTION_DEDUCTION_LIMIT = 30;
const SECTION_BLOCKER_SHARE = 0.2;

/** Score a set of reviews against the pre-pass: pages best to worst, and sections (REVIEW_GUIDE section 8). */
function scoreReviews(pre, reviews) {
  const sectionFindings = reviews.filter((r) => r.section);
  const unknown = reviews.flatMap((r) => (r.findings || []).filter((f) => !(f.category in CATEGORIES) || !(f.severity in DEDUCTION))
    .map((f) => `${r.page || r.section}: ${f.severity}/${f.category} "${f.title}"`));
  if (unknown.length) console.warn(`Not scored, unknown category or severity:\n  ${unknown.join('\n  ')}`);
  const pages = Object.values(mergeReviews(reviews.filter((r) => r.page))).map((r) => {
    const auto = (pre[r.page] && pre[r.page].auto) || [];
    const findings = [...auto, ...r.findings];
    return { page: r.page, type: (pre[r.page] || {}).type, findings, queries: r.queries, note: r.note,
      ...scorePage(findings, { noPurpose: r.noPurpose }) };
  }).sort((a, b) => b.score - a.score || a.page.localeCompare(b.page));

  const sections = {};
  for (const p of pages) (sections[sectionOf(p.page)] ||= []).push(p);
  const sectionRows = Object.entries(sections).map(([name, ps]) => {
    const own = sectionFindings.filter((s) => s.section === name).flatMap((s) => s.findings || []);
    const pageMean = Math.round(ps.reduce((n, p) => n + p.score, 0) / ps.length);
    let s = pageMean - Math.min(SECTION_DEDUCTION_LIMIT, own.reduce((n, f) => n + DEDUCTION[f.severity], 0));
    const withBlocker = ps.filter((p) => p.findings.some((f) => f.severity === 'blocker')).length;
    if (own.some((f) => f.severity === 'blocker') || withBlocker / ps.length >= SECTION_BLOCKER_SHARE) {
      s = Math.min(s, 69);
    }
    const lowest = ps[ps.length - 1];
    return { name, pages: ps.length, pageMean, sectionFindings: own.length, score: Math.max(0, s),
      lowest: `${lowest.page} (${lowest.score})` };
  }).sort((a, b) => b.score - a.score);
  return { pages, sectionRows };
}

function writeScores({ pages, sectionRows }, out, jsonOut) {
  const count = (p, sev) => p.findings.filter((f) => f.severity === sev).length;
  const md = [
    '# Documentation review scores', '',
    `Pages scored: ${pages.length}. Scores are provisional where visual flow was not judged.`, '',
    '## Sections', '', '| Section | Pages | Page mean | Section findings | Score | Lowest page |', '|---|---|---|---|---|---|',
    ...sectionRows.map((s) => `| ${s.name} | ${s.pages} | ${s.pageMean} | ${s.sectionFindings} | ${s.score} | ${s.lowest} |`), '',
    '## Pages, best to worst', '', '| Rank | Page | Type | Score | Band | Blockers | Improvements | Polish |', '|---|---|---|---|---|---|---|---|',
    ...pages.map((p, i) => `| ${i + 1} | ${p.page} | ${p.type || ''} | ${p.score} | ${p.band} | ${count(p, 'blocker')} | ${count(p, 'improvement')} | ${count(p, 'polish')} |`),
    '',
  ].join('\n');
  fs.writeFileSync(out, md);
  if (jsonOut) fs.writeFileSync(jsonOut, JSON.stringify({ sections: sectionRows, pages }, null, 1));
  console.log(`${pages.length} pages scored -> ${out}`);
}

function score(prepassFile, findingsFiles, out, jsonOut) {
  const pre = Object.fromEntries(JSON.parse(fs.readFileSync(prepassFile, 'utf8')).map((p) => [p.page, p]));
  const reviews = findingsFiles.flatMap((f) => JSON.parse(fs.readFileSync(f, 'utf8')));
  writeScores(scoreReviews(pre, reviews), out, jsonOut);
}

if (require.main === module) {
  const [command, ...args] = process.argv.slice(2);
  const flag = (name) => {
    const i = args.indexOf(name);
    return i >= 0 ? args.splice(i, 2)[1] : undefined;
  };
  if (command === 'prepass' && args[0]) {
    prepass(args[0], args[1]);
  } else if (command === 'phrasing' && args[0]) {
    phrasing(args[0], args[1]);
  } else if (command === 'apply-phrasing' && args[0]) {
    applyPhrasing(args[0]);
  } else if (command === 'score') {
    const out = flag('--out');
    const jsonOut = flag('--json');
    if (!out || args.length < 2) {
      console.error('Usage: review-pages.js score <prepass.json> <findings.json>... --out <ranking.md> [--json <scores.json>]');
      process.exit(2);
    }
    score(args[0], args.slice(1), out, jsonOut);
  } else {
    console.error('Usage: review-pages.js prepass <out.json> [file-or-folder] | phrasing <out.json> [file-or-folder] | apply-phrasing <decisions.json> | score <prepass.json> <findings.json>... --out <ranking.md>');
    process.exit(2);
  }
}

module.exports = { prepassPage, scorePage, scoreReviews, writeScores, mergeReviews, classify, phrasingHits, applyPhrasing, CATEGORIES, DEDUCTION };
