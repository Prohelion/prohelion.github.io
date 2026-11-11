#!/usr/bin/env node
/**
 * Check the API routes and methods named in the docs against a running Profinity instance.
 *
 * Reads every `METHOD /api/v2/...` and `/api/v2/...` route in the docs, and checks it against the instance's
 * OpenAPI document (/swagger/v2/swagger.json). A route that the document does not list is reported. Routes that the
 * product maps outside the OpenAPI document are in the `outsideOpenApi` list below.
 *
 * Usage: PROFINITY_URL=http://localhost:18080 PROFINITY_TOKEN=<token> node scripts/check-routes.js [--out report.md]
 */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..', 'docs', 'Software', 'Profinity');
const base = (process.env.PROFINITY_URL || 'http://localhost:18080').replace(/\/$/, '');
const outIndex = process.argv.indexOf('--out');
const outFile = outIndex > -1 ? process.argv[outIndex + 1] : null;
// Mapped by the MCP library or a first-party handler, so they are not in the OpenAPI document.
const outsideOpenApi = [/^\/api\/v2\/Ai\/Mcp$/, /^\/scim\//, /^\/api\/v2\/UI\//, /^\/api\/v2\/Auth\/External\//];

async function token() {
  if (process.env.PROFINITY_TOKEN) return process.env.PROFINITY_TOKEN;
  const r = await fetch(`${base}/api/v2/Users/Authenticate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: process.env.PROFINITY_USER, password: process.env.PROFINITY_PASSWORD }),
  });
  if (!r.ok) throw new Error(`Sign-in failed: ${r.status}`);
  return (await r.json()).token;
}

function walk(dir, files = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, files);
    else if (e.name.endsWith('.md')) files.push(full);
  }
  return files;
}

const toRegex = (p) => new RegExp(`^${p.replace(/[.+?^$()|[\]\\]/g, '\\$&').replace(/\{\*[^}]+\}/g, '.+').replace(/\{[^}]+\}/g, '[^/]+')}/?$`, 'i');
const docRoute = (r) => r.replace(/<[^>]+>/g, 'x').replace(/\{[^}]+\}/g, 'x').replace(/[.,;:)]+$/, '');

async function main() {
  const t = await token();
  const r = await fetch(`${base}/swagger/v2/swagger.json`, { headers: { Authorization: `Bearer ${t}` } });
  if (!r.ok) throw new Error(`OpenAPI document -> ${r.status}`);
  const api = JSON.parse((await r.text()).replace(/^﻿/, ''));
  const routes = Object.entries(api.paths).map(([p, ops]) => ({ re: toRegex(p), methods: new Set(Object.keys(ops).map((m) => m.toUpperCase())), p }));

  const findings = [];
  let checked = 0;
  for (const file of walk(root)) {
    const rel = path.relative(root, file);
    const lines = fs.readFileSync(file, 'utf8').split('\n');
    lines.forEach((line, i) => {
      for (const m of line.matchAll(/(?:\b(GET|POST|PUT|PATCH|DELETE)\b[`\s|]+)?`?(\/api\/v2\/[A-Za-z0-9_/{}<>*.-]+)/g)) {
        const route = docRoute(m[2]);
        if (/\/api\/v2\/?$/.test(route)) continue;
        checked += 1;
        if (outsideOpenApi.some((o) => o.test(route))) continue;
        let hit = routes.filter((x) => x.re.test(route));
        // Prefer the most specific route: a literal segment beats a {parameter}, so Users/Authenticate is not Users/{username}.
        const fewest = Math.min(...hit.map((x) => (x.p.match(/\{/g) || []).length));
        hit = hit.filter((x) => (x.p.match(/\{/g) || []).length === fewest);
        // A group prefix such as /api/v2/Alerts names the routes beneath it. A route that the page describes as removed is not in the product.
        if (!hit.length && routes.some((x) => x.p.toLowerCase().startsWith(`${route.toLowerCase()}/`))) continue;
        if (!hit.length && /^\/api\/v2\/Data/.test(route) && (/^Release_Notes|Upgrade_From/.test(rel) || /removed|no longer|replaced/i.test(line))) continue;
        if (!hit.length) {
          findings.push(`${rel}:${i + 1} \`${m[2]}\` is not a route in the product's OpenAPI document`);
        } else if (m[1] && !hit.some((x) => x.methods.has(m[1]))) {
          findings.push(`${rel}:${i + 1} \`${m[1]} ${m[2]}\` is a route, but it does not accept ${m[1]} (it accepts ${[...new Set(hit.flatMap((x) => [...x.methods]))].join(', ')})`);
        }
      }
    });
  }
  const unique = [...new Set(findings)];
  const report = `# API routes in the docs against the running product\n\nInstance: ${base}\nRoute mentions checked: ${checked}\nFindings: ${unique.length}\n\n${unique.map((f) => `- ${f}`).join('\n')}\n`;
  if (outFile) fs.writeFileSync(outFile, report);
  console.log(report);
  process.exitCode = unique.length ? 1 : 0;
}
main().catch((e) => { console.error(e.message); process.exit(2); });
