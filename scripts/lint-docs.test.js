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
