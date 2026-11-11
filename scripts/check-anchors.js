#!/usr/bin/env node
/**
 * Check that every Markdown link with a #section resolves to a heading (or {#id}) in its target page,
 * and that every link to a .md file points at a file that exists.
 *
 * Usage: node scripts/check-anchors.js [--out report.md]
 */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..', 'docs', 'Software', 'Profinity');
const outIndex = process.argv.indexOf('--out');
const outFile = outIndex > -1 ? process.argv[outIndex + 1] : null;

function walk(dir, files = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, files);
    else if (e.name.endsWith('.md')) files.push(full);
  }
  return files;
}

// The slug rule of Python-Markdown's toc extension, which MkDocs uses.
function slug(text) {
  return text
    .replace(/`/g, '').replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/[*_]{1,2}/g, '')
    .normalize('NFKD').replace(/[^\x00-\x7F]/g, '')
    .replace(/[^\w\s-]/g, '').trim().toLowerCase().replace(/[-\s]+/g, '-');
}

const cache = new Map();
function anchorsOf(file) {
  if (cache.has(file)) return cache.get(file);
  const set = new Set();
  const used = new Map();
  let fence = false;
  for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
    if (/^\s*```/.test(line)) fence = !fence;
    if (fence) continue;
    const h = line.match(/^#{1,6}\s+(.*?)\s*(?:\{#([\w-]+)\})?\s*#*\s*$/);
    if (h) {
      if (h[2]) set.add(h[2]);
      const base = slug(h[1].replace(/\s*\{#[\w-]+\}\s*$/, ''));
      const n = used.get(base) || 0;
      used.set(base, n + 1);
      set.add(n ? `${base}_${n}` : base);
    }
    for (const m of line.matchAll(/\{#([\w-]+)\}/g)) set.add(m[1]);
    for (const m of line.matchAll(/\bid="([\w-]+)"/g)) set.add(m[1]);
  }
  cache.set(file, set);
  return set;
}

const findings = [];
let links = 0;
for (const file of walk(root)) {
  const rel = path.relative(root, file);
  let fence = false;
  fs.readFileSync(file, 'utf8').split('\n').forEach((line, i) => {
    if (/^\s*```/.test(line)) fence = !fence;
    if (fence) return;
    for (const m of line.replace(/`[^`]*`/g, '').matchAll(/\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) {
      const href = m[1];
      if (/^(https?:|mailto:|tel:|\/)/.test(href)) continue;
      const [target, frag] = href.split('#');
      const dest = target ? path.resolve(path.dirname(file), target) : file;
      if (target && !/\.md$/.test(target)) continue;
      links += 1;
      if (!fs.existsSync(dest)) { findings.push(`${rel}:${i + 1} links to \`${href}\`, and the page does not exist`); continue; }
      if (frag && !anchorsOf(dest).has(frag)) findings.push(`${rel}:${i + 1} links to \`${href}\`, and the page has no section #${frag}`);
    }
  });
}

const unique = [...new Set(findings)];
const report = `# Links and section anchors\n\nLinks checked: ${links}\nFindings: ${unique.length}\n\n${unique.map((f) => `- ${f}`).join('\n')}\n`;
if (outFile) fs.writeFileSync(outFile, report);
console.log(report);
process.exitCode = unique.length ? 1 : 0;
