/**
 * Shared loader for the product's REST contract, so the documentation checks run with Profinity offline.
 *
 * The contract is the OpenAPI document that the Profinity build regenerates on every build and commits at
 * Profinity-Web-GUI/ClientApp/src/services/apiClient/generated/swagger.json in the code repository. The checks read it
 * through PROFINITY_CODE, the same way check-permissions.js reads the role model. A live instance is used only when
 * PROFINITY_URL is set, as an override for a fresh cross-check.
 *
 * Routes that the product maps outside its controllers are not in that document, so they are listed here.
 */
const fs = require('fs');
const path = require('path');

const contractRelative = ['Profinity-Web-GUI', 'ClientApp', 'src', 'services', 'apiClient', 'generated', 'swagger.json'];
const extraRoutes = ['/api/v2/Ai/Mcp'];

const argValue = (name) => {
  const i = process.argv.indexOf(name);
  return i > -1 ? process.argv[i + 1] : null;
};

const codeRoot = () => path.resolve(process.env.PROFINITY_CODE || path.join(__dirname, '..', '..', 'Profinity'));
const contractFile = () => path.resolve(argValue('--contract') || path.join(codeRoot(), ...contractRelative));
const docsRoot = () => path.resolve(argValue('--docs') || path.join(__dirname, '..', 'docs', 'Software', 'Profinity'));

function readContract(file = contractFile()) {
  if (!fs.existsSync(file)) {
    throw new Error(`No contract at ${file}. Set PROFINITY_CODE to the Profinity code repository, or pass --contract <file>.`);
  }
  return JSON.parse(fs.readFileSync(file, 'utf8').replace(/^﻿/, ''));
}

function walk(dir, files = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, files);
    else if (e.name.endsWith('.md')) files.push(full);
  }
  return files;
}

module.exports = { argValue, codeRoot, contractFile, docsRoot, readContract, walk, extraRoutes };
