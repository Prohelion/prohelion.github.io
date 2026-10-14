#!/usr/bin/env node
/**
 * Generate docs/llms-full.txt: every Profinity 2.3 page with its title and description,
 * grouped by section, for AI assistants and search tools.
 *
 * docs/llms.txt stays a small hand-written index (it should fit in a model's context) and
 * links to llms-full.txt. The descriptions come from page front matter, so improving a
 * description improves both search snippets and this file.
 *
 * Usage:
 *   npm run generate-llms        write docs/llms-full.txt
 *   npm run generate-llms -- --check   exit 1 if the file is out of date
 */

const fs = require('fs');
const path = require('path');
const YAML = require('yaml');

const repoRoot = path.resolve(__dirname, '..');
const docsDir = path.join(repoRoot, 'docs');
const root = path.join(docsDir, 'Profinity_Software', 'Profinity_Version_2.3');
const outFile = path.join(docsDir, 'llms-full.txt');
const siteUrl = 'https://docs.prohelion.com';

const SECTION_ORDER = [
  'Getting_Started',
  'Installation',
  'Administration',
  'Components',
  'Tags',
  'Customising_Profinity',
  'Integrating_to_Profinity',
  'Developing_with_Profinity',
  'CAN_Utilities',
  'Mobile',
  'Profinity_AI',
  'How_To_Guides',
  'Release_Notes',
];

function frontMatter(file) {
  const text = fs.readFileSync(file, 'utf8');
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return {};
  try {
    return YAML.parse(m[1]) || {};
  } catch {
    return {};
  }
}

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.name.endsWith('.md')) out.push(full);
  }
  return out;
}

function build() {
  const pages = walk(root).map((file) => {
    const rel = path.relative(docsDir, file).split(path.sep).join('/');
    const section = path.relative(root, file).split(path.sep)[0];
    const fm = frontMatter(file);
    return {
      rel,
      section: section.endsWith('.md') ? '' : section,
      title: fm.title || path.basename(file, '.md').replace(/_/g, ' '),
      description: (fm.description || '').toString().trim(),
    };
  });
  const bySection = new Map();
  for (const p of pages) {
    if (!bySection.has(p.section)) bySection.set(p.section, []);
    bySection.get(p.section).push(p);
  }
  const names = [...bySection.keys()].sort((a, b) => {
    const ia = SECTION_ORDER.indexOf(a);
    const ib = SECTION_ORDER.indexOf(b);
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib) || a.localeCompare(b);
  });

  const lines = [
    '# Profinity 2.3 documentation, full page list',
    '',
    '> Every page of the Profinity 2.3 documentation with a one-line description. Generated from page front matter by scripts/generate-llms-txt.js. For a short index, see /llms.txt.',
    '',
  ];
  for (const name of names) {
    lines.push(`## ${name ? name.replace(/_/g, ' ') : 'Overview'}`, '');
    const sorted = bySection.get(name).sort((a, b) => {
      const ai = /\/index\.md$/.test(a.rel) ? 0 : 1;
      const bi = /\/index\.md$/.test(b.rel) ? 0 : 1;
      return ai - bi || a.rel.localeCompare(b.rel);
    });
    for (const p of sorted) {
      const url = `${siteUrl}/${p.rel.replace(/\.md$/, '.html')}`;
      lines.push(`- [${p.title}](${url})${p.description ? `: ${p.description}` : ''}`);
    }
    lines.push('');
  }
  return lines.join('\n');
}

const content = build();
if (process.argv.includes('--check')) {
  const current = fs.existsSync(outFile) ? fs.readFileSync(outFile, 'utf8') : '';
  if (current !== content) {
    console.error('docs/llms-full.txt is out of date. Run: npm run generate-llms');
    process.exit(1);
  }
  console.log('docs/llms-full.txt is up to date.');
} else {
  fs.writeFileSync(outFile, content);
  console.log(`Wrote ${path.relative(repoRoot, outFile)} (${content.split('\n').filter((l) => l.startsWith('- [')).length} pages).`);
}
