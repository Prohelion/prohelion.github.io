#!/usr/bin/env node
/**
 * Check the YAML examples in the docs against a running Profinity instance.
 *
 *   - A `- component:` example must use only keys that the component type has settings for.
 *   - A `dashboard:` example must pass the instance's own dashboard schema (/api/v2/UI/schema).
 *
 * Usage:
 *   PROFINITY_URL=http://localhost:18080 PROFINITY_TOKEN=<token> node scripts/check-examples.js [--out report.md]
 *   PROFINITY_USER and PROFINITY_PASSWORD may be given in place of the token.
 *
 * The check only reads from the instance. A component type that the instance does not have installed is skipped
 * and listed, so that the example can be checked on an instance that has the plugin.
 */

const fs = require('fs');
const path = require('path');
const YAML = require('yaml');
const Ajv = require('ajv');

const root = path.resolve(__dirname, '..', 'docs', 'Software', 'Profinity');
const base = (process.env.PROFINITY_URL || 'http://localhost:18080').replace(/\/$/, '');
const outIndex = process.argv.indexOf('--out');
const outFile = outIndex > -1 ? process.argv[outIndex + 1] : null;

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

function yamlBlocks(file) {
  const lines = fs.readFileSync(file, 'utf8').split('\n');
  const blocks = [];
  for (let i = 0; i < lines.length; i += 1) {
    const m = lines[i].match(/^(\s*)``` ?yaml\s*$/);
    if (!m) continue;
    const indent = m[1].length;
    const body = [];
    let j = i + 1;
    for (; j < lines.length && !/^\s*```\s*$/.test(lines[j]); j += 1) body.push(lines[j].slice(indent));
    blocks.push({ line: i + 1, text: body.join('\n') });
    i = j;
  }
  return blocks;
}

function fieldsOf(node, out = []) {
  if (Array.isArray(node)) node.forEach((n) => fieldsOf(n, out));
  else if (node && typeof node === 'object') {
    if (node.label && node.id && node.type) out.push(node);
    Object.values(node).forEach((n) => fieldsOf(n, out));
  }
  return out;
}

const lower1 = (s) => s.charAt(0).toLowerCase() + s.slice(1);
const structural = new Set(['id', 'type', 'name', 'tagtreeparentpath']);

async function main() {
  const t = await token();
  const get = async (p) => {
    const r = await fetch(`${base}${p}`, { headers: { Authorization: `Bearer ${t}` } });
    if (!r.ok) throw new Error(`${p} -> ${r.status}`);
    return r.json();
  };
  const types = (await get('/api/v2/ActiveProfile/ComponentTypes')).map((x) => x.componentType);
  const keysByType = {};
  for (const type of types) {
    try {
      const keys = new Set();
      for (const f of fieldsOf(await get(`/api/v2/ActiveProfile/ComponentType/${type}/Settings`))) {
        const m = /^SETTINGS\.([A-Za-z0-9]+)/.exec(f.id);
        if (m) keys.add(lower1(m[1]).toLowerCase());
      }
      keysByType[type] = keys;
    } catch (e) {
      keysByType[type] = null;
    }
  }
  const schema = await get('/api/v2/UI/schema');
  const ajv = new Ajv({ strict: false, allErrors: false });
  const validateDashboard = ajv.compile(schema);

  const findings = [];
  const skipped = new Set();
  let components = 0;
  let dashboards = 0;
  for (const file of walk(root)) {
    const rel = path.relative(root, file);
    for (const block of yamlBlocks(file)) {
      let doc;
      try {
        doc = YAML.parse(block.text);
      } catch (e) {
        findings.push(`${rel}:${block.line} the YAML does not parse: ${e.message.split('\n')[0]}`);
        continue;
      }
      if (Array.isArray(doc)) {
        for (const item of doc) {
          const c = item && item.component;
          if (!c || typeof c !== 'object') continue;
          components += 1;
          const keys = keysByType[c.type];
          if (c.type && !(c.type in keysByType)) {
            skipped.add(`${c.type} (${rel})`);
            continue;
          }
          if (!keys) {
            findings.push(`${rel}:${block.line} the instance has no settings for component type ${c.type}`);
            continue;
          }
          for (const key of Object.keys(c)) {
            if (!structural.has(key.toLowerCase()) && !keys.has(key.toLowerCase())) {
              findings.push(`${rel}:${block.line} (${c.type}) the key \`${key}\` is not a setting of this component`);
            }
          }
        }
      } else if (doc && typeof doc === 'object' && doc.dashboard) {
        dashboards += 1;
        if (!validateDashboard(doc)) {
          const e = validateDashboard.errors[0];
          findings.push(`${rel}:${block.line} the dashboard fails the schema at ${e.instancePath || '/'}: ${e.message}`);
        }
      }
    }
  }

  const unique = [...new Set(findings)];
  const report = `# YAML examples against the running product\n\nInstance: ${base}\nComponent examples checked: ${components}\nDashboard examples checked: ${dashboards}\nFindings: ${unique.length}\n${skipped.size ? `\nSkipped, component type not installed on the instance:\n${[...skipped].map((s) => `- ${s}`).join('\n')}\n` : ''}\n${unique.map((f) => `- ${f}`).join('\n')}\n`;
  if (outFile) fs.writeFileSync(outFile, report);
  console.log(report);
  process.exitCode = unique.length ? 1 : 0;
}

main().catch((e) => {
  console.error(e.message);
  process.exit(2);
});
