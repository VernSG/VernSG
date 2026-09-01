/**
 * Formats linter analysis result into ANSI-colored terminal report
 * @param {object} result - Result from linter.lint()
 * @returns {string} Formatted CLI output
 */
function formatReport(result) {
  const red = '\x1b[31m';
  const green = '\x1b[32m';
  const yellow = '\x1b[33m';
  const cyan = '\x1b[36m';
  const bold = '\x1b[1m';
  const reset = '\x1b[0m';

  const lines = [];
  lines.push('');
  lines.push(`${bold}🔍 Anti-Slop PR Analysis Report${reset}`);
  lines.push('──────────────────────────────────────────────────────');

  if (result.cleanPass) {
    lines.push(`${green}✔ PASSED: Zero AI slop detected. Grade: ${bold}${result.grade}${reset}`);
    lines.push(`${cyan}Summary conforms to the Two-Sentence Rule.${reset}`);
    lines.push('');
    return lines.join('\n');
  }

  lines.push(`${red}✖ FAILED: AI Slop detected! Slop Score: ${result.slopScore}/100 [Grade: ${result.grade}]${reset}`);
  lines.push(`Found ${bold}${result.detectedCount}${reset} offending terms/phrases:\n`);

  result.detected.forEach((d, i) => {
    lines.push(`  ${bold}${i + 1}. "${red}${d.term}${reset}" (Line ${d.line}:${d.column})`);
    lines.push(`     Category   : ${yellow}${d.category}${reset} (Severity: ${d.severity}, Lift: ${d.lift}x)`);
    if (d.replacement) {
      lines.push(`     Suggestion : ${green}${d.replacement}${reset}`);
    }
    if (d.exampleBad && d.exampleGood) {
      lines.push(`     ❌ Bad     : "${d.exampleBad}"`);
      lines.push(`     ✅ Better  : "${d.exampleGood}"`);
    }
    lines.push('');
  });

  if (result.exceedsSentenceLimit) {
    lines.push(`  ⚠️  ${yellow}PR Summary has ${result.summarySentencesCount} sentences (exceeds 2-sentence rule)${reset}`);
  }

  lines.push('──────────────────────────────────────────────────────');
  lines.push(`${bold}Tip:${reset} Ground explanations in the technical diff facts (What + Why).`);
  lines.push('');

  return lines.join('\n');
}

module.exports = {
  formatReport
};
