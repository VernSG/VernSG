# GitHub Copilot Instructions: Anti-Slop Documentation

## Core Rule
Every factual claim in commit messages, PR descriptions, and code reviews must trace to a specific line in the diff, a test result, or explicit context. If you cannot point to evidence, do not make the claim.

## Commit Messages & PR Descriptions
- Use the 2-Sentence Rule: Sentence 1 explains the technical mechanism, Sentence 2 explains the problem solved.
- List changes directly by file path and factual action.
- Do not assert effects (performance, reliability, security) without citing a test or benchmark.
- Check for repository conventions (CONTRIBUTING.md, .commitlintrc, PR templates) before applying defaults.

## Vocabulary Heuristic
Avoid statistically overrepresented AI terms unless used in their primary technical meaning:
- Do not use: "load-bearing", "seam", "quietly", "latent", "survived", "genuine", "delve", "orchestrate".

## Code Reviews
- Never fabricate findings. If the diff is correct, say "No defects found."
- Classify confidence: [Confirmed], [Likely], [Uncertain], [Style], [No findings].
- Scope reviews to the diff.
