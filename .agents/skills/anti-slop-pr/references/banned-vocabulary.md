# Vocabulary Heuristic & Empirical References

Based on statistical cluster analysis of 461k+ GitHub PR descriptions (Louis Abraham, 2026), these terms are heavily over-represented in AI-generated pull requests.

**These are flags, not absolute bans.** Replace unless the term is used in its primary technical meaning (e.g., "orchestrate" in Kubernetes, "latent" in ML, "seam" referencing Michael Feathers' technique).

## Flagged Terms

| Category | Flagged Phrase | Empirical Lift | Replace With |
| :--- | :--- | :--- | :--- |
| **Metaphor** | `load-bearing` | **123.04×** | `critical`, `required`, `core` |
| **Metaphor** | `seam` | **84.12×** | `interface`, `module boundary` |
| **Metaphor** | `latent` | **62.50×** | `hidden`, `unhandled`, `existing` |
| **Metaphor** | `survived` | **58.20×** | `persisted`, `remained` |
| **Metaphor** | `tectonic` | **41.30×** | `major`, `breaking` |
| **Adverb** | `quietly` | **95.40×** | `defaults`, `omits without throwing` |
| **Adverb** | `plainly` | **51.20×** | `directly`, `explicitly` |
| **Verb** | `delve` | **88.70×** | `inspect`, `traverse`, `parse` |
| **Verb** | `orchestrate` | **45.10×** | `coordinate`, `call`, `execute` |
| **Verb** | `safeguard` | **52.30×** | `validate`, `guard against` |
| **Adjective** | `genuine` | **71.30×** | `valid`, `verified` |
| **Adjective** | `robust` | **66.80×** | name the specific error handling |
| **Adjective** | `seamless` | **59.40×** | `automated`, `direct` |
| **Adjective** | `testament` | **34.00×** | `example`, `proof` |
| **Adjective** | `tapestry` | **82.00×** | `architecture`, `log system` |

## Why Vocabulary Filtering Is Insufficient

The terms above catch the most statistically obvious AI patterns. They do not catch:

1. **Unsupported claims** — "This improves reliability" contains zero flagged words and is still meaningless without a metric.
2. **Scope inflation** — Turning a 3-line fix into a paragraph about architectural strategy, using ordinary English.
3. **Fabricated causality** — "This prevents data loss by..." when the diff adds a log statement.

Vocabulary filtering is a secondary heuristic. The primary mechanism is **Claim → Evidence → Conclusion**: every factual statement must trace to a line in the diff, a test result, or explicit context.

## Writing Rules

1. **Never use metaphors when concrete mechanics exist.** Say "fixes mutex deadlock", not "repairs the concurrent seam."
2. **Never describe the PR as a journey or narrative.** Say "adds caching", not "paves the way for improved caching."
3. **Do not assert effects you have not verified.** Say "wraps call in try/catch", not "prevents data corruption."
