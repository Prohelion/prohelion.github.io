const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { prepassPage, scorePage, mergeReviews, phrasingHits, applyPhrasing, scoreReviews } = require('./review-pages');

// Rules: REVIEW_GUIDE.md section 8 (scoring model) and section 11 (running a review with agents).

const f = (severity, category) => ({ severity, category });

test('a page with no findings scores 100 and is provisional without visual flow', () => {
  const result = scorePage([]);
  assert.strictEqual(result.score, 100);
  assert.strictEqual(result.band, 'Ready');
  assert.strictEqual(result.provisional, true);
});

test('deductions are 10, 4 and 1, scaled over the 90 points judged', () => {
  const result = scorePage([f('improvement', 'reader'), f('polish', 'voice'), f('polish', 'voice')]);
  assert.strictEqual(result.scores.reader, 21);
  assert.strictEqual(result.scores.voice, 13);
  assert.strictEqual(result.score, Math.round((84 / 90) * 100));
});

test('a category cannot go below zero', () => {
  const result = scorePage(Array(5).fill(f('improvement', 'flow')));
  assert.strictEqual(result.scores.flow, 0);
});

test('one blocker caps the page at 69, two at 49, and no purpose at 39', () => {
  assert.strictEqual(scorePage([f('blocker', 'reader')]).score, 69);
  assert.strictEqual(scorePage([f('blocker', 'reader'), f('blocker', 'audience')]).score, 49);
  assert.strictEqual(scorePage([], { noPurpose: true }).score, 39);
});

test('a blocker pass adds blockers and upgrades a lower finding of the same title', () => {
  const merged = mergeReviews([
    { page: 'A.md', findings: [{ title: 'Example omits toType', severity: 'polish', category: 'reader' }], queries: ['q1'] },
    { page: 'A.md', findings: [
      { title: 'Example omits toType', severity: 'blocker', category: 'reader', upgrades: 'Example omits toType' },
      { title: 'Step 3 names no control', severity: 'blocker', category: 'reader' },
    ] },
  ])['A.md'];
  assert.deepStrictEqual(merged.findings.map((x) => x.severity), ['blocker', 'blocker']);
  assert.deepStrictEqual(merged.queries, ['q1']);
  assert.strictEqual(scorePage(merged.findings).score, 49);
});

test('the prepass flags long paragraphs, prose troubleshooting and a missing Default column', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'review-'));
  const file = path.join(dir, 'Thing.md');
  fs.writeFileSync(file, [
    '---', 'title: Thing', 'type: component', 'owner: Documentation', 'last_reviewed: 2026-10-31',
    'description: "Configure the thing component so that it reads tags and reports its state on a dashboard."', '---', '',
    '# Thing', '', 'One.', 'Two.', 'Three.', 'Four.', 'Five.', '',
    '## Settings', '', '| Setting | Purpose |', '|---|---|', '| **Mode** | Defaults to A. |', '',
    '## Troubleshooting', '', 'If it fails, check the log.', '',
  ].join('\n'));
  const result = prepassPage(file, dir);
  const checks = [...result.auto, ...result.candidates].map((x) => x.check);
  for (const expected of ['paragraph-over-four-sentences', 'troubleshooting-not-table',
    'settings-table-no-default-column', 'component-no-example', 'no-closing-next-step']) {
    assert.ok(checks.includes(expected), `${expected} in ${checks.join(', ')}`);
  }
});

// Rule: STYLE_GUIDE.md 2.4, "State what the product does, not what it does not do".
const flagged = (line, kind = 'prose') => phrasingHits([line], [kind]).flatMap((h) => h.patterns);

test('the Style Guide examples of negative phrasing are flagged', () => {
  assert.deepStrictEqual(flagged('An installation that is not a Desktop host, and has never had a licence, starts a trial.'), ['double-negative']);
  assert.ok(flagged('Licensing works offline, with no activation step.').includes('negative-for-positive'));
  assert.ok(flagged('The sender does not start until a collection is selected.').includes('negative-condition'));
  assert.ok(flagged('In the last five states in the table, the instance falls back.').includes('position-reference'));
});

