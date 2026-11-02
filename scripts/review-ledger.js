#!/usr/bin/env node
/**
 * The review ledger: one JSON file that holds every review finding with its status, so the state of a
 * documentation review is updated in one place (REVIEW_GUIDE.md section 10).
 *
 * init      Build a ledger from the findings files of a review run.
 * status    Set the status of findings, by id or for every open finding on a page.
 * replace   After re-reviewing a page, supersede its open findings and add the new ones.
 * ingest    Replace the findings of every page and section in the given review files (a page review and its
 *           blocker pass together).
 * score     Score pages and sections from the open and deferred findings, plus the fresh pre-pass.
 * summary   Count findings by status, severity and wave.
 *
 * A page whose findings were fixed is marked `recheck` until it is re-reviewed with `replace`. `score` lists those
 * pages, because their score is not confirmed.
 *
 * A finding is `open`, `deferred` (known, not being fixed now), `fixed`, `dropped` (not a real finding) or
 * `superseded` (replaced by a later review of the same page). Open and deferred findings count against a page's
 * score. The pre-pass `auto` findings are not stored, because they are recalculated from the pages: run
 * `npm run review-prepass` before `score`.
 *
 * Usage:
 *   npm run review-ledger -- init <ledger.json> <findings.json>...
 *   npm run review-ledger -- status <ledger.json> <status> [--note <text>] [--wave <name>] [--recheck] (<id>... | --page <page>)
 *   npm run review-ledger -- replace <ledger.json> <page> <findings.json>
 *   npm run review-ledger -- ingest <ledger.json> <findings.json>...
 *   npm run review-ledger -- score <ledger.json> <prepass.json> --out <ranking.md> [--json <scores.json>]
 *   npm run review-ledger -- summary <ledger.json>
 */

const fs = require('fs');
const { mergeReviews, scoreReviews, writeScores, CATEGORIES, DEDUCTION } = require('./review-pages');

const STATUSES = ['open', 'deferred', 'fixed', 'dropped', 'superseded'];
const COUNTED = ['open', 'deferred'];

const today = () => new Date().toISOString().slice(0, 10);
const read = (file) => JSON.parse(fs.readFileSync(file, 'utf8'));
const write = (file, data) => fs.writeFileSync(file, JSON.stringify(data, null, 1));

function toRecord(page, section, f, index, when) {
  const owner = page || `section:${section}`;
  return {
    id: `${owner}#${String(index).padStart(2, '0')}`,
    page: page || '',
    section: section || '',
    severity: f.severity,
    category: f.category,
    title: f.title || f.check || '',
    rule: f.rule || '',
    location: f.location || '',
    evidence: f.evidence || '',
    rewrite: f.rewrite || '',
    status: 'open',
    wave: '',
    note: '',
    updated: when,
  };
}

/** Next unused index for a page or section, so ids never repeat after a replace. */
function nextIndex(ledger, owner) {
  const used = ledger.findings.filter((f) => (f.page || `section:${f.section}`) === owner)
    .map((f) => Number(f.id.split('#')[1]));
  return Math.max(0, ...used) + 1;
}

function addReview(ledger, review, when) {
  const owner = review.page || `section:${review.section}`;
  for (const f of review.findings || []) {
    if (!(f.category in CATEGORIES) || !(f.severity in DEDUCTION)) {
      console.warn(`Skipped, unknown category or severity: ${owner} ${f.severity}/${f.category} "${f.title}"`);
      continue;
    }
    ledger.findings.push(toRecord(review.page, review.section, f, nextIndex(ledger, owner), when));
  }
  if (review.page) {
    ledger.pages[review.page] = { note: review.note || '', noPurpose: Boolean(review.noPurpose), reviewed: when, recheck: false };
    for (const q of review.queries || []) {
      ledger.queries.push({ page: review.page, query: typeof q === 'string' ? q : q, status: 'open', updated: when });
    }
  }
}

function init(ledgerFile, findingsFiles) {
  const when = today();
  const reviews = findingsFiles.flatMap((f) => read(f));
  const ledger = { version: 1, created: when, pages: {}, findings: [], queries: [] };
  for (const r of Object.values(mergeReviews(reviews.filter((x) => x.page)))) addReview(ledger, r, when);
  for (const r of reviews.filter((x) => x.section)) addReview(ledger, r, when);
  write(ledgerFile, ledger);
  console.log(`${ledger.findings.length} findings on ${Object.keys(ledger.pages).length} pages -> ${ledgerFile}`);
  return ledger;
}

function setStatus(ledgerFile, status, ids, { page, note, wave, recheck } = {}) {
  if (!STATUSES.includes(status)) throw new Error(`Status must be one of ${STATUSES.join(', ')}.`);
  const ledger = read(ledgerFile);
  const when = today();
  const targets = ledger.findings.filter((f) => (page ? f.page === page && f.status === 'open' : ids.includes(f.id)));
  const missing = ids.filter((id) => !ledger.findings.some((f) => f.id === id));
  for (const f of targets) {
    f.status = status;
    f.updated = when;
    if (note) f.note = note;
    if (wave) f.wave = wave;
  }
  if (recheck) {
    for (const p of new Set(targets.map((f) => f.page).filter(Boolean))) ledger.pages[p].recheck = true;
  }
  write(ledgerFile, ledger);
  console.log(`${targets.length} findings set to ${status}`);
  if (missing.length) console.warn(`Not found: ${missing.join(', ')}`);
  return targets.length;
}

