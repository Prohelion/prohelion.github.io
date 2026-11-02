const test = require('node:test');
const assert = require('node:assert');
const { makeChunks, batchesOf, promptFor } = require('./review');

// Rules: REVIEW_GUIDE.md section 10 (running a review with agents).

const pages = (section, n) => Array.from({ length: n }, (_, i) => ({ page: `${section}/P${i}.md` }));

test('chunks hold up to ten pages, use the fewest chunks, and never mix sections', () => {
  const chunks = makeChunks([...pages('A', 25), ...pages('B', 4), { page: 'index.md' }]);
  assert.deepStrictEqual(chunks.map((c) => `${c.section}:${c.pages.length}`), ['A:9', 'A:9', 'A:7', 'B:4', 'Home:1']);
  assert.deepStrictEqual(chunks.map((c) => c.id), ['01', '02', '03', '04', '05']);
  for (const c of chunks) assert.ok(c.pages.every((p) => (p.page.includes('/') ? p.page.split('/')[0] : 'Home') === c.section));
});

test('batches are even and of about sixty', () => {
  const sizes = batchesOf(Array.from({ length: 341 }, (_, i) => i)).map((b) => b.length);
  assert.strictEqual(sizes.reduce((a, b) => a + b, 0), 341);
  assert.ok(Math.max(...sizes) <= 60 && Math.min(...sizes) >= 56, sizes.join(','));
  assert.deepStrictEqual(batchesOf([]), []);
});

test('each agent brief names the guide, the input and the output file', () => {
  const page = promptFor('page', '07', '2026-11-01');
  assert.match(page, /REVIEW_GUIDE\.md/);
  assert.match(page, /tasks\/reviews\/2026-11-01\/chunks\/pages-07\.txt/);
  assert.match(page, /findings\/findings-07\.json/);
  assert.match(promptFor('blocker', '07', 'r'), /blockers-07\.json/);
  assert.match(promptFor('section', 'Tags', 'r'), /section-Tags\.json/);
  assert.match(promptFor('sweep', '02', 'r'), /sweep-02\.json/);
  assert.match(promptFor('meaning', '02', 'r'), /checked-02\.json/);
  assert.throws(() => promptFor('nonsense', '1'), /prompt kind must be one of/);
  assert.throws(() => promptFor('page'), /needs an id/);
});
