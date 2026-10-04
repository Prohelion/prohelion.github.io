#!/usr/bin/env node
/**
 * Script to validate all YAML dashboard examples in documentation files
 * against the ui-schema.json schema.
 *
 * This script:
 * 1. Reads markdown files from the Dashboards documentation directory
 * 2. Extracts YAML code blocks
 * 3. Wraps them in a complete dashboard structure if needed
 * 4. Validates against ui-schema.json using Ajv
 *
 * To run this script:
 *   cd Profinity-Docs/scripts
 *   node validate-dashboard-examples.js              # validates the 2.3 Dashboards pages
 *   node validate-dashboard-examples.js --recursive  # also validates sub-folders (Component_Reference)
 *   node validate-dashboard-examples.js --docs <dir> # validates another folder (for example the 2.2 copy)
 *
 * Prerequisites:
 *   npm install            (installs ajv and yaml)
 *
 * The script expects to find the schema at:
 *   ../Profinity/Profinity-Engine/UserInterface/Factories/ui.schema.json
 *
 * Expected-invalid examples:
 *   A YAML block (or a section of a block) that starts with a comment line beginning
 *   "# Incorrect" is a deliberate counter-example, for instance on the Troubleshooting page.
 *   It is expected to FAIL schema validation, and the run fails if it validates.
 *   A section that starts with "# Correct" (or has no marker) must validate.
 *   A single block may hold several sections, each starting with one of these marker comments.
 */

const fs = require('fs');
const path = require('path');
const { parse: parseYaml } = require('yaml');
const Ajv = require('ajv');

// Path to the schema file - relative to Profinity-Docs root
// IMPORTANT: Always use the schema from Profinity-Engine (source of truth), not any copies in Profinity-Web-GUI
// The schema in Profinity-Engine is the authoritative version
const SCHEMA_PATH = path.join(__dirname, '../../Profinity/Profinity-Engine/UserInterface/Factories/ui.schema.json');

// Path to the documentation directory - relative to Profinity-Docs root
const DEFAULT_DOCS_PATH = path.join(
  __dirname,
  '../docs/Profinity_Software/Profinity_Version_2.3/Extending_Profinity/Dashboards'
);
const argv = process.argv.slice(2);
const docsArgIndex = argv.indexOf('--docs');
const DOCS_PATH =
  docsArgIndex >= 0 && argv[docsArgIndex + 1]
    ? path.resolve(process.cwd(), argv[docsArgIndex + 1])
    : DEFAULT_DOCS_PATH;
const RECURSIVE = argv.includes('--recursive');

/**
 * Matches the marker comment that starts a counter-example ("# Incorrect ...") or a
 * correct example ("# Correct ..."). A leading cross or tick emoji is also accepted.
 */
const MARKER_PATTERN = /^#\s*(?:[\u274C\u2705]\s*)?(Incorrect|Correct)\b/i;

/** Component keys that may start a fragment that is not a full dashboard. */
const FRAGMENT_ROOTS = [
  'row', 'group', 'pill', 'readouts', 'lamps', 'chart', 'table', 'panels', 'panel', 'tabs',
  'accordion', 'titlebar', 'footer', 'action', 'toggle', 'state', 'html', 'image', 'icon',
];

function isValidatableSection(text) {
  if (/^dashboard:/m.test(text) || /^content:/m.test(text)) {
    return true;
  }
  const firstLine = text
    .split('\n')
    .find(l => l.trim() !== '' && !l.trim().startsWith('#'));
  if (!firstLine) {
    return false;
  }
  const m = firstLine.match(/^([a-z]+):/);
  return Boolean(m && FRAGMENT_ROOTS.includes(m[1]));
}

/**
 * Splits one YAML code block into sections. Each section starts at a marker comment line
 * and carries the expectation ("valid" or "invalid") named by that marker.
 */
function splitSections(lines) {
  const sections = [];
  let current = { expect: 'valid', startOffset: 0, lines: [] };
  lines.forEach((line, idx) => {
    const marker = line.trim().match(MARKER_PATTERN);
    if (marker) {
      sections.push(current);
      current = {
        expect: marker[1].toLowerCase() === 'incorrect' ? 'invalid' : 'valid',
        startOffset: idx,
        lines: [],
      };
    }
    current.lines.push(line);
  });
  sections.push(current);
  return sections;
}

