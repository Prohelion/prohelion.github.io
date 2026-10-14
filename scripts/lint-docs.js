#!/usr/bin/env node
/**
 * Lint the Profinity 2.3 documentation against STYLE_GUIDE.md.
 *
 * Runs structure checks (front matter, headings, procedures, over-structure) and merges the
 * Vale prose rules from .vale.ini. Every page is reported. Only pages that declare a `type`
 * in front matter (refactored pages) can fail the run, so existing pages are reported
 * without blocking work while the refactor is under way.
 *
 * Usage:
 *   npm run lint-docs                       lint every 2.3 page, summary only
 *   npm run lint-docs -- --details          also list every finding
 *   npm run lint-docs -- <file-or-folder>   lint part of the docs
 *   npm run lint-docs -- --enforce-all      fail on any page, typed or not
 *   npm run lint-docs -- --no-vale          structure checks only
 *   npm run lint-docs -- --json             machine-readable output
 *
 * Exit code 1 when an enforced page has an error or warning.
 * Prerequisite: vale on the PATH (brew install vale), unless --no-vale is used.
 */

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const YAML = require('yaml');

const repoRoot = path.resolve(__dirname, '..');
const defaultRoot = path.join(repoRoot, 'docs', 'Profinity_Software', 'Profinity_Version_2.3');

const PAGE_TYPES = ['tutorial', 'task', 'reference', 'concept', 'component', 'index'];
const DESCRIPTION_MIN = 70;
const DESCRIPTION_MAX = 160;
const THIN_SECTION_WORDS = 35;
const MAX_ADMONITIONS = 2;
const ADMONITION_WORDS = 600;

function splitFrontMatter(text) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return { data: null, body: text, bodyOffset: 0 };
  let data = null;
  try {
    data = YAML.parse(match[1]) || {};
  } catch (err) {
    data = { __error: err.message };
  }
  const bodyOffset = text.slice(0, match[0].length).split('\n').length - 1;
  return { data, body: text.slice(match[0].length), bodyOffset };
}

