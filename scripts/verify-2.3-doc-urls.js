#!/usr/bin/env node
/**
 * Verify Profinity 2.3 documentation pages resolve after mkdocs build.
 *
 * Usage:
 *   npm run verify-2.3-urls
 *   npm run verify-2.3-urls -- --update-checklist
 *   DOCS_BASE_URL=http://127.0.0.1:8000 npm run verify-2.3-urls
 *
 * Prerequisites:
 *   mkdocs build  (from repo root; creates site/)
 *   optional: mkdocs serve for HTTP checks
 */

const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');

const repoRoot = path.resolve(__dirname, '..');
const docsDir = path.join(repoRoot, 'docs');
const siteDir = path.join(repoRoot, 'site');
const checklistPath = path.join(docsDir, 'internal', '2.3-review-checklist.md');
const baseUrl = (process.env.DOCS_BASE_URL || 'http://127.0.0.1:8000').replace(/\/$/, '');
const updateChecklist = process.argv.includes('--update-checklist');

/** @type {{ section: string, id: string, title: string, md: string }[]} */
const PAGES = [
  { section: 'Release notes (D01, D24)', id: 'D01', title: 'Profinity 2.3.1 release notes', md: 'Profinity_Software/Profinity_Version_2.3/Release_Notes/2.3.1.md' },
  { section: 'Release notes (D01, D24)', id: 'D24', title: 'Release notes index (2.3.1 entry)', md: 'Profinity_Software/Profinity_Version_2.3/Release_Notes/index.md' },
  { section: 'Installation (D02)', id: 'D02', title: 'Artifacts directory', md: 'Profinity_Software/Profinity_Version_2.3/Installation/Artifacts_Directory.md' },
  { section: 'Installation (D02)', id: 'D02', title: 'Zip installation (Linux path note)', md: 'Profinity_Software/Profinity_Version_2.3/Installation/Zip_Installation.md' },
  { section: 'Installation (D02)', id: 'D02', title: 'Docker installation (volume note)', md: 'Profinity_Software/Profinity_Version_2.3/Installation/Docker_Installation.md' },
  { section: 'Security and administration (D03, D04, D25–D27, D30)', id: 'D03', title: 'Roles and permissions', md: 'Profinity_Software/Profinity_Version_2.3/Administration/Users_and_Access/Roles_and_Permissions.md' },
  { section: 'Security and administration (D03, D04, D25–D27, D30)', id: 'D04', title: 'Password policy', md: 'Profinity_Software/Profinity_Version_2.3/Administration/System_Configuration/Security/Password_Policy.md' },
  { section: 'Security and administration (D03, D04, D25–D27, D30)', id: 'D25', title: 'SSO and sign-in method', md: 'Profinity_Software/Profinity_Version_2.3/Administration/System_Configuration/Security/SSO_and_Sign_In.md' },
  { section: 'Security and administration (D03, D04, D25–D27, D30)', id: 'D26', title: 'Two-factor authentication', md: 'Profinity_Software/Profinity_Version_2.3/Administration/System_Configuration/Security/Two_Factor_Authentication.md' },
  { section: 'Security and administration (D03, D04, D25–D27, D30)', id: 'D27', title: 'MFA account management', md: 'Profinity_Software/Profinity_Version_2.3/Administration/Users_and_Access/MFA_Account_Management.md' },
  { section: 'Security and administration (D03, D04, D25–D27, D30)', id: 'D17', title: 'SCIM and SIEM', md: 'Profinity_Software/Profinity_Version_2.3/Administration/System_Configuration/Security/SCIM_and_SIEM.md' },
  { section: 'Security and administration (D03, D04, D25–D27, D30)', id: 'D30', title: 'Service accounts', md: 'Profinity_Software/Profinity_Version_2.3/Administration/Users_and_Access/Service_Accounts.md' },
  { section: 'Security and administration (D03, D04, D25–D27, D30)', id: '—', title: 'Managing users (updated)', md: 'Profinity_Software/Profinity_Version_2.3/Administration/Users_and_Access/Manage_Users.md' },
  { section: 'Security and administration (D03, D04, D25–D27, D30)', id: '—', title: 'Security guide (updated roles section)', md: 'Profinity_Software/Profinity_Version_2.3/Installation/Security.md' },
  { section: 'Tag layer, rules, alerts (D06, D07, D14, D16, D20)', id: 'D16', title: 'Tag layer overview', md: 'Profinity_Software/Profinity_Version_2.3/Tags/index.md' },
  { section: 'Tag layer, rules, alerts (D06, D07, D14, D16, D20)', id: 'D14', title: 'Tag linking', md: 'Profinity_Software/Profinity_Version_2.3/Tags/Tag_Linking.md' },
  { section: 'Tag layer, rules, alerts (D06, D07, D14, D16, D20)', id: 'D06', title: 'Alerts Log', md: 'Profinity_Software/Profinity_Version_2.3/Tags/Alerts.md' },
  { section: 'Tag layer, rules, alerts (D06, D07, D14, D16, D20)', id: 'D07', title: 'Rule actions and scripts', md: 'Profinity_Software/Profinity_Version_2.3/Tags/Actions.md' },
  { section: 'Tag layer, rules, alerts (D06, D07, D14, D16, D20)', id: 'D20', title: 'Collections', md: 'Profinity_Software/Profinity_Version_2.3/Tags/Collections.md' },
  { section: 'Dashboards (D19, D29)', id: 'D19', title: 'Dashboard visual editor', md: 'Profinity_Software/Profinity_Version_2.3/Customising_Profinity/Dashboards/Visual_Editor.md' },
  { section: 'Dashboards (D19, D29)', id: 'D19', title: 'Dashboard development guide (updated)', md: 'Profinity_Software/Profinity_Version_2.3/Customising_Profinity/Dashboards/index.md' },
  { section: 'Components and plugins (D05, D12, D13, D18, D28)', id: 'D12', title: 'Component types', md: 'Profinity_Software/Profinity_Version_2.3/Developing_with_Profinity/Custom_Components/Component_Types.md' },
  { section: 'Components and plugins (D05, D12, D13, D18, D28)', id: 'D28', title: 'Component Pack CLI', md: 'Profinity_Software/Profinity_Version_2.3/Developing_with_Profinity/Custom_Components/Component_Pack_CLI.md' },
  { section: 'Components and plugins (D05, D12, D13, D18, D28)', id: 'D05', title: 'Component catalog disable', md: 'Profinity_Software/Profinity_Version_2.3/Administration/Components_and_Plugins.md' },
  { section: 'Components and plugins (D05, D12, D13, D18, D28)', id: 'D13', title: 'DLL plugins (Plugin Manager)', md: 'Profinity_Software/Profinity_Version_2.3/Developing_with_Profinity/Plugins/index.md' },
  { section: 'Components and plugins (D05, D12, D13, D18, D28)', id: 'D12', title: 'Custom Components index (updated links)', md: 'Profinity_Software/Profinity_Version_2.3/Developing_with_Profinity/Custom_Components/index.md' },
  { section: 'Profiles, configuration, scripting, theming (D11, D23, D31)', id: 'D11', title: 'Menu layout', md: 'Profinity_Software/Profinity_Version_2.3/Administration/Menu_Layout.md' },
  { section: 'Profiles, configuration, scripting, theming (D11, D23, D31)', id: 'D23', title: 'Rule scripts', md: 'Profinity_Software/Profinity_Version_2.3/Developing_with_Profinity/Scripting/Script_Types/Rule_Scripts.md' },
  { section: 'Profiles, configuration, scripting, theming (D11, D23, D31)', id: 'D23', title: 'Scripting index (updated)', md: 'Profinity_Software/Profinity_Version_2.3/Developing_with_Profinity/Scripting/index.md' },
  { section: 'Profiles, configuration, scripting, theming (D11, D23, D31)', id: 'D31', title: 'Themes and branding', md: 'Profinity_Software/Profinity_Version_2.3/Customising_Profinity/Theming/index.md' },
  { section: 'Mobile (D08, D09)', id: 'D08', title: 'Profinity Mobile', md: 'Profinity_Software/Profinity_Version_2.3/Mobile/index.md' },
  { section: 'Mobile (D08, D09)', id: 'D09', title: 'OEM white-label mobile', md: 'Profinity_Software/Profinity_Version_2.3/Mobile/OEM_White_Label.md' },
  { section: 'Hub pages (updated navigation)', id: '—', title: 'Customising Profinity index', md: 'Profinity_Software/Profinity_Version_2.3/Customising_Profinity/index.md' },
  { section: 'Hub pages (updated navigation)', id: '—', title: 'Integrating to Profinity index', md: 'Profinity_Software/Profinity_Version_2.3/Integrating_to_Profinity/index.md' },
  { section: 'Hub pages (updated navigation)', id: '—', title: 'Developing with Profinity index', md: 'Profinity_Software/Profinity_Version_2.3/Developing_with_Profinity/index.md' },
  { section: 'Hub pages (updated navigation)', id: '—', title: 'Profinity V2 overview', md: 'Profinity_Software/Profinity_Version_2.3/index.md' },
];

