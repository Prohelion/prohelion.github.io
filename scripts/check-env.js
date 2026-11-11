#!/usr/bin/env node
/**
 * Compare the PROFINITY_* environment variables in the docs with those in the Profinity code.
 *
 *   - A variable the docs name that no product code, script or compose file uses.
 *   - A variable the product code reads that no page in the docs names.
 *
 * Variables that the docs tell the reader to define for a tool, such as PROFINITY_TOKEN, are in `userDefined`.
 * Test-only variables are left out by path.
 *
 * Usage: PROFINITY_CODE=/path/to/Profinity node scripts/check-env.js [--out report.md]
 */
const fs = require('fs');
const path = require('path');

const docs = path.resolve(__dirname, '..', 'docs', 'Software', 'Profinity');
const code = path.resolve(process.env.PROFINITY_CODE || path.join(__dirname, '..', '..', 'Profinity'));
const outIndex = process.argv.indexOf('--out');
const outFile = outIndex > -1 ? process.argv[outIndex + 1] : null;
// Used by the product's own scripts, tests or installers, and not meant for a customer to set.
const internal = /^PROFINITY_(TEST_.*|ARGS|VARIABLE|SH|INSTALL_SHA256|MANIFEST_FILENAME|LEGACY_MANIFEST_FILENAME|GITHUB_REPO|DOTNET_INSTALL_SHA256)$/;
const userDefined = new Set(['PROFINITY_TOKEN', 'PROFINITY_ADMIN_USERNAME']);
const skipDirs = new Set(['node_modules', 'obj', 'bin', '.git', 'tasks', 'plans', 'Docs', 'artifacts', 'build']);
const testPath = /(^|\/)(Profinity-Tests|Profinity-QA-Runner|Test|Tests|test|tests|__tests__)(\/|$)|Test\.cs$|Tests\.cs$/;

function walk(dir, ok, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (skipDirs.has(e.name)) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, ok, out);
    else if (ok(e.name)) out.push(full);
  }
  return out;
}

const names = (text) => new Set(text.match(/\bPROFINITY_[A-Z0-9_]+\b/g) || []);

const documented = new Map();
for (const f of walk(docs, (n) => n.endsWith('.md'))) {
  for (const v of names(fs.readFileSync(f, 'utf8'))) {
    if (!documented.has(v)) documented.set(v, path.relative(docs, f));
  }
}
const inProduct = new Map();
// Only code that ships to a customer: the engine, the components, the SDK, the console, the installers and the Docker image.
const shipped = /^(Profinity-Engine|Profinity-Components-Core|Profinity-SDK|Profinity-Console|Profinity-Release|Docker\/Profinity\/|deploy\/)/;
for (const f of walk(code, (n) => /\.(cs|sh|cmd|ps1|yml|yaml)$|^Dockerfile/.test(n))) {
  const rel = path.relative(code, f);
  if (testPath.test(rel) || !shipped.test(rel)) continue;
  for (const v of names(fs.readFileSync(f, 'utf8'))) if (!inProduct.has(v)) inProduct.set(v, rel);
}

const findings = [];
for (const [v, file] of documented) {
  if (!inProduct.has(v) && !userDefined.has(v)) findings.push(`${file} names \`${v}\`, which no product code, script or compose file uses`);
}
for (const [v, file] of inProduct) {
  if (!documented.has(v) && !internal.test(v)) findings.push(`The code uses \`${v}\` (${file}), and no page in the docs names it`);
}
const report = `# Environment variables in the docs against the code\n\nVariables in the docs: ${documented.size}\nVariables in the product code: ${inProduct.size}\nFindings: ${findings.length}\n\n${findings.map((f) => `- ${f}`).join('\n')}\n`;
if (outFile) fs.writeFileSync(outFile, report);
console.log(report);
process.exitCode = findings.length ? 1 : 0;
