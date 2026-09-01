const assert = require('assert');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { install } = require('../src/installer');

console.log('Running Installer unit tests...');

const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'anti-slop-test-'));

try {
  // Test install cursor and claude
  const installed = install(tmpDir, ['cursor', 'claude', 'pr-template']);
  assert(installed.includes('CLAUDE.md'), 'CLAUDE.md should be installed');
  assert(installed.includes('.cursorrules'), '.cursorrules should be installed');
  assert(installed.includes('.github/PULL_REQUEST_TEMPLATE.md'), 'PULL_REQUEST_TEMPLATE.md should be installed');

  assert(fs.existsSync(path.join(tmpDir, 'CLAUDE.md')), 'CLAUDE.md must exist on disk');
  assert(fs.existsSync(path.join(tmpDir, '.cursorrules')), '.cursorrules must exist on disk');
  assert(fs.existsSync(path.join(tmpDir, '.github/PULL_REQUEST_TEMPLATE.md')), 'PR template must exist on disk');

  console.log('✔ Installer tests passed: Files correctly scaffolded.');
} finally {
  fs.rmSync(tmpDir, { recursive: true, force: true });
}

console.log('\nAll Installer tests passed successfully!');