/**
 * @param {string} mdPath path under docs/
 * @returns {string | null} site-relative URL path (leading slash) or null
 */
function resolveBuiltUrlPath(mdPath) {
  const rel = mdPath.replace(/\.md$/, '');
  const isIndex = rel.endsWith('/index') || rel === 'index';
  const base = isIndex ? rel.replace(/\/index$/, '') : rel;

  const candidates = [];
  if (isIndex) {
    candidates.push(`${base}/index.html`);
    if (base) {
      candidates.push(`${base}.html`);
      candidates.push(`${base}/`);
    } else {
      candidates.push('index.html');
    }
  } else {
    candidates.push(`${rel}.html`);
    candidates.push(`${rel}/index.html`);
  }

  for (const candidate of candidates) {
    const sitePath = path.join(siteDir, candidate.replace(/^\//, '').split('/').join(path.sep));
    if (fs.existsSync(sitePath)) {
      return '/' + candidate.replace(/\\/g, '/');
    }
  }
  return null;
}

/**
 * @param {string} urlPath
 * @returns {Promise<{ status: number | string, ok: boolean }>}
 */
function httpHead(urlPath) {
  return new Promise((resolve) => {
    const url = new URL(baseUrl + urlPath);
    const lib = url.protocol === 'https:' ? https : http;
    const req = lib.request(url, { method: 'GET', timeout: 5000 }, (res) => {
      res.resume();
      resolve({ status: res.statusCode || 0, ok: res.statusCode >= 200 && res.statusCode < 400 });
    });
    req.on('error', (err) => resolve({ status: err.code || 'ERR', ok: false }));
    req.on('timeout', () => {
      req.destroy();
      resolve({ status: 'TIMEOUT', ok: false });
    });
    req.end();
  });
}

/** @param {{ section: string, id: string, title: string, urlPath: string | null }[]} results */
function writeChecklist(results) {
  const sectionOrder = [...new Set(PAGES.map((p) => p.section))];
  const lines = [
    '---',
    'title: Profinity 2.3 — Review checklist',
    '---',
    '',
    '# Profinity 2.3 documentation review checklist',
    '',
    '**Branch:** `feature/Profinity_2_3` · **Release:** 2.3',
    '',
    'URLs in this page are generated from the built site. Re-sync after doc changes:',
    '',
    '```bash',
    'cd Profinity-Docs',
    'source venv/bin/activate && mkdocs build',
    'mkdocs serve   # separate terminal, for click-through review',
    'cd scripts && npm run verify-2.3-urls -- --update-checklist',
    '```',
    '',
    `**This checklist:** ${baseUrl}/internal/2.3-review-checklist.html`,
    '',
  ];

  for (const section of sectionOrder) {
    const rows = results.filter((r) => r.section === section);
    lines.push('---', '', `## ${section}`, '', '| OK | ID | Page | Local URL |', '|----|-----|------|-----------|');
    for (const r of rows) {
      const url = r.urlPath ? `${baseUrl}${r.urlPath}` : '(not built)';
      lines.push(`| [ ] | ${r.id} | ${r.title} | [Open](${url}) |`);
    }
    lines.push('');
  }

  lines.push(
    '---',
    '',
    '## Sign-off',
    '',
    '| Check | Status |',
    '|-------|--------|',
    '| `npm run verify-2.3-urls` → all HTTP 200 | [ ] |',
    '| `npm run validate-dashboards` → Invalid: 0 | [ ] |',
    '| Placeholder screenshots replaced (SS-01–SS-35 minimum) | [ ] |',
    '| Engineering review of security and breaking-change accuracy | [ ] |',
    '',
    '**Reviewer:** _________________ **Date:** _________________',
    '',
    '---',
    '',
    `[← Writer brief](${baseUrl}/internal/2.3-writer-brief.html)`,
    ''
  );

  fs.writeFileSync(checklistPath, lines.join('\n'));
}

async function main() {
  if (!fs.existsSync(siteDir)) {
    console.error('ERROR: site/ not found. Run from repo root: mkdocs build');
    process.exit(1);
  }

  console.log('Profinity 2.3 documentation URL verification\n');
  console.log(`Site dir:  ${siteDir}`);
  console.log(`HTTP base: ${baseUrl}\n`);

  const results = [];
  let missing = 0;
  let httpFail = 0;

  for (const page of PAGES) {
    const mdFull = path.join(docsDir, page.md);
    if (!fs.existsSync(mdFull)) {
      results.push({ ...page, urlPath: null, siteOk: false, httpStatus: 'NO_MD', httpOk: false });
      missing++;
      continue;
    }

    const urlPath = resolveBuiltUrlPath(page.md);
    const siteOk = urlPath !== null;
    if (!siteOk) {
      missing++;
    }

    let httpStatus = 'SKIP';
    let httpOk = true;
    if (urlPath) {
      const http = await httpHead(urlPath);
      httpStatus = http.status;
      httpOk = http.ok;
      if (!httpOk) {
        httpFail++;
      }
    }

    results.push({ ...page, urlPath, siteOk, httpStatus, httpOk });
  }

  const colId = 6;
  const colTitle = 42;
  console.log(
    `${'ID'.padEnd(colId)} ${'Page'.padEnd(colTitle)} ${'Site'.padEnd(6)} HTTP  URL`
  );
  console.log('-'.repeat(120));

  for (const r of results) {
    const siteFlag = r.siteOk ? 'OK' : 'MISS';
    const httpFlag = r.httpStatus === 'SKIP' ? '—' : String(r.httpStatus);
    const url = r.urlPath ? baseUrl + r.urlPath : '(not built)';
    console.log(
      `${r.id.padEnd(colId)} ${r.title.slice(0, colTitle).padEnd(colTitle)} ${siteFlag.padEnd(6)} ${httpFlag.padEnd(5)} ${url}`
    );
  }

  console.log('\n' + '='.repeat(60));
  console.log(`Pages: ${PAGES.length}  Missing on disk: ${missing}  HTTP failures: ${httpFail}`);

  if (missing > 0 || httpFail > 0) {
    console.log('\nFAILED — fix source paths or run mkdocs build');
    process.exit(1);
  }

  console.log('\nAll pages resolved and reachable.');

  if (updateChecklist) {
    writeChecklist(results);
    console.log(`\nUpdated ${checklistPath}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
