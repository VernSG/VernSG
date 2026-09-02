# Anti-Slop Rules for Gemini & Antigravity

- **Claim → Evidence**: Every factual claim in commit messages, PR descriptions, and reviews must trace to a line in the diff, a test result, or explicit context. No evidence, no claim.
- **The Two-Sentence Rule**: PR summaries state what changed and why in maximum 2 plain sentences.
- **Diff Grounding**: State precise technical mechanisms (file names, functions, error codes). Do not assert effects (performance, reliability, security) without citing a test or metric.
- **Repository Conventions First**: Check for CONTRIBUTING.md, PR templates, and commit conventions before applying defaults.
- **Vocabulary Heuristic**: Avoid statistically overrepresented AI terms (`load-bearing`, `seam`, `quietly`, `latent`, `survived`, `genuine`, `delve`, `robust`) unless used in their primary technical meaning.
- **No Fabricated Findings**: In code reviews, if the diff is correct, say so. Classify confidence: `[Confirmed]`, `[Likely]`, `[Uncertain]`, `[No findings]`.
