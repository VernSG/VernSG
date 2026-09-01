const fs = require('fs');
const path = require('path');

const adaptersDir = path.join(__dirname, '../adapters');
const templatesDir = path.join(__dirname, '../templates');
const skillsDir = path.join(__dirname, '../skills');

/**
 * Copies rule configs to the target directory based on requested agent target
 * @param {string} targetDir - Destination project root
 * @param {string|string[]} agents - Target agent(s) (cursor, claude, windsurf, antigravity, copilot, gemini, pr-template, all)
 * @returns {string[]} List of installed files
 */
function install(targetDir = process.cwd(), agents = ['all']) {
  const agentList = Array.isArray(agents) ? agents : [agents];
  const isAll = agentList.includes('all');
  const installed = [];

  const safeWrite = (destRel, srcPath) => {
    const dest = path.join(targetDir, destRel);
    const dir = path.dirname(dest);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.copyFileSync(srcPath, dest);
    installed.push(destRel);
  };

  if (isAll || agentList.includes('claude')) {
    safeWrite('CLAUDE.md', path.join(adaptersDir, 'claude/CLAUDE.md'));
  }

  if (isAll || agentList.includes('cursor')) {
    safeWrite('.cursorrules', path.join(adaptersDir, 'cursor/.cursorrules'));
  }

  if (isAll || agentList.includes('windsurf')) {
    safeWrite('.windsurfrules', path.join(adaptersDir, 'windsurf/.windsurfrules'));
  }

  if (isAll || agentList.includes('gemini')) {
    safeWrite('GEMINI.md', path.join(adaptersDir, 'gemini/GEMINI.md'));
  }

  if (isAll || agentList.includes('copilot')) {
    safeWrite('.github/copilot-instructions.md', path.join(adaptersDir, 'copilot/copilot-instructions.md'));
  }

  if (isAll || agentList.includes('pr-template')) {
    safeWrite('.github/PULL_REQUEST_TEMPLATE.md', path.join(templatesDir, 'PULL_REQUEST_TEMPLATE.md'));
  }

  if (isAll || agentList.includes('antigravity')) {
    const prSkillSrc = path.join(skillsDir, 'anti-slop-pr/SKILL.md');
    safeWrite('.agents/skills/anti-slop-pr/SKILL.md', prSkillSrc);
    const commitSkillSrc = path.join(skillsDir, 'anti-slop-commit/SKILL.md');
    safeWrite('.agents/skills/anti-slop-commit/SKILL.md', commitSkillSrc);
  }

  return installed;
}

module.exports = {
  install
};