/**
 * Splits a section on repeated "dashboard:" roots, so that several dashboards in one section
 * are each validated.
 */
function splitDashboards(text) {
  const matches = [...text.matchAll(/^dashboard:/gm)];
  if (matches.length <= 1) {
    return [text];
  }
  const parts = [];
  let last = 0;
  for (let i = 1; i < matches.length; i++) {
    parts.push(text.substring(last, matches[i].index));
    last = matches[i].index;
  }
  parts.push(text.substring(last));
  return parts;
}

/**
 * Extracts YAML code blocks from markdown content
 * @returns {Array<{file: string, lineNumber: number, yaml: string, wrappedYaml: string, expect: string}>}
 */
function extractYamlBlocks(content, filename) {
  const examples = [];
  const lines = content.split('\n');
  let inBlock = false;
  let blockIsYaml = false;
  let blockLines = [];
  let startLine = 0;

  for (let i = 0; i < lines.length; i++) {
    const trimmed = (lines[i] || '').trim();

    if (!inBlock) {
      if (trimmed.startsWith('```')) {
        inBlock = true;
        // Only fences labelled yaml/yml are validated. Plain fences are directory trees and similar.
        blockIsYaml = /^```\s*(yaml|yml)\s*$/i.test(trimmed);
        blockLines = [];
        startLine = i + 2; // first content line, one-based
      }
      continue;
    }

    if (trimmed === '```') {
      if (blockIsYaml && blockLines.length > 0) {
        for (const section of splitSections(blockLines)) {
          const sectionText = section.lines.join('\n');
          if (!isValidatableSection(sectionText)) {
            continue;
          }
          for (const part of splitDashboards(sectionText)) {
            const yaml = part.trim();
            if (!yaml || !isValidatableSection(yaml)) {
              continue;
            }
            examples.push({
              file: filename,
              lineNumber: startLine + section.startOffset,
              yaml,
              wrappedYaml: wrapDashboardIfNeeded(yaml),
              expect: section.expect,
            });
          }
        }
      }
      inBlock = false;
      blockLines = [];
      continue;
    }

    blockLines.push(lines[i]);
  }

  return examples;
}

/**
 * Wraps YAML in a complete dashboard structure if it's not already wrapped
 */
function wrapDashboardIfNeeded(yaml) {
  // Ignore leading comment lines (for example "# Correct") when deciding how to wrap
  yaml = yaml
    .split('\n')
    .filter((l, i, arr) => !(l.trim().startsWith('#') && arr.slice(0, i).every(p => p.trim() === '' || p.trim().startsWith('#'))))
    .join('\n');
  const trimmed = yaml.trim();

  // Check if it already starts with dashboard: or content:
  if (trimmed.startsWith('dashboard:') || trimmed.startsWith('content:')) {
    return yaml;
  }

  // Check if it's a component that needs wrapping
  const componentPatterns = [
    /^row:/,
    /^group:/,
    /^pill:/,
    /^readouts:/,
    /^lamps:/,
    /^chart:/,
    /^table:/,
    /^panels:/,
    /^panel:/,
    /^tabs:/,
    /^accordion:/,
    /^titlebar:/,
    /^footer:/,
    /^action:/,
    /^toggle:/,
    /^state:/,
    /^html:/,
    /^image:/,
    /^icon:/,
  ];

  const needsWrapping = componentPatterns.some(pattern => pattern.test(trimmed));

  if (needsWrapping) {
    // Use YAML library to parse and re-serialize for proper structure
    try {
      const yamlLib = require('yaml');
      const parsed = yamlLib.parse(yaml);

      // Only these elements can be direct items of a dashboard; everything else is wrapped in a row
      const directItems = ['row', 'accordion', 'titlebar', 'footer'];
      const componentName = Object.keys(parsed)[0];

      if (componentName && !directItems.includes(componentName)) {
        // Wrap in row first, then dashboard
        const wrapped = {
          dashboard: {
            items: [
              {
                row: {
                  items: [parsed],
                },
              },
            ],
          },
        };
        return yamlLib.stringify(wrapped, { indent: 2 });
      } else {
        // Direct dashboard item
        const wrapped = {
          dashboard: {
            items: [parsed],
          },
        };
        return yamlLib.stringify(wrapped, { indent: 2 });
      }
    } catch (e) {
      // If YAML parsing fails, return as-is (will be caught by validation)
      return yaml;
    }
  }

  // Return as-is if it doesn't need wrapping
  return yaml;
}

/**
 * Loads and parses the UI schema
 */
/**
 * Loads and parses the UI schema from Profinity-Engine
 * This is the source of truth - never use copies from Profinity-Web-GUI
 */
function loadSchema() {
  try {
    const schemaContent = fs.readFileSync(SCHEMA_PATH, 'utf-8');
    return JSON.parse(schemaContent);
  } catch (error) {
    throw new Error(
      `Failed to load schema from ${SCHEMA_PATH}: ${error instanceof Error ? error.message : String(error)}\n` +
      `Make sure the Profinity project is available as a sibling directory.\n` +
      `The schema must be loaded from Profinity-Engine, not Profinity-Web-GUI.`
    );
  }
}

/**
 * Validates the schema itself with strict mode
 * Returns warnings/errors from strict mode validation
 */
function validateSchemaStrictMode(schema) {
  try {
    // Create Ajv validator with strict mode enabled
    const ajv = new Ajv({
      allErrors: true,
      verbose: true,
      strict: true,        // Enable strict mode
      strictTypes: true,   // Strict type checking
      strictTuples: true,  // Strict tuple checking
      allowUnionTypes: false  // Disallow union types (use oneOf instead)
    });

    // Compile the schema - this will throw or log warnings if schema has issues
    const validate = ajv.compile(schema);

    // Get any warnings from the compilation
    // Note: Ajv logs warnings to console, but we can check for compilation errors
    return {
      valid: true,
      warnings: [],
      errors: []
    };
  } catch (error) {
    return {
      valid: false,
      warnings: [],
      errors: [error.message]
    };
  }
}

/**
 * Creates a compiled Ajv validator for the schema
 * This is done once to avoid recompiling the schema for each example
 */
function createValidator(schema) {
  // Suppress console.warn during schema compilation to avoid strict mode warnings
  const originalWarn = console.warn;
  console.warn = () => {}; // Suppress all warnings during compilation

  // Create Ajv validator without strict mode
  // Strict mode would report schema quality warnings, but we want to validate examples, not the schema itself
  const ajv = new Ajv({
    allErrors: true,
    verbose: true,
    strict: false,        // Explicitly disable strict mode
    strictTypes: false,   // Disable strict type checking
    strictTuples: false,  // Disable strict tuple checking
    allowUnionTypes: true // Allow union types (type: ["number", "string"])
    // Note: Not using strict mode - we're validating YAML examples against the schema,
    // not validating the schema quality itself
  });

  // Compile the schema
  const validate = ajv.compile(schema);

  // Restore console.warn
  console.warn = originalWarn;

  return validate;
}

/**
 * Validates YAML against a pre-compiled validator
 */
function validateYaml(yaml, validate) {
  try {
    // Parse YAML to JavaScript object
    const parsed = parseYaml(yaml);

    if (!parsed) {
      return {
        valid: false,
        errors: [
          {
            keyword: 'parse',
            dataPath: '',
            schemaPath: '',
            params: {},
            message: 'YAML parsed to null or undefined',
          },
        ],
      };
    }

    // Validate using the pre-compiled validator
    const valid = validate(parsed);

    return {
      valid: Boolean(valid),
      errors: validate.errors || [],
    };
  } catch (error) {
    return {
      valid: false,
      errors: [
        {
          keyword: 'parse',
          dataPath: '',
          schemaPath: '',
          params: {},
          message: `YAML parsing error: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
    };
  }
}

/**
 * Gets all markdown files in the docs directory
 */
function getMarkdownFiles() {
  try {
    const resolvedPath = path.resolve(DOCS_PATH);
    if (!fs.existsSync(resolvedPath)) {
      console.error(`Docs directory not found at: ${resolvedPath}`);
      return [];
    }

    console.log(`Found docs directory at: ${resolvedPath}`);
    const collect = dir => {
      const result = [];
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          if (RECURSIVE && entry.name !== 'images') {
            result.push(...collect(full));
          }
        } else if (entry.name.endsWith('.md')) {
          result.push(full);
        }
      }
      return result;
    };
    const markdownFiles = collect(resolvedPath);
    return markdownFiles;
  } catch (error) {
    console.error(
      `Failed to read docs directory: ${error instanceof Error ? error.message : String(error)}`
    );
    return [];
  }
}

// Main execution
function main() {
  console.log('Dashboard Examples Validation\n');
  console.log('='.repeat(50));

  // Load schema
  let schema;
  try {
    schema = loadSchema();
    const resolvedPath = path.resolve(SCHEMA_PATH);
    console.log(`Schema loaded from: ${resolvedPath}`);
    console.log(`Schema file exists: ${fs.existsSync(resolvedPath)}`);
    if (fs.existsSync(resolvedPath)) {
      const stats = fs.statSync(resolvedPath);
      console.log(`Schema file modified: ${stats.mtime.toISOString()}`);
    }
    console.log();
  } catch (error) {
    console.error(`\n❌ ${error.message}\n`);
    process.exit(1);
  }

  // Extract all examples from markdown files
  const markdownFiles = getMarkdownFiles();

  if (markdownFiles.length === 0) {
    console.error('No markdown files found. Exiting.');
    process.exit(1);
  }

  console.log(`Found ${markdownFiles.length} markdown files\n`);

  const allExamples = [];
  for (const file of markdownFiles) {
    const content = fs.readFileSync(file, 'utf-8');
    const filename = path.basename(file);
    const examples = extractYamlBlocks(content, filename);
    console.log(`  ${filename}: ${examples.length} YAML blocks found`);
    allExamples.push(...examples);
  }

  console.log(`\nTotal examples extracted: ${allExamples.length}\n`);

  if (allExamples.length === 0) {
    console.log('No examples found to validate.');
    process.exit(0);
  }

  // Create validator once
  console.log('Compiling schema validator...\n');
  let validate;
  try {
    validate = createValidator(schema);
  } catch (error) {
    console.error(`\n❌ Failed to compile schema: ${error.message}\n`);
    process.exit(1);
  }

  // Validate all examples using the pre-compiled validator
  const validationResults = [];
  for (const example of allExamples) {
    const result = validateYaml(example.wrappedYaml, validate);
    validationResults.push({
      example,
      valid: result.valid,
      errors: result.errors,
    });
  }

  // A failure is a block expected to be valid that is invalid, or an expected-invalid
  // ("# Incorrect") block that unexpectedly validates.
  const failures = validationResults.filter(r =>
    r.example.expect === 'invalid' ? r.valid : !r.valid
  );
  const expectedInvalid = validationResults.filter(r => r.example.expect === 'invalid');
  const expectedInvalidCaught = expectedInvalid.filter(r => !r.valid).length;
  const mustBeValid = validationResults.filter(r => r.example.expect !== 'invalid');
  const validCount = mustBeValid.filter(r => r.valid).length;

  console.log('Validation Summary:');
  console.log(`  Total examples: ${validationResults.length}`);
  console.log(`  Must be valid: ${mustBeValid.length}  (valid: ${validCount})`);
  console.log(
    `  Marked "# Incorrect" (must fail): ${expectedInvalid.length}  (correctly rejected: ${expectedInvalidCaught})`
  );
  console.log(`  Invalid: ${failures.length}\n`);

  if (failures.length > 0) {
    failures.forEach(({ example, errors, valid }) => {
      console.log(`\n--- ${example.file}:${example.lineNumber} (${example.expect === 'invalid' ? 'marked Incorrect but it VALIDATES' : 'expected valid'}) ---`);
      console.log(example.yaml);
      if (!valid) {
        errors.slice(0, 5).forEach(err => {
          console.log(`  ${err.instancePath || err.schemaPath}: ${err.message} ${JSON.stringify(err.params)}`);
        });
      }
    });
    console.log('\n\u274C Validation failed. Please fix the examples above.\n');
    process.exit(1);
  } else {
    console.log('\u2705 All examples behave as expected (valid examples validate, "# Incorrect" examples are rejected).\n');
    process.exit(0);
  }
}

// Run if executed directly
if (require.main === module) {
  main();
}

module.exports = { extractYamlBlocks, wrapDashboardIfNeeded, validateYaml, loadSchema };