function replace(ledgerFile, page, findingsFile) {
  const ledger = read(ledgerFile);
  const when = today();
  const reviews = read(findingsFile).filter((r) => r.page === page);
  if (!reviews.length) throw new Error(`No review for ${page} in ${findingsFile}.`);
  let superseded = 0;
  for (const f of ledger.findings) {
    if (f.page === page && f.status === 'open') {
      f.status = 'superseded';
      f.updated = when;
      superseded += 1;
    }
  }
  const before = ledger.findings.length;
  for (const r of Object.values(mergeReviews(reviews))) addReview(ledger, r, when);
  write(ledgerFile, ledger);
  console.log(`${superseded} open findings superseded, ${ledger.findings.length - before} added for ${page}`);
}

/** Replace the findings of every page named in the review files, merging a page review with its blocker pass. */
function ingest(ledgerFile, findingsFiles) {
  const ledger = read(ledgerFile);
  const when = today();
  const all = findingsFiles.flatMap((f) => read(f));
  const merged = mergeReviews(all.filter((r) => r.page));
  let superseded = 0;
  let added = 0;
  for (const review of Object.values(merged)) {
    for (const f of ledger.findings) {
      if (f.page === review.page && f.status === 'open') {
        f.status = 'superseded';
        f.updated = when;
        superseded += 1;
      }
    }
    const before = ledger.findings.length;
    addReview(ledger, review, when);
    added += ledger.findings.length - before;
  }
  for (const section of [...new Set(all.filter((r) => r.section).map((r) => r.section))]) {
    for (const f of ledger.findings) {
      if (f.section === section && !f.page && f.status === 'open') {
        f.status = 'superseded';
        f.updated = when;
        superseded += 1;
      }
    }
    const before = ledger.findings.length;
    for (const r of all.filter((x) => x.section === section)) addReview(ledger, r, when);
    added += ledger.findings.length - before;
  }
  write(ledgerFile, ledger);
  console.log(`${Object.keys(merged).length} pages re-reviewed: ${superseded} open findings superseded, ${added} added`);
  return { pages: Object.keys(merged).length, superseded, added };
}

function ledgerReviews(ledger) {
  const counted = ledger.findings.filter((f) => COUNTED.includes(f.status));
  const pageReviews = Object.entries(ledger.pages).map(([page, meta]) => ({
    page, findings: counted.filter((f) => f.page === page), queries: ledger.queries.filter((q) => q.page === page && q.status === 'open').map((q) => q.query),
    note: meta.note, noPurpose: meta.noPurpose,
  }));
  const sections = [...new Set(counted.filter((f) => f.section).map((f) => f.section))];
  const sectionReviews = sections.map((section) => ({ section, findings: counted.filter((f) => f.section === section) }));
  return [...pageReviews, ...sectionReviews];
}

function score(ledgerFile, prepassFile, out, jsonOut) {
  const ledger = read(ledgerFile);
  const pre = Object.fromEntries(read(prepassFile).map((p) => [p.page, p]));
  writeScores(scoreReviews(pre, ledgerReviews(ledger)), out, jsonOut);
  const pending = Object.entries(ledger.pages).filter(([, m]) => m.recheck).map(([p]) => p);
  if (pending.length) {
    fs.appendFileSync(out, `\n## Awaiting re-review\n\nThese pages had findings fixed and have not been re-reviewed, so their scores are not confirmed:\n\n${pending.map((p) => `- ${p}`).join('\n')}\n`);
    console.warn(`Awaiting re-review (score not confirmed): ${pending.join(', ')}`);
  }
}

function summary(ledgerFile) {
  const ledger = read(ledgerFile);
  const by = (key) => ledger.findings.reduce((acc, f) => ({ ...acc, [f[key] || '(none)']: (acc[f[key] || '(none)'] || 0) + 1 }), {});
  const open = ledger.findings.filter((f) => COUNTED.includes(f.status));
  const lines = [
    `${ledger.findings.length} findings on ${Object.keys(ledger.pages).length} pages, created ${ledger.created}`,
    `by status:   ${JSON.stringify(by('status'))}`,
    `counting:    ${open.length} (open or deferred), ${open.filter((f) => f.severity === 'blocker').length} blockers`,
    `by wave:     ${JSON.stringify(by('wave'))}`,
    `open queries: ${ledger.queries.filter((q) => q.status === 'open').length}`,
  ];
  console.log(lines.join('\n'));
  return lines;
}

if (require.main === module) {
  const [command, ...args] = process.argv.slice(2);
  const flag = (name) => {
    const i = args.indexOf(name);
    return i >= 0 ? args.splice(i, 2)[1] : undefined;
  };
  try {
    if (command === 'init' && args.length >= 2) {
      init(args[0], args.slice(1));
    } else if (command === 'status') {
      const note = flag('--note');
      const wave = flag('--wave');
      const page = flag('--page');
      const recheck = args.includes('--recheck');
      if (recheck) args.splice(args.indexOf('--recheck'), 1);
      if (args.length < 2 || (args.length < 3 && !page)) throw new Error('status needs <ledger.json> <status> and a finding id or --page <page>');
      setStatus(args[0], args[1], args.slice(2), { page, note, wave, recheck });
    } else if (command === 'replace' && args.length === 3) {
      replace(args[0], args[1], args[2]);
    } else if (command === 'ingest' && args.length >= 2) {
      ingest(args[0], args.slice(1));
    } else if (command === 'score') {
      const out = flag('--out');
      const jsonOut = flag('--json');
      if (!out || args.length < 2) throw new Error('score needs <ledger.json> <prepass.json> --out <ranking.md>');
      score(args[0], args[1], out, jsonOut);
    } else if (command === 'summary' && args[0]) {
      summary(args[0]);
    } else {
      console.error('Usage: review-ledger.js init | status | replace | score | summary (see the header of this file)');
      process.exit(2);
    }
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
}

module.exports = { init, setStatus, replace, ingest, score, summary, ledgerReviews, STATUSES };
