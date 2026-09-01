# Banned Vocabulary & Empirical Slop References

Based on statistical cluster analysis of 461k+ GitHub PR descriptions (Louis Abraham, 2026), these terms are heavily over-represented in AI-generated pull requests.

## The Slop Blacklist

| Category | Banned Phrase | Empirical Lift | Plain English Alternative |
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
| **Adjective** | `robust` | **66.80×** | `tested`, `handles retries` |
| **Adjective** | `seamless` | **59.40×** | `automated`, `direct` |
| **Adjective** | `testament` | **34.00×** | `example`, `proof` |
| **Adjective** | `tapestry` | **82.00×** | `architecture`, `log system` |

## Writing Rules
1. **Never use metaphors when concrete mechanics exist.** (Say *"fixes mutex deadlock"* not *"repairs the concurrent seam"*).
2. **Never describe the PR as a journey or narrative.** (Say *"adds caching"* not *"paves the way for improved caching"*).
3. **If a word sounds like a corporate press release, delete it.**
