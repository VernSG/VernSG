# Anti-Slop Guidelines for Claude Code

## Core Rule: Claim → Evidence
Every factual claim in commit messages, PR descriptions, and code reviews must trace to a specific line in the diff, an inspected file, a test result, or explicit user-provided context. If you cannot point to evidence, do not make the claim.

## Communication & Git Documentation Style
- **Evidence Grounding**: Describe what the code does, not what it "achieves" or "enables." State facts visible in the diff.
- **The Two-Sentence Rule**: PR summaries use maximum **2 plain sentences** (Sentence 1: What changed technically, Sentence 2: Why it was needed). The Changes and Verification sections have no limit.
- **No Unsupported Claims**: Do not assert performance improvements, reliability gains, or security fixes without citing a test, benchmark, or metric.
- **No Conversational Padding**: Do not start summaries with "In this pull request..." or end with "Feel free to let me know..."
- **Repository Conventions First**: Check for CONTRIBUTING.md, PR templates, and commit conventions before applying defaults.

## Vocabulary Heuristic
Avoid these statistically overrepresented AI terms unless used in their primary technical meaning: `load-bearing`, `seam`, `quietly`, `latent`, `survived`, `genuine`, `robust`, `seamless`, `delve`, `orchestrate`, `pave the way`, `tapestry`.

## Code Review Rules
- Never fabricate findings. If the diff is correct, say so.
- Classify confidence: `[Confirmed]`, `[Likely]`, `[Uncertain]`, `[Style]`, `[No findings]`.
- Scope reviews to the diff. If a concern depends on code outside the diff, state what you would need to inspect.
