const fs = require('fs');
const path = require('path');

const adaptersDir = path.join(__dirname, '../adapters');
const templatesDir = path.join(__dirname, '../templates');
const skillsDir = path.join(__dirname, '../skills');

/**
 * Copies rule configs and complete skill suites to target directory
 * @param {string} targetDir - Destination project root
 * @param {string|string[]} agents - Target agent(s) (cursor, claude, windsurf, antigravity, copilot, gemini, pr-template, all)
 * @returns {string[]} List of installed files
 */
function install(targetDir = process.cwd(), agents = ['all']) {
  const agentList = Array.isArray(agents) ? agents : [agents];
  const isAll = agentList.includes('all');
  const installed = [];

  const safeWriteFile = (destRel, srcPath) => {
    const dest = path.join(targetDir, destRel);
    const dir = path.dirname(dest);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.copyFileSync(srcPath, dest);
    installed.push(destRel);
  };

  const safeCopyDir = (destRel, srcDir) => {
    const dest = path.join(targetDir, destRel);
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    if (fs.cpSync) {
      fs.cpSync(srcDir, dest, { recursive: true });
    } else {
      // Fallback for older node versions
      const copyRecursive = (src, dst) => {
        if (!fs.existsSync(dst)) fs.mkdirSync(dst, { recursive: true });
        const entries = fs.readdirSync(src, { withFileTypes: true });
        for (const entry of entries) {
          const s = path.join(src, entry.name);
          const d = path.join(dst, entry.name);
          if (entry.isDirectory()) copyRecursive(s, d);
          else fs.copyFileSync(s, d);
        }
      };
      copyRecursive(srcDir, dest);
    }
    installed.push(destRel);
  };

  if (isAll || agentList.includes('claude')) {
    safeWriteFile('CLAUDE.md', path.join(adaptersDir, 'claude/CLAUDE.md'));
  }

  if (isAll || agentList.includes('cursor')) {
    safeWriteFile('.cursorrules', path.join(adaptersDir, 'cursor/.cursorrules'));
  }

  if (isAll || agentList.includes('windsurf')) {
    safeWriteFile('.windsurfrules', path.join(adaptersDir, 'windsurf/.windsurfrules'));
  }

  if (isAll || agentList.includes('gemini')) {
    safeWriteFile('GEMINI.md', path.join(adaptersDir, 'gemini/GEMINI.md'));
  }

  if (isAll || agentList.includes('copilot')) {
    safeWriteFile('.github/copilot-instructions.md', path.join(adaptersDir, 'copilot/copilot-instructions.md'));
  }

  if (isAll || agentList.includes('pr-template')) {
    safeWriteFile('.github/PULL_REQUEST_TEMPLATE.md', path.join(templatesDir, 'PULL_REQUEST_TEMPLATE.md'));
  }

  if (isAll || agentList.includes('antigravity')) {
    safeCopyDir('.agents/skills/anti-slop-pr', path.join(skillsDir, 'anti-slop-pr'));
    safeCopyDir('.agents/skills/anti-slop-commit', path.join(skillsDir, 'anti-slop-commit'));
    safeCopyDir('.agents/skills/anti-slop-review', path.join(skillsDir, 'anti-slop-review'));
  }

  return installed;
}

module.exports = {
  install
};
