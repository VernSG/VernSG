const fs = require('fs');
const path = require('path');

const defaultLexiconPath = path.join(__dirname, '../data/lexicon.json');

/**
 * Loads lexicon data
 */
function loadLexicon(customPath) {
  const filePath = customPath || defaultLexiconPath;
  const raw = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(raw);
}

/**
 * Escapes regex special characters
 */
function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Lints given text against the slop lexicon
 * @param {string} text - Text to analyze (e.g. PR body or commit message)
 * @param {object} [options] - Options (customLexicon, maxSentences)
 * @returns {object} Analysis result
 */
function lint(text, options = {}) {
  const lexicon = options.lexicon || loadLexicon(options.customLexiconPath);
  const detected = [];
  let totalPenalty = 0;

  const lines = text.split('\n');

  for (const [catKey, category] of Object.entries(lexicon.categories)) {
    for (const item of category.terms) {
      const term = item.term;
      const regex = new RegExp(`\\b${escapeRegex(term)}\\b`, 'gi');

      lines.forEach((lineContent, lineIdx) => {
        let match;
        while ((match = regex.exec(lineContent)) !== null) {
          detected.push({
            term: match[0],
            matchedRule: term,
            category: catKey,
            severity: category.severity,
            lift: item.lift || 1.0,
            penalty: category.penalty,
            replacement: item.replacement,
            exampleBad: item.example_bad,
            exampleGood: item.example_good,
            line: lineIdx + 1,
            column: match.index + 1
          });
          totalPenalty += category.penalty;
        }
      });
    }
  }

  // Strip code blocks and inline code before counting sentences
  const textWithoutCode = text
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]*`/g, '')
    .replace(/https?:\/\/\S+/g, '')
    .replace(/\b\w+\.\w+\b/g, '') // strip file.ext or domain.com
    .replace(/\.{2,}/g, ''); // strip ellipses (...)

  const sentences = textWithoutCode
    .split(/(?<=[.!?])\s+/)
    .map(s => s.trim())
    .filter(s => s.length > 5 && !s.startsWith('#') && !s.startsWith('-') && !s.startsWith('*'));

  const maxSentences = options.maxSentences || 2;
  const summarySentencesCount = sentences.length;
  const exceedsSentenceLimit = options.enforceSentenceCount ? summarySentencesCount > maxSentences : false;

  if (options.enforceSentenceCount && exceedsSentenceLimit) {
    totalPenalty += (summarySentencesCount - maxSentences) * 5;
  }

  const slopScore = Math.min(100, totalPenalty);
  const cleanPass = detected.length === 0 && (!options.enforceSentenceCount || !exceedsSentenceLimit);

  return {
    cleanPass,
    slopScore,
    detectedCount: detected.length,
    detected,
    summarySentencesCount,
    exceedsSentenceLimit,
    grade: slopScore === 0 ? 'A+ (Clean)' : slopScore < 25 ? 'B (Acceptable)' : slopScore < 60 ? 'D (Slop Alert)' : 'F (Severe AI Slop)'
  };
}

module.exports = {
  lint,
  loadLexicon
};
