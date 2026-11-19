const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');

// Feature: API route coverage is checked offline against the product's committed OpenAPI contract.
// Plan: /Users/ctuesley/.claude/plans/synchronous-popping-pixel.md (Phase 2 and Phase 3).
// Rules: STYLE_GUIDE.md 2.9 (one home for each fact) and REVIEW_GUIDE.md section 6 (completeness).

const coverage = path.join(__dirname, 'check-route-coverage.js');
const routes = path.join(__dirname, 'check-routes.js');

function fixture({ paths, pages, allowlist }) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'routes-'));
  const contract = path.join(dir, 'swagger.json');
  const docs = path.join(dir, 'docs');
  const list = path.join(dir, 'allowlist.json');
  fs.mkdirSync(docs);
  const doc = { paths: Object.fromEntries(paths.map(([p, ...methods]) => [p, Object.fromEntries((methods.length ? methods : ['get']).map((m) => [m, {}]))])) };
  fs.writeFileSync(contract, JSON.stringify(doc));
  // Ai/Mcp is mapped outside the controllers, so every contract includes it. The fixtures document it.
  fs.writeFileSync(path.join(docs, 'mcp.md'), 'AI clients connect to `POST /api/v2/Ai/Mcp`.\n');
  Object.entries(pages).forEach(([name, text]) => fs.writeFileSync(path.join(docs, name), text));
  fs.writeFileSync(list, JSON.stringify(allowlist || { internal: [] }));
  return { contract, docs, list };
}

// A run with no Profinity instance: PROFINITY_URL and the sign-in variables are removed from the environment.
function offline(script, args) {
  const env = { ...process.env };
  for (const k of ['PROFINITY_URL', 'PROFINITY_TOKEN', 'PROFINITY_USER', 'PROFINITY_PASSWORD']) delete env[k];
  return spawnSync('node', [script, ...args], { encoding: 'utf8', env });
}
const coverageRun = (f, ...extra) => offline(coverage, ['--contract', f.contract, '--docs', f.docs, '--allowlist', f.list, ...extra]);

test('@business a product route that no page names fails the check and is reported by route', () => {
  const f = fixture({
    paths: [['/api/v2/Alerts/Active'], ['/api/v2/Tags/Rules']],
    pages: { 'a.md': 'Call `GET /api/v2/Alerts/Active` to list alerts.\n' },
  });
  const r = coverageRun(f);
  assert.strictEqual(r.status, 1, r.stdout + r.stderr);
  assert.match(r.stdout, /\/api\/v2\/Tags\/Rules/);
  assert.doesNotMatch(r.stdout, /Alerts\/Active.*(not documented|uncovered)/i);
});

test('@business a route that every product route has a page for passes', () => {
  const f = fixture({
    paths: [['/api/v2/Alerts/Active']],
    pages: { 'a.md': 'Call `GET /api/v2/Alerts/Active` to list alerts.\n' },
  });
  const r = coverageRun(f);
  assert.strictEqual(r.status, 0, r.stdout + r.stderr);
});

test('@business an internal route with a stated reason passes without a page', () => {
  const f = fixture({
    paths: [['/api/v2/UI/schema'], ['/api/v2/UI/menu']],
    pages: { 'a.md': 'Nothing about those routes.\n' },
    allowlist: { internal: [{ prefix: '/api/v2/UI', reason: 'Called only by the Profinity web interface.' }] },
  });
  const r = coverageRun(f);
  assert.strictEqual(r.status, 0, r.stdout + r.stderr);
});

test('@business an allow-list entry with no reason fails the check', () => {
  const f = fixture({
    paths: [['/api/v2/UI/schema']],
    pages: { 'a.md': 'Nothing.\n' },
    allowlist: { internal: [{ prefix: '/api/v2/UI', reason: '  ' }] },
  });
  const r = coverageRun(f);
  assert.strictEqual(r.status, 1, r.stdout + r.stderr);
  assert.match(r.stdout, /no reason/i);
});

test('@business an allow-list entry that matches no product route fails, so the list cannot go stale', () => {
  const f = fixture({
    paths: [['/api/v2/Alerts/Active']],
    pages: { 'a.md': '`GET /api/v2/Alerts/Active`\n' },
    allowlist: { internal: [{ prefix: '/api/v2/Removed', reason: 'Was internal.' }] },
  });
  const r = coverageRun(f);
  assert.strictEqual(r.status, 1, r.stdout + r.stderr);
  assert.match(r.stdout, /matches no route/i);
});

