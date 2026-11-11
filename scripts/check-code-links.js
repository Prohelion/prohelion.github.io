#!/usr/bin/env node
/**
 * Check that every documentation link in the Profinity code points at a page that exists in these docs.
 *
 * The code holds docs.prohelion.com links, such as the "documentation" link of each component. This reads them
 * from the code repository and checks each one against docs/Software/Profinity.
 *
 * Usage: PROFINITY_CODE=/path/to/Profinity node scripts/check-code-links.js
 * The code path defaults to ../../Profinity, next to this repository.
 */
const fs = require('fs');
const path = require('path');

const docs = path.resolve(__dirname, '..', 'docs', 'Software', 'Profinity');
const code = path.resolve(process.env.PROFINITY_CODE || path.join(__dirname, '..', '..', 'Profinity'));
const skip = new Set(['node_modules', 'obj', 'bin', '.git', 'tasks', 'plans', 'Docs']);

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (skip.has(e.name)) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, out);
    else if (/\.(cs|ts|tsx|yaml|json)$/.test(e.name)) out.push(full);
  }
  return out;
}

const found = new Map();
for (const file of walk(code)) {
  const text = fs.readFileSync(file, 'utf8');
  for (const m of text.matchAll(/https:\/\/docs\.prohelion\.com\/(Software\/Profinity|Profinity_Software\/Profinity_Version_2\.3)\/([^"'\s)#<>]*)/g)) {
    const key = `${m[1]}|${m[2]}`;
    if (!found.has(key)) found.set(key, new Set());
    found.get(key).add(path.relative(code, file));
  }
}

const problems = [];
for (const [key, files] of found) {
  const [root, rest] = key.split('|');
  const where = [...files][0];
  if (root !== 'Software/Profinity') {
    problems.push(`${where}: link uses the old path Profinity_Software/Profinity_Version_2.3/${rest}`);
    continue;
  }
  const p = rest.replace(/\.html$/, '').replace(/\/$/, '');
  const ok = p === '' ? fs.existsSync(path.join(docs, 'index.md')) : fs.existsSync(path.join(docs, `${p}.md`)) || fs.existsSync(path.join(docs, p, 'index.md'));
  if (!ok) problems.push(`${where}: no docs page at ${rest}`);
}
console.log(`Documentation links in the code: ${found.size}\nProblems: ${problems.length}\n${problems.map((x) => `- ${x}`).join('\n')}`);
process.exitCode = problems.length ? 1 : 0;
