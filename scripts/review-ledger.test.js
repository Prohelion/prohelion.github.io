const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { init, setStatus, replace, ingest, ledgerReviews } = require('./review-ledger');
const { scoreReviews } = require('./review-pages');

// Rules: REVIEW_GUIDE.md section 10 (the ledger) and section 8 (scoring).

const f = (severity, category, title) => ({ severity, category, title, evidence: 'quoted line' });
const tmp = () => fs.mkdtempSync(path.join(os.tmpdir(), 'ledger-'));

function makeLedger() {
  const dir = tmp();
  const findings = path.join(dir, 'findings.json');
  fs.writeFileSync(findings, JSON.stringify([
    { page: 'A/One.md', findings: [f('blocker', 'reader', 'Step cannot be done'), f('polish', 'voice', 'Serial comma')], queries: ['Which default?'], note: 'n' },
    { page: 'A/One.md', findings: [f('improvement', 'structure', 'No default column')] },
    { page: 'B/Two.md', findings: [] },
    { section: 'A', findings: [f('improvement', 'consistency', 'Fact has two homes')] },
  ]));
  const ledger = path.join(dir, 'ledger.json');
  init(ledger, [findings]);
  return { dir, ledger, findings };
}

test('init gives every finding a stable id, open status and its page, and keeps section findings', () => {
  const { ledger } = makeLedger();
  const data = JSON.parse(fs.readFileSync(ledger, 'utf8'));
  assert.deepStrictEqual(data.findings.map((x) => x.id), ['A/One.md#01', 'A/One.md#02', 'A/One.md#03', 'section:A#01']);
  assert.ok(data.findings.every((x) => x.status === 'open'));
  assert.deepStrictEqual(Object.keys(data.pages).sort(), ['A/One.md', 'B/Two.md']);
  assert.strictEqual(data.queries.length, 1);
});

test('a fixed finding stops counting against the page score, and a deferred one still counts', () => {
  const { ledger } = makeLedger();
  const score = () => scoreReviews({}, ledgerReviews(JSON.parse(fs.readFileSync(ledger, 'utf8')))).pages.find((p) => p.page === 'A/One.md').score;
  const before = score();
  setStatus(ledger, 'fixed', ['A/One.md#01']);
  const afterFix = score();
  assert.ok(afterFix > before);
  setStatus(ledger, 'deferred', ['A/One.md#02']);
  assert.strictEqual(score(), afterFix);
  setStatus(ledger, 'dropped', ['A/One.md#02', 'A/One.md#03']);
  assert.ok(score() > afterFix);
});

test('status by page changes only the open findings on that page', () => {
  const { ledger } = makeLedger();
  setStatus(ledger, 'fixed', ['A/One.md#01']);
  const n = setStatus(ledger, 'deferred', [], { page: 'A/One.md', wave: 'week 3' });
  assert.strictEqual(n, 2);
  const data = JSON.parse(fs.readFileSync(ledger, 'utf8'));
  assert.strictEqual(data.findings.find((x) => x.id === 'A/One.md#01').status, 'fixed');
  assert.strictEqual(data.findings.find((x) => x.id === 'A/One.md#02').wave, 'week 3');
  assert.throws(() => setStatus(ledger, 'finished', ['A/One.md#01']), /Status must be/);
});

test('replace supersedes open findings, keeps fixed ones, and never reuses an id', () => {
  const { ledger, dir } = makeLedger();
  setStatus(ledger, 'fixed', ['A/One.md#01']);
  const again = path.join(dir, 'again.json');
  fs.writeFileSync(again, JSON.stringify([{ page: 'A/One.md', findings: [f('polish', 'flow', 'Long paragraph')] }]));
  replace(ledger, 'A/One.md', again);
  const data = JSON.parse(fs.readFileSync(ledger, 'utf8'));
  const byId = Object.fromEntries(data.findings.map((x) => [x.id, x]));
  assert.strictEqual(byId['A/One.md#01'].status, 'fixed');
  assert.strictEqual(byId['A/One.md#02'].status, 'superseded');
  assert.strictEqual(byId['A/One.md#04'].status, 'open');
  assert.strictEqual(byId['A/One.md#04'].title, 'Long paragraph');
});

test('a page marked for re-review is listed by score until replace clears the mark', () => {
  const { ledger, dir } = makeLedger();
  setStatus(ledger, 'fixed', [], { page: 'A/One.md', recheck: true });
  assert.strictEqual(JSON.parse(fs.readFileSync(ledger, 'utf8')).pages['A/One.md'].recheck, true);
  const pre = path.join(dir, 'pre.json');
  fs.writeFileSync(pre, '[]');
  const out = path.join(dir, 'ranking.md');
  require('./review-ledger').score(ledger, pre, out);
  assert.match(fs.readFileSync(out, 'utf8'), /Awaiting re-review[\s\S]*A\/One\.md/);
  const again = path.join(dir, 'again.json');
  fs.writeFileSync(again, JSON.stringify([{ page: 'A/One.md', findings: [] }]));
  replace(ledger, 'A/One.md', again);
  assert.strictEqual(JSON.parse(fs.readFileSync(ledger, 'utf8')).pages['A/One.md'].recheck, false);
});

test('ingest replaces the findings of each page and section in the files, merging a blocker pass', () => {
  const { ledger, dir } = makeLedger();
  const review = path.join(dir, 'review.json');
  const blockers = path.join(dir, 'blockers.json');
  fs.writeFileSync(review, JSON.stringify([
    { page: 'A/One.md', findings: [f('polish', 'flow', 'Long paragraph')] },
    { section: 'A', findings: [] },
  ]));
  fs.writeFileSync(blockers, JSON.stringify([{ page: 'A/One.md', findings: [f('blocker', 'reader', 'Example fails')] }]));
  const result = ingest(ledger, [review, blockers]);
  assert.strictEqual(result.pages, 1);
  const data = JSON.parse(fs.readFileSync(ledger, 'utf8'));
  const open = data.findings.filter((x) => x.status === 'open');
  assert.deepStrictEqual(open.map((x) => x.title).sort(), ['Example fails', 'Long paragraph']);
  assert.strictEqual(data.findings.find((x) => x.id === 'section:A#01').status, 'superseded');
  assert.strictEqual(data.pages['B/Two.md'].reviewed, data.created);
});

test('a finding with an unknown category is skipped with a warning, not stored', () => {
  const dir = tmp();
  const findings = path.join(dir, 'x.json');
  fs.writeFileSync(findings, JSON.stringify([{ page: 'A.md', findings: [f('polish', 'mechanics', 'Odd'), f('polish', 'voice', 'Fine')] }]));
  const ledger = path.join(dir, 'ledger.json');
  init(ledger, [findings]);
  assert.deepStrictEqual(JSON.parse(fs.readFileSync(ledger, 'utf8')).findings.map((x) => x.title), ['Fine']);
});
