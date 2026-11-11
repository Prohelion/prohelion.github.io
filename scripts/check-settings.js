#!/usr/bin/env node
/**
 * Compare the settings tables in the docs with the settings that a running Profinity instance reports.
 *
 * For every component type the instance lists, this fetches the settings (label, type, default, range, required)
 * and compares them with the settings tables on the docs pages. It reports:
 *   - a table label that the product does not have (a wrong or retired label),
 *   - a product setting that the page does not document,
 *   - a default, range or type that differs.
 *
 * Usage:
 *   PROFINITY_URL=http://localhost:18080 PROFINITY_USER=admin PROFINITY_PASSWORD=... node scripts/check-settings.js [--out report.md]
 *   PROFINITY_TOKEN=<bearer token> may be given in place of the user and password.
 *   Add --undocumented to also list product settings that no table on a page lists. A component's settings can
 *   live on a sibling page, so that list needs a person to read it.
 *
 * The check only reads from the instance.
 */

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..', 'docs', 'Software', 'Profinity');
const base = (process.env.PROFINITY_URL || 'http://localhost:18080').replace(/\/$/, '');
const showUndocumented = process.argv.includes('--undocumented');
const outIndex = process.argv.indexOf('--out');
const outFile = outIndex > -1 ? process.argv[outIndex + 1] : null;