/** Blank out fenced code so structure checks ignore it, keeping line numbers stable. */
function stripCode(body) {
  const lines = body.split('\n');
  let fence = null;
  return lines.map((line) => {
    const m = line.match(/^\s*(`{3,}|~{3,})/);
    if (m) {
      if (!fence) {
        fence = m[1][0];
        return '';
      }
      if (m[1][0] === fence) {
        fence = null;
        return '';
      }
    }
    return fence ? '' : line;
  });
}

function wordCount(lines) {
  return (lines.join(' ').match(/[A-Za-z0-9_]+/g) || []).length;
}

function structureFindings(text) {
  const findings = [];
  const add = (rule, severity, line, message) => findings.push({ rule, severity, line, message });
  const { data, body, bodyOffset } = splitFrontMatter(text);
  const lines = stripCode(body);

  // Front matter
  if (data === null) {
    add('FrontMatter', 'error', 1, 'The page has no front matter.');
  } else if (data.__error) {
    add('FrontMatter', 'error', 1, `Front matter is not valid YAML: ${data.__error}`);
  } else {
    const description = typeof data.description === 'string' ? data.description.trim() : '';
    if (!description) {
      add('Description', 'error', 1, 'Add a description of 70 to 160 characters (style guide 2.9).');
    } else if (description.length < DESCRIPTION_MIN || description.length > DESCRIPTION_MAX) {
      add('Description', 'warning', 1, `The description is ${description.length} characters. Aim for ${DESCRIPTION_MIN} to ${DESCRIPTION_MAX} (style guide 2.9).`);
    }
    if (!data.title) add('Title', 'error', 1, 'Add a title to the front matter.');
    if (data.type !== undefined) {
      if (!PAGE_TYPES.includes(data.type)) {
        add('PageType', 'error', 1, `type '${data.type}' is not one of ${PAGE_TYPES.join(', ')}.`);
      }
      if (!data.owner) add('Owner', 'error', 1, 'A page with a type needs an owner (style guide section 1).');
      const reviewed = data.last_reviewed instanceof Date
        ? data.last_reviewed.toISOString().slice(0, 10)
        : String(data.last_reviewed || '');
      if (!/^\d{4}-\d{2}-\d{2}$/.test(reviewed)) {
        add('LastReviewed', 'error', 1, 'A page with a type needs last_reviewed as an ISO date, for example 2026-10-14.');
      }
    }
  }

  // Headings
  const headings = [];
  lines.forEach((line, i) => {
    const m = line.match(/^(#{1,6})\s+(.*\S)\s*$/);
    if (m) headings.push({ level: m[1].length, text: m[2], line: i + 1, index: i });
  });
  const h1s = headings.filter((h) => h.level === 1);
  if (h1s.length !== 1) {
    add('Headings', 'error', h1s[1] ? h1s[1].line + bodyOffset : 1, `The page has ${h1s.length} H1 headings. Use exactly one (style guide 2.9).`);
  }
  headings.forEach((h, i) => {
    const prev = headings[i - 1];
    if (prev && h.level - prev.level > 1) {
      add('Headings', 'error', h.line + bodyOffset, `Heading level jumps from H${prev.level} to H${h.level} at '${h.text}' (style guide 2.9).`);
    }
    if (/[.:]$/.test(h.text)) {
      add('Headings', 'warning', h.line + bodyOffset, `Do not end the heading '${h.text}' with a full stop or colon (style guide section 1).`);
    }
  });

  // Over-structure (style guide 2.6a)
  let thin = 0;
  headings.filter((h) => h.level >= 2).forEach((h) => {
    const next = headings.find((n) => n.index > h.index);
    const end = next ? next.index : lines.length;
    if (wordCount(lines.slice(h.index + 1, end)) < THIN_SECTION_WORDS) thin += 1;
  });
  if (thin >= 2) {
    add('Structure', 'info', 1, `${thin} sections have under ${THIN_SECTION_WORDS} words. Remove headings the reader would not navigate to (style guide 2.6a).`);
  }
  const leadIns = lines.filter((l) => /^\s*[-*]\s+\*\*[^*]+\*\*\s*[:\-]/.test(l) || /\*\*(Note|Important|Tip|Warning):?\*\*/.test(l)).length;
  if (leadIns >= 3) {
    add('Structure', 'info', 1, `${leadIns} bold lead-in phrases. Bold is for UI labels only (style guide 2.6a).`);
  }
  const admonitions = lines.filter((l) => /^!!!\s/.test(l)).length;
  const words = wordCount(lines);
  if (admonitions > MAX_ADMONITIONS && admonitions > words / ADMONITION_WORDS) {
    add('Structure', 'info', 1, `${admonitions} admonitions in ${words} words. Use one or two a page, and no more than one per ${ADMONITION_WORDS} words (style guide 2.6a).`);
  }

  // Procedures
  if (data && (data.type === 'task' || data.type === 'tutorial')) {
    const numbered = lines.filter((l) => /^\s*\d+\.\s+\S/.test(l)).length;
    if (numbered < 2) {
      add('Procedure', 'error', 1, `A ${data.type} page needs a numbered procedure of two or more steps (style guide section 5).`);
    }
  }

  return { findings, data };
}


/** Heading slugs as MkDocs (Python-Markdown toc) generates them. */
function slugify(text) {
  return text
    .replace(/`/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/[*_]/g, '')
    .normalize('NFKD')
    .replace(/[^\x00-\x7F]/g, '')
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/[-\s]+/g, '-');
}

const headingCache = new Map();
function headingSlugs(file) {
  if (headingCache.has(file)) return headingCache.get(file);
  const slugs = new Set();
  const seen = {};
  for (const line of stripCode(splitFrontMatter(fs.readFileSync(file, 'utf8')).body)) {
    const m = line.match(/^#{1,6}\s+(.*?)\s*(?:\{#([\w-]+)\})?\s*$/);
    if (!m) continue;
    const slug = m[2] || slugify(m[1]);
    const n = seen[slug] || 0;
    seen[slug] = n + 1;
    slugs.add(n === 0 ? slug : `${slug}_${n}`);
  }
  headingCache.set(file, slugs);
  return slugs;
}

/** Relative links to other pages must point at a file and, when given, an anchor that exists. */
function linkFindings(file, text) {
  const findings = [];
  const { body, bodyOffset } = splitFrontMatter(text);
  stripCode(body).forEach((line, i) => {
    for (const m of line.matchAll(/\]\(([^)\s#]*)(?:#([^)\s]+))?\)/g)) {
      const [, target, anchor] = m;
      if (/^[a-z]+:/i.test(target) || (target && !target.endsWith('.md'))) continue;
      const resolved = target ? path.resolve(path.dirname(file), target) : file;
      if (!fs.existsSync(resolved)) {
        findings.push({ rule: 'Links', severity: 'error', line: i + 1 + bodyOffset, message: `The link target ${target} does not exist.` });
      } else if (anchor && !headingSlugs(resolved).has(anchor)) {
        findings.push({ rule: 'Links', severity: 'error', line: i + 1 + bodyOffset, message: `The anchor #${anchor} does not exist in ${target || 'this page'}.` });
      }
    }
  });
  return findings;
}

function runVale(target) {
  const probe = spawnSync('vale', ['--version'], { encoding: 'utf8' });
  if (probe.error) {
    return { error: 'vale was not found on the PATH. Install it with `brew install vale`, or use --no-vale.' };
  }
  const result = spawnSync('vale', ['--config', path.join(repoRoot, '.vale.ini'), '--output=JSON', target], {
    encoding: 'utf8',
    cwd: repoRoot,
    maxBuffer: 64 * 1024 * 1024,
  });
  if (!result.stdout || !result.stdout.trim()) return { alerts: {} };
  try {
    return { alerts: JSON.parse(result.stdout) };
  } catch (err) {
    return { error: `Could not read the Vale output: ${err.message}` };
  }
}

const SEVERITY_MAP = { error: 'error', warning: 'warning', suggestion: 'info' };

function listMarkdown(target) {
  const stat = fs.statSync(target);
  if (stat.isFile()) return [target];
  const out = [];
  (function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith('.md')) out.push(full);
    }
  })(target);
  return out.sort();
}

function lintTarget(target, options = {}) {
  const files = listMarkdown(target);
  let vale = { alerts: {} };
  if (!options.noVale) {
    vale = runVale(target);
    if (vale.error) throw new Error(vale.error);
  }
  const valeByFile = {};
  for (const [file, alerts] of Object.entries(vale.alerts)) {
    valeByFile[path.resolve(repoRoot, file)] = alerts;
  }
  return files.map((file) => {
    const text = fs.readFileSync(file, 'utf8');
    const { findings, data } = structureFindings(text);
    findings.push(...linkFindings(file, text));
    for (const a of valeByFile[path.resolve(file)] || []) {
      findings.push({
        rule: a.Check.replace(/^Prohelion\./, ''),
        severity: SEVERITY_MAP[a.Severity] || 'info',
        line: a.Line,
        message: a.Message,
      });
    }
    const enforced = options.enforceAll || Boolean(data && data.type);
    const failing = enforced ? findings.filter((f) => f.severity === 'error' || f.severity === 'warning') : [];
    return {
      file: path.relative(repoRoot, file),
      enforced,
      findings: findings.sort((a, b) => a.line - b.line),
      failing: failing.length,
    };
  });
}

function summarise(results) {
  const counts = { error: 0, warning: 0, info: 0 };
  const byRule = {};
  for (const r of results) {
    for (const f of r.findings) {
      counts[f.severity] += 1;
      const key = `${f.rule} (${f.severity})`;
      byRule[key] = (byRule[key] || 0) + 1;
    }
  }
  return { counts, byRule };
}

function main(argv) {
  const args = argv.slice(2);
  const flags = new Set(args.filter((a) => a.startsWith('--')));
  const targets = args.filter((a) => !a.startsWith('--'));
  const resolved = (targets.length ? targets : [defaultRoot]).map((t) => path.resolve(process.cwd(), t));

  let results;
  try {
    results = resolved.flatMap((target) => lintTarget(target, { noVale: flags.has('--no-vale'), enforceAll: flags.has('--enforce-all') }));
  } catch (err) {
    console.error(err.message);
    return 2;
  }

  if (flags.has('--json')) {
    console.log(JSON.stringify(results, null, 2));
  } else {
    if (flags.has('--details')) {
      for (const r of results) {
        if (!r.findings.length) continue;
        console.log(`\n${r.file}${r.enforced ? '  [enforced]' : ''}`);
        for (const f of r.findings) {
          console.log(`  ${String(f.line).padStart(4)}  ${f.severity.padEnd(7)} ${f.rule}: ${f.message}`);
        }
      }
      console.log('');
    }
    const { counts, byRule } = summarise(results);
    const enforcedPages = results.filter((r) => r.enforced);
    const failingPages = results.filter((r) => r.failing > 0);
    console.log(`Pages checked: ${results.length}. Enforced (declare a type): ${enforcedPages.length}.`);
    console.log(`Findings: ${counts.error} errors, ${counts.warning} warnings, ${counts.info} notes.`);
    const rules = Object.entries(byRule).sort((a, b) => b[1] - a[1]);
    if (rules.length) {
      console.log('By rule:');
      for (const [rule, n] of rules) console.log(`  ${String(n).padStart(5)}  ${rule}`);
    }
    if (failingPages.length) {
      console.log(`\nFAILED: ${failingPages.length} enforced page(s) have errors or warnings:`);
      for (const r of failingPages) console.log(`  ${r.file} (${r.failing})`);
    } else {
      console.log('\nOK: no enforced page has an error or warning.');
    }
  }
  return results.some((r) => r.failing > 0) ? 1 : 0;
}

if (require.main === module) {
  process.exitCode = main(process.argv);
}

module.exports = { structureFindings, linkFindings, lintTarget, splitFrontMatter };
