const assert = require('assert');
const { lint } = require('../src/linter');

console.log('Running Linter unit tests...');

// Test 1: Severe Slop Detection
const slopText = `
This pull request quietly resolves a latent race condition by protecting the load-bearing auth seam.
It ensures genuine state survived across reconnections, paving the way for seamless session recovery.
Feel free to let me know what you think!
`;

const res1 = lint(slopText);
assert.strictEqual(res1.cleanPass, false, 'Slop text should not pass');
assert(res1.slopScore > 50, `Slop score should be high, got ${res1.slopScore}`);
assert(res1.detected.some(d => d.matchedRule === 'load-bearing'), 'Should detect load-bearing');
assert(res1.detected.some(d => d.matchedRule === 'seam'), 'Should detect seam');
assert(res1.detected.some(d => d.matchedRule === 'quietly'), 'Should detect quietly');
assert(res1.detected.some(d => d.matchedRule === 'latent'), 'Should detect latent');
assert(res1.detected.some(d => d.matchedRule === 'survived'), 'Should detect survived');
assert(res1.detected.some(d => d.matchedRule === 'genuine'), 'Should detect genuine');
console.log('✔ Test 1 passed: Severe slop correctly flagged.');

// Test 2: Clean Senior Engineer PR
const cleanText = `
Adds mutex lock to RefreshToken to prevent race condition during simultaneous token refreshes.
Verified with 'go test -race ./auth/...'.
`;

const res2 = lint(cleanText);
assert.strictEqual(res2.cleanPass, true, 'Clean text should pass');
assert.strictEqual(res2.slopScore, 0, 'Slop score should be 0');
assert.strictEqual(res2.detectedCount, 0, 'Detected count should be 0');
console.log('✔ Test 2 passed: Clean engineering text passed.');

// Test 3: Sentence Count Warning
const wordyText = `
This is sentence one. This is sentence two. This is sentence three. This is sentence four.
`;

const res3 = lint(wordyText, { enforceSentenceCount: true, maxSentences: 2 });
assert(res3.exceedsSentenceLimit, 'Should flag excessive sentence count');
console.log('✔ Test 3 passed: Sentence limit warning verified.');

// Test 4: False Positive - Legitimate technical use of "latent" in ML context
const mlText = `
Adds latent space visualization to the embedding pipeline.
Uses t-SNE projection on the latent vectors from the encoder output.
`;

const res4 = lint(mlText);
// This SHOULD flag "latent" (the linter is a statistical heuristic, not context-aware).
// The test documents this known limitation — the linter cannot distinguish
// "latent race condition" (AI slop) from "latent space" (ML term).
assert(res4.detected.some(d => d.matchedRule === 'latent'),
  'Linter flags "latent" even in ML context (known limitation - context-unaware)');
console.log('✔ Test 4 passed: Known false-positive behavior documented for "latent".');

// Test 5: Text with technical identifiers should not break sentence counting
const technicalText = `
Updates req.body validation in auth.ts to check for missing fields.
Adds module.exports for the new validator.
`;

const res5 = lint(technicalText, { enforceSentenceCount: true, maxSentences: 2 });
assert.strictEqual(res5.cleanPass, true, 'Technical identifiers should not inflate sentence count');
assert.strictEqual(res5.exceedsSentenceLimit, false, 'Should not exceed 2-sentence limit');
console.log('✔ Test 5 passed: Technical identifiers preserved in sentence counting.');

// Test 6: Unsupported claims with zero banned words still pass the linter
// This test documents the epistemic gap — the linter catches vocabulary slop
// but NOT unsupported claims like "improves reliability" or "prevents data loss".
const epistemicSlopText = `
Adds error handling to improve system reliability and prevent data corruption under concurrent load.
`;

const res6 = lint(epistemicSlopText);
assert.strictEqual(res6.cleanPass, true,
  'Epistemic slop with no banned words passes the linter (known gap - linter is vocabulary-only)');
assert.strictEqual(res6.slopScore, 0, 'Score should be 0 for text with no flagged vocabulary');
console.log('✔ Test 6 passed: Epistemic gap documented (unsupported claims pass vocabulary linter).');

// Test 7: Code blocks should be excluded from vocabulary scanning
const codeBlockText = `
Adds validation to user input.

\`\`\`go
// This orchestrates the retry logic
func orchestrate(ctx context.Context) error {
    return nil
}
\`\`\`
`;

const res7 = lint(codeBlockText);
// "orchestrate" inside code blocks should still be detected by the current linter
// since it scans full text. This test documents the behavior.
assert(res7.detected.some(d => d.matchedRule === 'orchestrate'),
  'Current linter scans inside code blocks (known limitation)');
console.log('✔ Test 7 passed: Code block scanning behavior documented.');

// Test 8: Empty meta framing detection
const metaFramingText = `
In this pull request, we address the login timeout issue. This change aims to improve the user experience.
`;

const res8 = lint(metaFramingText);
assert(res8.detected.some(d => d.matchedRule === 'in this pull request'), 'Should detect meta framing');
assert(res8.detected.some(d => d.matchedRule === 'this change aims to'), 'Should detect meta framing');
console.log('✔ Test 8 passed: Meta framing correctly detected.');

console.log('\nAll Linter tests passed successfully!');
