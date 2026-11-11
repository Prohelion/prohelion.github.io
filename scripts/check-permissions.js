#!/usr/bin/env node
/**
 * Check permission names in the docs against the names in the product code.
 *
 *   - Every permission in a table on Roles_and_Permissions.md must be a [DisplayName] of RoleSettingsModel.cs.
 *   - Every bold name followed by the word "permission" on any page must be one of those names.
 *   - Every permission in the code must be in a table on Roles_and_Permissions.md.
 *
 * Usage: PROFINITY_CODE=/path/to/Profinity node scripts/check-permissions.js [--out report.md]
 */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..', 'docs', 'Software', 'Profinity');
const code = path.resolve(process.env.PROFINITY_CODE || path.join(__dirname, '..', '..', 'Profinity'));
const outIndex = process.argv.indexOf('--out');
const outFile = outIndex > -1 ? process.argv[outIndex + 1] : null;
const modelFile = path.join(code, 'Profinity-Engine', 'Model', 'Security', 'RoleSettingsModel.cs');
const notPermissions = new Set(['Role name', 'Description']);

const names = new Set([...fs.readFileSync(modelFile, 'utf8').matchAll(/DisplayName\("([^"]+)"\)/g)].map((m) => m[1]).filter((n) => !notPermissions.has(n)));
const lower = new Map([...names].map((n) => [n.toLowerCase(), n]));

function walk(dir, files = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, files);
    else if (e.name.endsWith('.md')) files.push(full);
  }
  return files;
}

const findings = [];
const tablePage = path.join(root, 'Administration', 'Users_and_Access', 'Roles_and_Permissions.md');
const listed = new Set();
for (const file of walk(root)) {
  const rel = path.relative(root, file);
  const lines = fs.readFileSync(file, 'utf8').split('\n');
  let fence = false;
  let inSection = false;
  lines.forEach((line, i) => {
    if (/^\s*```/.test(line)) fence = !fence;
    if (fence) return;
    if (/^## /.test(line)) inSection = /^## What each permission allows/.test(line);
    if (file === tablePage && inSection) {
      const m = line.match(/^\|\s*\*\*(.+?)\*\*\s*\|/);
      if (m) {
        listed.add(m[1]);
        if (!names.has(m[1])) findings.push(`${rel}:${i + 1} the table lists **${m[1]}**, which is not a permission name in the code${lower.has(m[1].toLowerCase()) ? ` (the code spells it **${lower.get(m[1].toLowerCase())}**)` : ''}`);
      }
    }
    for (const m of line.matchAll(/\*\*([^*]+?)\*\*\s+permission\b/g)) {
      const n = m[1];
      if (!names.has(n) && !/^(the|a|an|this|each|any|its|that|view|no|or)\b/i.test(n)) {
        findings.push(`${rel}:${i + 1} **${n}** permission is not a permission name in the code${lower.has(n.toLowerCase()) ? ` (the code spells it **${lower.get(n.toLowerCase())}**)` : ''}`);
      }
    }
  });
}
for (const n of names) if (!listed.has(n)) findings.push(`The code has the permission **${n}**, and no table on Roles_and_Permissions.md lists it`);

const unique = [...new Set(findings)];
const report = `# Permission names in the docs against the code\n\nPermissions in the code: ${names.size}\nPermissions in the tables: ${listed.size}\nFindings: ${unique.length}\n\n${unique.map((f) => `- ${f}`).join('\n')}\n`;
if (outFile) fs.writeFileSync(outFile, report);
console.log(report);
process.exitCode = unique.length ? 1 : 0;