test('@business report mode lists the gaps and exits cleanly', () => {
  const f = fixture({ paths: [['/api/v2/Tags/Rules']], pages: { 'a.md': 'Nothing.\n' } });
  const r = coverageRun(f, '--report');
  assert.strictEqual(r.status, 0, r.stdout + r.stderr);
  assert.match(r.stdout, /\/api\/v2\/Tags\/Rules/);
});

test('@business a route the docs name that the product does not have still fails the route check', () => {
  const f = fixture({
    paths: [['/api/v2/Alerts/Active']],
    pages: { 'a.md': '`GET /api/v2/Alerts/Active` and `GET /api/v2/Gone`\n' },
  });
  const r = offline(routes, ['--contract', f.contract, '--docs', f.docs]);
  assert.strictEqual(r.status, 1, r.stdout + r.stderr);
  assert.match(r.stdout, /\/api\/v2\/Gone/);
});

test('@business the route check runs with no instance, from the contract file alone', () => {
  const f = fixture({ paths: [['/api/v2/Alerts/Active']], pages: { 'a.md': '`GET /api/v2/Alerts/Active`\n' } });
  const r = offline(routes, ['--contract', f.contract, '--docs', f.docs]);
  assert.strictEqual(r.status, 0, r.stdout + r.stderr);
});

test('@unit placeholders match, whatever their spelling or case', () => {
  const { routeKey } = require('./check-route-coverage');
  assert.strictEqual(routeKey('/api/v2/Users/{username}/Password/Reset'), routeKey('/API/v2/users/<name>/password/reset/'));
});

test('@unit a group prefix does not cover the routes beneath it', () => {
  const { uncoveredRoutes, mentionedRoutes } = require('./check-route-coverage');
  const mentioned = mentionedRoutes('Routes under `/api/v2/Alerts` return alerts.');
  const { uncovered } = uncoveredRoutes({ contractPaths: ['/api/v2/Alerts/Active'], mentioned, allowlist: { internal: [] } });
  assert.deepStrictEqual(uncovered, ['/api/v2/Alerts/Active']);
});

test('@unit routes mapped outside the controllers are part of the contract', () => {
  const { withExtraRoutes } = require('./check-route-coverage');
  assert.ok(withExtraRoutes(['/api/v2/Alerts/Active']).includes('/api/v2/Ai/Mcp'));
});

test('@business a missing contract names the variable to set and exits with an error, not a crash', () => {
  const f = fixture({ paths: [['/api/v2/Alerts/Active']], pages: {} });
  const r = offline(coverage, ['--contract', path.join(path.dirname(f.contract), 'missing.json'), '--docs', f.docs, '--allowlist', f.list]);
  assert.strictEqual(r.status, 2, r.stdout + r.stderr);
  assert.match(r.stderr, /PROFINITY_CODE/);
});

test('@business a partial path that is not an API group does not count as a real endpoint', () => {
  // `/api/v2/Users/Current` is only the start of `/api/v2/Users/Current/ChangePassword`, so a page that
  // names it as a call points readers at an endpoint that is not published.
  const f = fixture({
    paths: [['/api/v2/Users/Current/ChangePassword', 'post']],
    pages: { 'a.md': 'Call `GET /api/v2/Users/Current` to read the account.\n' },
  });
  const r = offline(routes, ['--contract', f.contract, '--docs', f.docs]);
  assert.strictEqual(r.status, 1, r.stdout + r.stderr);
  assert.match(r.stdout, /\/api\/v2\/Users\/Current/);
});

test('@business the name of a whole API such as /api/v2/Alerts is still accepted as a group', () => {
  const f = fixture({
    paths: [['/api/v2/Alerts/Active']],
    pages: { 'a.md': 'The endpoints under `/api/v2/Alerts` list alerts. `GET /api/v2/Alerts/Active` lists the active ones.\n' },
  });
  const r = offline(routes, ['--contract', f.contract, '--docs', f.docs]);
  assert.strictEqual(r.status, 0, r.stdout + r.stderr);
});
