const assert = require('assert');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { install } = require('../src/installer');

console.log('Running Installer unit tests...');

const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'anti-slop-test-'));

try {
  // Test install all
  const installed = install(tmpDir, ['all']);
  assert(installed.includes('CLAUDE.md'), 'CLAUDE.md should be installed');
  assert(installed.includes('.cursorrules'), '.cursorrules should be installed');
  assert(installed.includes('.github/PULL_REQUEST_TEMPLATE.md'), 'PULL_REQUEST_TEMPLATE.md should be installed');

  assert(fs.existsSync(path.join(tmpDir, 'CLAUDE.md')), 'CLAUDE.md must exist on disk');
  assert(fs.existsSync(path.join(tmpDir, '.cursorrules')), '.cursorrules must exist on disk');
  assert(fs.existsSync(path.join(tmpDir, '.github/PULL_REQUEST_TEMPLATE.md')), 'PR template must exist on disk');

  // Verify full skill directories
  assert(fs.existsSync(path.join(tmpDir, '.agents/skills/anti-slop-pr/SKILL.md')), 'SKILL.md must exist');
  assert(fs.existsSync(path.join(tmpDir, '.agents/skills/anti-slop-pr/references/banned-vocabulary.md')), 'references must exist');
  assert(fs.existsSync(path.join(tmpDir, '.agents/skills/anti-slop-pr/examples/paired-diffs.md')), 'examples must exist');
  assert(fs.existsSync(path.join(tmpDir, '.agents/skills/anti-slop-commit/SKILL.md')), 'anti-slop-commit must exist');
  assert(fs.existsSync(path.join(tmpDir, '.agents/skills/anti-slop-review/SKILL.md')), 'anti-slop-review must exist');

  console.log('✔ Installer tests passed: Complete skill directories correctly scaffolded.');
} finally {
  fs.rmSync(tmpDir, { recursive: true, force: true });
}

console.log('\nAll Installer tests passed successfully!');