async function token() {
  if (process.env.PROFINITY_TOKEN) return process.env.PROFINITY_TOKEN;
  const response = await fetch(`${base}/api/v2/Users/Authenticate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: process.env.PROFINITY_USER, password: process.env.PROFINITY_PASSWORD }),
  });
  if (!response.ok) throw new Error(`Sign-in failed: ${response.status}`);
  return (await response.json()).token;
}

function fieldsOf(node, out = []) {
  if (Array.isArray(node)) node.forEach((n) => fieldsOf(n, out));
  else if (node && typeof node === 'object') {
    if (node.label && node.id && node.type) out.push(node);
    Object.values(node).forEach((n) => fieldsOf(n, out));
  }
  return out;
}

const norm = (s) => String(s).toLowerCase().replace(/[^a-z0-9]/g, '');

function productTypeName(f) {
  switch (f.type) {
    case 'StringValue': return ['Text'];
    case 'NumberValue': return ['Whole number', 'Decimal number', 'Time', 'Hexadecimal number'];
    case 'BoolValue': case 'BooleanValue': case 'CheckValue': return ['On or off'];
    case 'ListValues': return ['Choice'];
    case 'PasswordValue': return ['Secret'];
    case 'HexValue': return ['Hexadecimal number'];
    default: return null;
  }
}

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (entry.name.endsWith('.md')) files.push(full);
  }
  return files;
}

function parseTables(file) {
  const lines = fs.readFileSync(file, 'utf8').split('\n');
  const tables = [];
  for (let i = 0; i < lines.length - 1; i += 1) {
    if (!lines[i].startsWith('|') || !/^\|[\s:|-]+\|$/.test(lines[i + 1] || '')) continue;
    const header = lines[i].split('|').slice(1, -1).map((c) => c.trim().toLowerCase());
    const typeCol = header.indexOf('type');
    const defCol = header.findIndex((h) => h === 'default' || h === 'defaults');
    if (typeCol < 0 || defCol < 0) continue;
    const rows = [];
    let j = i + 2;
    for (; j < lines.length && lines[j].startsWith('|'); j += 1) {
      const cells = lines[j].split(/(?<!\\)\|/).slice(1, -1).map((c) => c.trim());
      const label = (cells[0].match(/^\*\*(.+?)\*\*$/) || [])[1];
      if (label) rows.push({ label, type: cells[typeCol], def: cells[defCol], text: cells.join(' '), line: j + 1 });
    }
    if (rows.length) tables.push({ file, line: i + 1, rows });
    i = j;
  }
  return tables;
}

const clean = (s) => String(s).replace(/`/g, '').replace(/\*\*/g, '').trim().toLowerCase();

function sameDefault(doc, prod) {
  const d = clean(doc);
  const p = clean(prod ?? '');
  if (['none', 'empty', 'blank', '-', '', 'none (empty)'].includes(d) && ['', 'none', 'null'].includes(p)) return true;
  if (d === p) return true;
  if ((d === 'on' || d === 'enabled' || d === 'true') && p === 'true') return true;
  if ((d === 'off' || d === 'disabled' || d === 'false') && p === 'false') return true;
  const dn = d.replace(/[^0-9.\-]/g, '');
  return dn !== '' && dn === p.replace(/[^0-9.\-]/g, '') && /^[0-9.\-\s]+[a-z ()]*$/.test(d);
}

function rangeOf(text) {
  const m = text.match(/(?:from|between)\s+`?(-?\d+(?:\.\d+)?)`?\s+(?:to|and)\s+`?(-?\d+(?:\.\d+)?)`?/i);
  return m ? [m[1], m[2]] : null;
}

async function main() {
  const t = await token();
  const get = async (p) => {
    const r = await fetch(`${base}${p}`, { headers: { Authorization: `Bearer ${t}` } });
    if (!r.ok) throw new Error(`${p} -> ${r.status}`);
    return r.json();
  };
  const types = (await get('/api/v2/ActiveProfile/ComponentTypes')).map((x) => x.componentType);
  const product = {};
  for (const type of types) {
    try {
      const fields = fieldsOf(await get(`/api/v2/ActiveProfile/ComponentType/${type}/Settings`));
      product[type] = new Map();
      // The first field with a label is the component's own; a later one with the same label is a shared field such as Mode.
      for (const f of fields) if (!product[type].has(norm(f.label))) product[type].set(norm(f.label), f);
    } catch (e) {
      product[type] = null;
    }
  }

  const findings = [];
  const tables = walk(root).flatMap(parseTables);
  const ignored = new Set(['firmwareconfigurationkey']);
  const common = /^(name|tagtreepath|tagtreeparentpath|mode|allowedroles|role|pointmap|folder|collection|datatype|plctag|unit|writable|address|nodeid|table|offset|area|dbnumber|objecttype|instance)$/;
  const byPageType = new Map();
  for (const table of tables) {
    const rel = path.relative(root, table.file);
    const labels = table.rows.map((r) => norm(r.label));
    let best = null;
    for (const [type, map] of Object.entries(product)) {
      if (!map) continue;
      const hit = labels.filter((l) => map.has(l)).length;
      // A page whose file name holds every word of a type name (Elmar_Solar_MPPT.md for ElmarMPPT) wins a tie.
      const words = type.replace(/([a-z0-9])([A-Z])/g, '$1 $2').toLowerCase().split(' ').filter((w) => !/^(component|device)$/.test(w));
      const bonus = words.length > 1 && words.every((w) => norm(path.basename(table.file)).includes(w)) ? 0.5 : 0;
      if (!best || hit + bonus > best.hit + best.bonus || (hit + bonus === best.hit + best.bonus && map.size < best.map.size)) best = { type, hit, bonus, map };
    }
    // Compare only when nearly all of the table's labels belong to one component type.
    if (!best || best.hit < 3 || best.hit / labels.length < 0.8) continue;
    const anywhere = (l) => Object.values(product).some((m) => m && m.has(l));
    const key = `${rel}|${best.type}`;
    if (!byPageType.has(key)) byPageType.set(key, { rel, type: best.type, map: best.map, documented: new Set(), line: table.line });
    labels.forEach((l) => byPageType.get(key).documented.add(l));
    for (const row of table.rows) {
      if (/ and |\//.test(row.label)) continue;
      const f = best.map.get(norm(row.label));
      if (!f) {
        if (anywhere(norm(row.label)) || ignored.has(norm(row.label))) continue;
        findings.push(`${rel}:${row.line} (${best.type}) **${row.label}** is not a setting of this component in the product`);
        continue;
      }
      if (f.label !== row.label) findings.push(`${rel}:${row.line} (${best.type}) label is **${row.label}** but the product shows **${f.label}**`);
      const names = productTypeName(f);
      const docType = (row.type || '').toLowerCase();
      const textOrChoice = /^(text|choice|file upload)/.test(docType) && (f.type === 'StringValue' || f.type === 'ListValues');
      if (/true or false/.test(docType)) findings.push(`${rel}:${row.line} (${best.type}) **${row.label}** type is "${row.type}", and the house form for a switch is "On or off"`);
      if (names && docType && !textOrChoice && !/true or false/.test(docType) && !/\band\b|\/|,/.test(docType)
        && !names.some((n) => docType.startsWith(n.toLowerCase()))) {
        findings.push(`${rel}:${row.line} (${best.type}) **${row.label}** type is "${row.type}" but the product type is ${f.type}`);
      }
      if (f.type !== 'PasswordValue' && norm(row.label) !== 'name' && f.value !== undefined && !String(f.value).includes('\n') && !sameDefault(row.def, f.value)
        && !/depends|follows|see |refer|the default|model|none \(|each|per |first|all |or `|, or|unless/i.test(row.def)) {
        findings.push(`${rel}:${row.line} (${best.type}) **${row.label}** default is "${row.def}" but the product default is "${f.value}"`);
      }
      const range = f.rangePattern && f.rangePattern.match(/\[\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*\]/);
      const doc = rangeOf(row.text);
      if (range && doc && (doc[0] !== range[1] || doc[1] !== range[2]) && !row.text.includes(`${range[1]} to ${range[2]}`) && !(row.text.includes(`${range[1]}`) && doc[1] === range[2])) {
        findings.push(`${rel}:${row.line} (${best.type}) **${row.label}** range is ${doc[0]} to ${doc[1]} but the product range is ${range[1]} to ${range[2]}`);
      }
    }
  }
  for (const entry of showUndocumented ? byPageType.values() : []) {
    for (const [k, f] of entry.map) {
      if (!entry.documented.has(k) && !common.test(norm(f.id.replace(/^SETTINGS\./, '')).replace(/^settings/, '')) && !common.test(k)) {
        findings.push(`${entry.rel}:${entry.line} (${entry.type}) the product has **${f.label}**, which no table on this page lists`);
      }
    }
  }

  const unique = [...new Set(findings)];
  const report = `# Settings tables against the running product\n\nInstance: ${base}\nTables compared: ${tables.length}\nFindings: ${unique.length}\n\n${unique.map((f) => `- ${f}`).join('\n')}\n`;
  if (outFile) fs.writeFileSync(outFile, report);
  console.log(report);
  process.exitCode = unique.length ? 1 : 0;
}

main().catch((e) => {
  console.error(e.message);
  process.exit(2);
});
