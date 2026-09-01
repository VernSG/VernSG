#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { lint, formatReport, install } = require('../src');

const args = process.argv.slice(2);
const command = args[0];

function printHelp() {
  console.log(`
unslop - Developer toolkit to eliminate AI slop from PRs and Git commits

Usage:
  unslop lint <text | file_path>    Check text or file against the slop lexicon
  unslop install [options]          Scaffold rules & skills into current workspace
  unslop --help                     Show this help message
  unslop --version                  Show package version

Options for install:
  --agent <name>                    Target agents (claude, cursor, windsurf, antigravity, copilot, gemini, pr-template, all)
                                    Example: unslop install --agent cursor,claude

Examples:
  npx @vernsg/anti-slop lint "This PR quietly refactors a load-bearing seam"
  npx @vernsg/anti-slop lint ./PULL_REQUEST_TEMPLATE.md
  npx @vernsg/anti-slop install --agent all
`);
}

if (!command || command === '--help' || command === '-h') {
  printHelp();
  process.exit(0);
}

if (command === '--version' || command === '-v') {
  const pkg = require('../package.json');
  console.log(`unslop v${pkg.version}`);
  process.exit(0);
}

if (command === 'lint') {
  const input = args.slice(1).join(' ');
  if (!input) {
    console.error('Error: Please provide text or a file path to lint.');
    process.exit(1);
  }

  let textToLint = input;
  if (fs.existsSync(input)) {
    textToLint = fs.readFileSync(input, 'utf8');
  }

  const result = lint(textToLint);
  console.log(formatReport(result));
  process.exit(result.cleanPass ? 0 : 1);
}

if (command === 'install' || command === 'init') {
  let agents = ['all'];
  const agentFlagIdx = args.indexOf('--agent');
  if (agentFlagIdx !== -1 && args[agentFlagIdx + 1]) {
    agents = args[agentFlagIdx + 1].split(',').map(s => s.trim());
  }

  console.log(`Installing anti-slop rules for: ${agents.join(', ')}...`);
  const installed = install(process.cwd(), agents);
  console.log(`✔ Installed ${installed.length} files:`);
  installed.forEach(f => console.log(`  - ${f}`));
  process.exit(0);
}

console.error(`Unknown command: ${command}`);
printHelp();
process.exit(1);
