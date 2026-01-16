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
 *   cd Profinity-Docs
 *   node scripts/validate-dashboard-examples.js
 *
 * Prerequisites:
 *   npm install ajv yaml
 *
 * The script expects to find the schema at:
 *   ../Profinity/Profinity-Engine/UserInterface/Factories/ui-schema.json
 */

const fs = require('fs');
const path = require('path');
const { parse: parseYaml } = require('yaml');
const Ajv = require('ajv');

// Path to the schema file - relative to Profinity-Docs root
// IMPORTANT: Always use the schema from Profinity-Engine (source of truth), not any copies in Profinity-Web-GUI
// The schema in Profinity-Engine is the authoritative version
const SCHEMA_PATH = path.join(__dirname, '../../Profinity/Profinity-Engine/UserInterface/Factories/ui-schema.json');

// Path to the documentation directory - relative to Profinity-Docs root
const DOCS_PATH = path.join(__dirname, '../docs/Profinity_Software/Profinity_Version_2/Extending_Profinity/Dashboards');

/**
 * Extracts YAML code blocks from markdown content
 * @returns {Array<{file: string, lineNumber: number, yaml: string, wrappedYaml: string}>}
 */
function extractYamlBlocks(content, filename) {
  const examples = [];
  const lines = content.split('\n');
  let inYamlBlock = false;
  let inSkippedBlock = false;
  let yamlLines = [];
  let startLine = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line === undefined) {
      continue;
    }
    const trimmed = line.trim();

    // Match code blocks that start with ```
    const isCodeBlockStart = trimmed.startsWith('```');
    const isCodeBlockEnd = trimmed === '```';

    // Check if it's a YAML block (has yaml or yml after ```)
    const yamlBlockPattern = /^```\s*(yaml|yml)\s*$/i;
    const isYamlBlock = yamlBlockPattern.test(trimmed);

    if (isCodeBlockStart && !inYamlBlock && !inSkippedBlock) {
      // Extract language from code block (e.g., ```yaml, ```text, ```)
      const languageMatch = trimmed.match(/^```\s*(\w+)?\s*$/i);
      const blockLanguage = (languageMatch?.[1]?.toLowerCase() || '').trim();

      // Skip known non-YAML languages
      const skipLanguages = [
        'text',
        'json',
        'javascript',
        'js',
        'typescript',
        'ts',
        'css',
        'html',
        'markdown',
        'md',
        'plain',
      ];

      if (skipLanguages.includes(blockLanguage)) {
        // Mark that we're in a skipped block
        inSkippedBlock = true;
        continue;
      }

      // Only process if it's explicitly marked as yaml/yml, or if it's a plain ``` block
      if (isYamlBlock || trimmed === '```') {
        inYamlBlock = true;
        startLine = i + 1;
        yamlLines = [];
        continue;
      }
    }

    // Handle end of code blocks
    if (isCodeBlockEnd) {
      if (inYamlBlock) {
        if (yamlLines.length > 0) {
          const yaml = yamlLines.join('\n');

          // Split YAML if it contains multiple dashboard blocks (incorrect/correct examples)
          // Look for patterns like "# ❌" or "# ✅" followed by "dashboard:"
          // Also handle cases where there's just a comment line before dashboard:
          const splitPattern = /(?=^#\s*[❌✅]\s*(?:Incorrect|Correct).*?\n\s*dashboard:)/m;
          let yamlParts = yaml.split(splitPattern);

          // If no split occurred, check for multiple dashboard: blocks
          if (yamlParts.length === 1) {
            const dashboardMatches = [...yaml.matchAll(/^dashboard:/gm)];
            if (dashboardMatches.length > 1) {
              // Split on each dashboard: occurrence after the first
              let lastIndex = 0;
              yamlParts = [];
              for (let i = 1; i < dashboardMatches.length; i++) {
                const match = dashboardMatches[i];
                if (match === undefined) {
                  continue;
                }
                const matchIndex = match.index;
                if (matchIndex === undefined) {
                  continue;
                }
                yamlParts.push(yaml.substring(lastIndex, matchIndex).trim());
                lastIndex = matchIndex;
              }
              yamlParts.push(yaml.substring(lastIndex).trim());
            }
          }

          for (let partIdx = 0; partIdx < yamlParts.length; partIdx++) {
            const partValue = yamlParts[partIdx];
            if (partValue === undefined) {
              continue;
            }
            let part = partValue.trim();
            if (!part) {
              continue;
            }

            // Remove comment markers if present (handle both single line and multi-line)
            // Remove lines that start with # and contain ❌ or ✅
            part = part
              .split('\n')
              .filter(line => {
                const trimmed = line.trim();
                return !trimmed.match(/^#\s*[❌✅]/);
              })
              .join('\n')
              .trim();

            // Also remove standalone comment lines
            part = part.replace(/^#\s*[❌✅]\s*(?:Incorrect|Correct).*?\n\s*/im, '');
            part = part.replace(/^#\s*Note:.*?\n\s*/im, '');

            if (part && part.includes('dashboard:')) {
              const wrappedYaml = wrapDashboardIfNeeded(part);
              const partIndex = yaml.indexOf(part);
              const lineOffset =
                partIdx > 0 && partIndex >= 0 ? yaml.substring(0, partIndex).split('\n').length : 0;
              examples.push({
                file: filename,
                lineNumber: startLine + lineOffset,
                yaml: part,
                wrappedYaml,
              });
            }
          }
        }
        inYamlBlock = false;
        yamlLines = [];
      }
      if (inSkippedBlock) {
        inSkippedBlock = false;
      }
      continue;
    }

    if (inYamlBlock) {
      yamlLines.push(line);
    }
    // If we're in a skipped block, just continue without capturing
  }

  return examples;
}

/**
 * Wraps YAML in a complete dashboard structure if it's not already wrapped
 */
function wrapDashboardIfNeeded(yaml) {
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

      // Components that can be direct dashboard items
      const directItems = [
        'row',
        'group',
        'panels',
        'accordion',
        'titlebar',
        'footer',
        'pill',
        'tabs',
      ];
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
    const files = fs.readdirSync(resolvedPath);
    const markdownFiles = files
      .filter(file => file.endsWith('.md'))
      .map(file => path.join(resolvedPath, file));
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

  // Report results
  const validCount = validationResults.filter(r => r.valid).length;
  const invalidCount = validationResults.filter(r => !r.valid).length;

  console.log('Validation Summary:');
  console.log(`  Total examples: ${validationResults.length}`);
  console.log(`  Valid: ${validCount}`);
  console.log(`  Invalid: ${invalidCount}\n`);

  if (invalidCount > 0) {
    // Write detailed errors to file for analysis
    const errorFile = path.join(__dirname, '../validation-errors.json');
    const errorDetails = validationResults
      .filter(r => !r.valid)
      .map(({ example, errors }) => ({
        file: example.file,
        lineNumber: example.lineNumber,
        yaml: example.yaml,
        errors: errors.map(e => ({
          dataPath: e.dataPath || e.schemaPath,
          message: e.message,
          params: e.params,
        })),
      }));
    fs.writeFileSync(errorFile, JSON.stringify(errorDetails, null, 2));
    console.log(`Detailed errors written to: ${errorFile}\n`);

    // Group errors by type for easier fixing
    const errorGroups = {};
    validationResults
      .filter(r => !r.valid)
      .forEach(({ errors }) => {
        const firstError = errors[0];
        if (firstError) {
          const errorKey = `${firstError.dataPath || firstError.schemaPath}: ${firstError.message}`;
          errorGroups[errorKey] = (errorGroups[errorKey] || 0) + 1;
        }
      });

    console.log('Error summary (grouped by type):');
    Object.entries(errorGroups)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .forEach(([error, count]) => {
        console.log(`  ${count}x: ${error}`);
      });

    // Show first invalid example in detail
    const firstInvalid = validationResults.filter(r => !r.valid)[0];
    if (firstInvalid) {
      const { example, errors } = firstInvalid;
      console.log('\n=== FIRST INVALID EXAMPLE ===');
      console.log(`\nFile: ${example.file}`);
      console.log(`Line: ${example.lineNumber}`);
      console.log(`\nFull YAML Example:`);
      console.log(example.yaml);
      console.log(`\nValidation Errors:`);
      errors.forEach((err, idx) => {
        console.log(`\n  Error ${idx + 1}:`);
        console.log(`    Path: ${err.dataPath || err.schemaPath}`);
        console.log(`    Message: ${err.message}`);
        if (err.params) {
          console.log(`    Params: ${JSON.stringify(err.params, null, 2)}`);
        }
      });
      console.log(`\n=== END OF EXAMPLE ===\n`);
    }

    // List all invalid examples
    console.log('\nAll invalid examples:');
    validationResults
      .filter(r => !r.valid)
      .forEach(({ example, errors }) => {
        const firstError = errors[0];
        console.log(`  ${example.file}:${example.lineNumber} - ${firstError ? firstError.message : 'Unknown error'}`);
      });

    console.log('\n❌ Validation failed. Please fix the errors above.\n');
    process.exit(1);
  } else {
    console.log('✅ All examples are valid!\n');
    process.exit(0);
  }
}

// Run if executed directly
if (require.main === module) {
  main();
}

module.exports = { extractYamlBlocks, wrapDashboardIfNeeded, validateYaml, loadSchema };
