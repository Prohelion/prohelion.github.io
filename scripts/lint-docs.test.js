const test = require('node:test');
const assert = require('node:assert');
const path = require('path');
const { spawnSync } = require('child_process');
const { structureFindings } = require('./lint-docs');

const script = path.join(__dirname, 'lint-docs.js');
const fixtures = path.join(__dirname, 'lint-fixtures');
const run = (...args) => spawnSync('node', [script, ...args], { encoding: 'utf8' });

// Plan: tasks/todo.md "Batch 1". Rules: STYLE_GUIDE.md.

test('a well-formed task page passes with no findings', () => {
  const result = run(path.join(fixtures, 'good.md'), '--details');
  assert.strictEqual(result.status, 0, result.stdout + result.stderr);
  assert.match(result.stdout, /OK: no enforced page has an error or warning/);
});

test('a badly written typed page fails and reports each problem', () => {
  const result = run(path.join(fixtures, 'bad.md'), '--details');
  assert.strictEqual(result.status, 1, result.stdout + result.stderr);
  for (const expected of [
    'Description',     // 5 characters
    'Owner',           // typed page without owner
    'LastReviewed',    // typed page without date
    'Headings',        // H1 then H4
    'Procedure',       // task with no numbered steps
    'Contractions',    // it's
    'Minimising',      // really simple, just
    'Please',
    'Marketing',       // powerful
    'Abbreviations',   // e.g.
    'Directional',     // the one above
  ]) {
    assert.ok(result.stdout.includes(expected), `expected a ${expected} finding in:\n${result.stdout}`);
  }
});

test('an untyped page is reported but does not fail the run', () => {
  const tmp = require('fs').mkdtempSync(path.join(require('os').tmpdir(), 'lint-'));
  const file = path.join(tmp, 'untyped.md');
  require('fs').writeFileSync(file, '---\ntitle: Old page\ndescription: "Short."\n---\n\n# Old page\n\nIt is simply done.\n');
  const result = run(file);
  assert.strictEqual(result.status, 0, result.stdout + result.stderr);
  assert.match(result.stdout, /Findings: [1-9]/);
});

test('--enforce-all makes an untyped page fail', () => {
  const tmp = require('fs').mkdtempSync(path.join(require('os').tmpdir(), 'lint-'));
  const file = path.join(tmp, 'untyped.md');
  require('fs').writeFileSync(file, '---\ntitle: Old page\ndescription: "Short."\n---\n\n# Old page\n\nIt is simply done.\n');
  assert.strictEqual(run(file, '--enforce-all').status, 1);
});

test('structure checks flag a skipped heading level and too many admonitions', () => {
  const text = '---\ntitle: T\ndescription: "A description that is long enough to pass the seventy character minimum comfortably."\n---\n\n# T\n\n### Skipped\n\n!!! info "a"\n    x\n\n!!! info "b"\n    x\n\n!!! info "c"\n    x\n';
  const { findings } = structureFindings(text);
  assert.ok(findings.some((f) => f.rule === 'Headings' && /jumps from H1 to H3/.test(f.message)));
  assert.ok(findings.some((f) => f.rule === 'Structure' && /admonitions/.test(f.message)));
});

