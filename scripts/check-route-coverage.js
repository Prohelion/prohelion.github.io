#!/usr/bin/env node
/**
 * Check that every REST route in the product has a page in the docs, or a stated reason why it does not.
 *
 * check-routes.js catches a route that the docs name and the product does not have. This catches the opposite: a
 * product route that no page names. It reads the product's committed OpenAPI document (see contract.js), so it runs
 * with Profinity offline, and it lists the routes the docs lack, grouped by controller.
 *
 * A route is covered when a page names it. Placeholders match whatever their spelling, so `{username}` and `<user>` are
 * the same segment. A group prefix such as `/api/v2/Alerts` does not cover the routes beneath it.
 * A route that is not for integrators goes in scripts/route-allowlist.json with a reason.
 *
 * Usage: PROFINITY_CODE=/path/to/Profinity node scripts/check-route-coverage.js [--report] [--out report.md]
 *        [--contract swagger.json] [--docs docs-folder] [--allowlist route-allowlist.json]
 * --report lists the gaps and exits 0. Without it, a gap, a reasonless entry or a stale entry exits 1.
 */
const fs = require('fs');
const path = require('path');
const { argValue, docsRoot, readContract, walk, extraRoutes } = require('./contract');

const routePattern = /\/(?:api|scim)\/v2\/[A-Za-z0-9_/{}.*-]+/g;

// Spelling-insensitive: placeholders collapse to {}, case and a trailing slash are ignored.
function routeKey(route) {
  return route
    .replace(/<[^>\n]*>/g, '{}')
    .replace(/\{[^}\n]*\}/g, '{}')
    .replace(/[.,;:)'"]+$/, '')
    .replace(/\/+$/, '')
    .toLowerCase();
}

function mentionedRoutes(text) {
  const prepared = text.replace(/<[^>\n`]*>/g, '{}').replace(/\{[^}\n`]*\}/g, '{}');
  return new Set([...prepared.matchAll(routePattern)].map((m) => routeKey(m[0])));
}

const withExtraRoutes = (paths) => [...new Set([...paths, ...extraRoutes])];

const covers = (entry, key) => {
  if (entry.route) return routeKey(entry.route) === key;
  const prefix = routeKey(entry.prefix || '');
  return key === prefix || key.startsWith(`${prefix}/`);
};

function uncoveredRoutes({ contractPaths, mentioned, allowlist }) {
  const entries = allowlist.internal || [];
  const keyed = contractPaths.map((p) => ({ path: p, key: routeKey(p) }));
  const invalidAllow = entries.filter((e) => !String(e.reason || '').trim() || !(e.route || e.prefix));
  const staleAllow = entries.filter((e) => (e.route || e.prefix) && !keyed.some((k) => covers(e, k.key)));
  const uncovered = keyed
    .filter((k) => !mentioned.has(k.key) && !entries.some((e) => covers(e, k.key)))
    .map((k) => k.path);
  return { uncovered, invalidAllow, staleAllow };
}

const controllerOf = (route) => {
  const parts = route.split('/').filter(Boolean);
  return parts[0] === 'scim' ? 'scim' : parts[2] || '(root)';
};

function main() {
  const report = process.argv.includes('--report');
  const outFile = argValue('--out');
  const allowFile = path.resolve(argValue('--allowlist') || path.join(__dirname, 'route-allowlist.json'));
  const allowlist = fs.existsSync(allowFile) ? JSON.parse(fs.readFileSync(allowFile, 'utf8')) : { internal: [] };

  const contractPaths = withExtraRoutes(Object.keys(readContract().paths));
  const mentioned = new Set();
  for (const file of walk(docsRoot())) for (const k of mentionedRoutes(fs.readFileSync(file, 'utf8'))) mentioned.add(k);

  const { uncovered, invalidAllow, staleAllow } = uncoveredRoutes({ contractPaths, mentioned, allowlist });

  const byController = uncovered.reduce((acc, r) => ({ ...acc, [controllerOf(r)]: [...(acc[controllerOf(r)] || []), r] }), {});
  const lines = [
    '# Product routes against the docs',
    '',
    `Product routes: ${contractPaths.length}`,
    `Not documented and not allowed: ${uncovered.length}`,
    `Allow-list problems: ${invalidAllow.length + staleAllow.length}`,
    '',
  ];
  for (const [controller, routes] of Object.entries(byController).sort()) {
    lines.push(`## ${controller} (${routes.length})`, ...routes.sort().map((r) => `- \`${r}\` is not documented`), '');
  }
  invalidAllow.forEach((e) => lines.push(`- Allow-list entry \`${e.route || e.prefix || JSON.stringify(e)}\` has no reason or no route`));
  staleAllow.forEach((e) => lines.push(`- Allow-list entry \`${e.route || e.prefix}\` matches no route in the product`));

  const text = `${lines.join('\n')}\n`;
  if (outFile) fs.writeFileSync(outFile, text);
  console.log(text);
  process.exitCode = !report && (uncovered.length || invalidAllow.length || staleAllow.length) ? 1 : 0;
}

if (require.main === module) {
  try {
    main();
  } catch (e) {
    console.error(e.message);
    process.exit(2);
  }
}

module.exports = { routeKey, mentionedRoutes, uncoveredRoutes, withExtraRoutes };