test('positive sentences, UI labels, quoted output and one-word table cells are not flagged', () => {
  assert.deepStrictEqual(flagged('The sender starts once a collection is selected.'), []);
  assert.deepStrictEqual(flagged('Select **Not licensed** to filter the list, and read "No license file." in the log.'), []);
  assert.deepStrictEqual(flagged('| `rows` | number | No | None | Rows shown per page |', 'table'), []);
  assert.deepStrictEqual(flagged('    no = 1', 'code'), []);
  assert.deepStrictEqual(flagged('| Two-Factor Authentication for every user | :material-close-circle-outline:{ .edition-icon--no title="Not included" } | :material-close-circle-outline:{ .edition-icon--no title="Not included" } |', 'table'), []);
});

test('the prepass lists every negative-phrasing line on a page', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'review-'));
  const file = path.join(dir, 'Neg.md');
  fs.writeFileSync(file, ['---', 'title: Neg', 'type: reference', '---', '', '# Neg', '',
    'It works with no network.', 'It does not start until configured.', 'It is fine.', 'Nothing is not shown.', ''].join('\n'));
  const neg = prepassPage(file, dir).candidates.find((c) => c.check === 'negative-phrasing');
  assert.deepStrictEqual(neg.lines, [8, 9, 11]);
  assert.strictEqual(neg.severity, 'improvement');
});

test('accepted rewrites replace only lines that still match the original, keeping the indent', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'review-'));
  fs.writeFileSync(path.join(dir, 'A.md'), ['# A', '', '1. Save.', '   It does not start until saved.', 'Edited since the sweep.', ''].join('\n'));
  const decisions = path.join(dir, 'decisions.json');
  fs.writeFileSync(decisions, JSON.stringify([
    { page: 'A.md', line: 4, original: 'It does not start until saved.', rewrite: 'It starts once saved.' },
    { page: 'A.md', line: 5, original: 'It has no network.', rewrite: 'It works offline.' },
  ]));
  const result = applyPhrasing(decisions, dir);
  assert.strictEqual(result.applied, 1);
  assert.deepStrictEqual(result.skipped, ['A.md:5']);
  const lines = fs.readFileSync(path.join(dir, 'A.md'), 'utf8').split('\n');
  assert.strictEqual(lines[3], '   It starts once saved.');
  assert.strictEqual(lines[4], 'Edited since the sweep.');
});

test('a reference page is not asked for a closing next step', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'review-'));
  const file = path.join(dir, 'Ref.md');
  fs.writeFileSync(file, ['---', 'title: Ref', 'type: reference', '---', '', '# Ref', '', 'A fact.', ''].join('\n'));
  const checks = prepassPage(file, dir).candidates.map((x) => x.check);
  assert.ok(!checks.includes('no-closing-next-step'));
});

// Rule: REVIEW_GUIDE.md section 8, Section score.
test('one blocker does not cap a large section, and many blockers do', () => {
  const page = (name, findings) => ({ page: name, findings });
  const pre = {};
  const clean = Array.from({ length: 9 }, (_, i) => ({ page: `S/P${i}.md`, findings: [] }));
  const one = scoreReviews(pre, [...clean, { page: 'S/Bad.md', findings: [{ severity: 'blocker', category: 'reader', title: 't' }] }]);
  assert.ok(one.sectionRows[0].score > 69);
  const many = scoreReviews(pre, [...clean.slice(0, 7),
    ...['A', 'B', 'C'].map((n) => page(`S/${n}.md`, [{ severity: 'blocker', category: 'reader', title: 't' }]))]);
  assert.strictEqual(many.sectionRows[0].score, 69);
});

test('section-level deductions stop at 30 points', () => {
  const pre = {};
  const result = scoreReviews(pre, [{ page: 'S/A.md', findings: [] },
    { section: 'S', findings: Array.from({ length: 10 }, () => ({ severity: 'improvement', category: 'consistency', title: 't' })) }]);
  assert.strictEqual(result.sectionRows[0].score, 70);
});