test('a link to a missing page or anchor is an error', () => {
  const fs = require('fs');
  const tmp = fs.mkdtempSync(path.join(require('os').tmpdir(), 'lint-'));
  fs.writeFileSync(path.join(tmp, 'other.md'), '---\ntitle: O\ndescription: "x"\n---\n\n# Other\n\n## Real heading\n');
  const file = path.join(tmp, 'page.md');
  const text = '---\ntitle: P\ndescription: "x"\n---\n\n# Page\n\n[ok](other.md#real-heading) [bad anchor](other.md#nope) [missing](gone.md)\n';
  fs.writeFileSync(file, text);
  const { linkFindings } = require('./lint-docs');
  const found = linkFindings(file, text);
  assert.strictEqual(found.length, 2, JSON.stringify(found));
  assert.ok(found.some((f) => /#nope/.test(f.message)));
  assert.ok(found.some((f) => /gone\.md/.test(f.message)));
});

test('a list number alone on its line is an error', () => {
  const text = '---\ntitle: T\ndescription: "A description that is long enough to pass the seventy character minimum comfortably."\n---\n\n# T\n\n1.\n   Do the first thing.\n2. Do the second thing.\n';
  const { findings } = structureFindings(text);
  assert.ok(findings.some((f) => f.rule === 'EmptyListItem'), JSON.stringify(findings));
});

test('a title that differs from the H1 is reported', () => {
  const text = '---\ntitle: Group component\ndescription: "A description that is long enough to pass the seventy character minimum comfortably."\n---\n\n# Group\n';
  const { findings } = structureFindings(text);
  assert.ok(findings.some((f) => f.rule === 'Title' && /H1 is 'Group'/.test(f.message)), JSON.stringify(findings));
});

// Plan: ~/.claude/plans/logical-leaping-pearl.md. Prose rules are enforced on typed pages (style guide 2.4).
// @business: calling a step "easy" is minimising, the same as "simple" or "easily"
test('the word easy is reported as a minimising word', () => {
  const fs = require('fs');
  const tmp = fs.mkdtempSync(path.join(require('os').tmpdir(), 'lint-'));
  const file = path.join(tmp, 'easy.md');
  fs.writeFileSync(file, '---\ntitle: T\ndescription: "A description that is long enough to pass the seventy character minimum comfortably."\ntype: concept\nowner: Documentation\nlast_reviewed: 2026-10-14\n---\n\n# T\n\nThis makes the change easy to find.\n');
  const result = run(file, '--details');
  assert.match(result.stdout, /Minimising/, result.stdout);
  assert.strictEqual(result.status, 1, result.stdout + result.stderr);
});

// @business: the third-party Vale packages are fetched when they are missing, so a fresh checkout lints
test('packages that are not installed are synced before linting', () => {
  const fs = require('fs');
  const dir = path.join(__dirname, '..', '.vale', 'styles', 'Microsoft');
  fs.rmSync(dir, { recursive: true, force: true });
  const result = run(path.join(fixtures, 'good.md'));
  assert.strictEqual(result.status, 0, result.stdout + result.stderr);
  assert.ok(fs.existsSync(dir), 'Microsoft package was not restored');
});

// Source: STYLE_GUIDE.md 2.6 and 2.6b, the AI-sounding prose patterns that the user flagged on the AI technicians page.
// @business: prose that reads as machine-written fails the lint, so a page with these tells is sent back for rewriting
const aiTellsPage = (body) => '---\ntitle: T\ndescription: "A description that is long enough to pass the seventy character minimum comfortably."\ntype: concept\nowner: Documentation\nlast_reviewed: 2026-11-12\n---\n\n# T\n\n' + body;

test('a windup colon, an announced point and a stacked negative are each reported', () => {
  const fs = require('fs');
  const tmp = fs.mkdtempSync(path.join(require('os').tmpdir(), 'lint-'));
  const file = path.join(tmp, 'tells.md');
  fs.writeFileSync(file, aiTellsPage(
    'It suits the judgements a rule cannot make:\n\n- A trend.\n- A pattern.\n- A cause.\n\n' +
    'The result for the business is earlier warning.\n' +
    'AI Chat is the better fit for a quick question.\n' +
    'The logger cannot start without a collection.\n'));
  const result = run(file, '--details');
  assert.strictEqual(result.status, 1, result.stdout + result.stderr);
  for (const expected of ['SetupColon', 'AnnouncedPoint', 'DoubleNegative']) {
    assert.ok(result.stdout.includes(expected), `expected a ${expected} finding in:\n${result.stdout}`);
  }
});

// @business: the rewrites in the style guide's before-and-after table pass, so the rules do not punish plain writing
test('the plain rewrites from the before-and-after table raise none of those findings', () => {
  const fs = require('fs');
  const tmp = fs.mkdtempSync(path.join(require('os').tmpdir(), 'lint-'));
  const file = path.join(tmp, 'plain.md');
  fs.writeFileSync(file, aiTellsPage(
    'Use a technician for the problems a fixed limit misses.\n' +
    'A technician that reviews the last 24 hours every night spots the climb while there is still time to plan a repair.\n' +
    'To ask a question yourself, use AI Chat.\n' +
    'The logger needs a collection before it can start.\n'));
  const result = run(file, '--details');
  for (const rule of ['SetupColon', 'AnnouncedPoint', 'DoubleNegative']) {
    assert.ok(!result.stdout.includes(rule), `did not expect a ${rule} finding in:\n${result.stdout}`);
  }
});

// Source: STYLE_GUIDE.md 2.8, locate a setting in the GUI, not by its stored key; flagged on the Tag Tree Path page.
// @business: a page that tells users where a setting is stored instead of where it is in the GUI fails the lint
test('a sentence that locates a setting by its stored YAML key is reported', () => {
  const fs = require('fs');
  const tmp = fs.mkdtempSync(path.join(require('os').tmpdir(), 'lint-'));
  const file = path.join(tmp, 'storage.md');
  fs.writeFileSync(file, aiTellsPage("The setting is stored as `tagTreeParentPath` in the component's YAML.\n"));
  const result = run(file, '--details');
  assert.strictEqual(result.status, 1, result.stdout + result.stderr);
  assert.ok(result.stdout.includes('StorageKey'), `expected a StorageKey finding in:\n${result.stdout}`);
});

// @business: naming where the setting sits in the GUI, or saying what Profinity stores, is not reported
test('a GUI location and a plain description of stored data raise no StorageKey finding', () => {
  const fs = require('fs');
  const tmp = fs.mkdtempSync(path.join(require('os').tmpdir(), 'lint-'));
  const file = path.join(tmp, 'gui.md');
  fs.writeFileSync(file, aiTellsPage(
    "You can find it in the **Component identifier** section of the component's settings, next to **Name**.\n" +
    'Each sample is stored as one point in a measurement named after the profile.\n'));
  const result = run(file, '--details');
  assert.ok(!result.stdout.includes('StorageKey'), `did not expect a StorageKey finding in:\n${result.stdout}`);
});

// Source: STYLE_GUIDE.md 2.5, the product is named "AI Technician" and is capitalised the same way in every sentence.
// @business: a page that writes the product name in lower case fails the lint, so the name reads the same across the docs
test('a lower-case AI technician is reported and the capitalised name passes', () => {
  const fs = require('fs');
  const tmp = fs.mkdtempSync(path.join(require('os').tmpdir(), 'lint-'));
  const bad = path.join(tmp, 'bad.md');
  fs.writeFileSync(bad, aiTellsPage('Set up an AI technician for the charger.\n'));
  const badResult = run(bad, '--details');
  assert.strictEqual(badResult.status, 1, badResult.stdout + badResult.stderr);
  assert.ok(badResult.stdout.includes('ProductNames'), `expected a ProductNames finding in:\n${badResult.stdout}`);
  const good = path.join(tmp, 'good.md');
  fs.writeFileSync(good, aiTellsPage('Set up an AI Technician for the charger.\n'));
  const goodResult = run(good, '--details');
  assert.ok(!goodResult.stdout.includes('ProductNames'), `did not expect a ProductNames finding in:\n${goodResult.stdout}`);
});
