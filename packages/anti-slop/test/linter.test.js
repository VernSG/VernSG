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

console.log('\nAll Linter tests passed successfully!');
