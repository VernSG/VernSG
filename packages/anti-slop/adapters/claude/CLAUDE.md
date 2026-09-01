# Anti-Slop Guidelines for Claude Code

## Communication & Git Documentation Style
- **Zero AI Slop**: Strictly avoid inflated vocabulary, dramatic adjectives, and metaphors:
  - Banned words: `load-bearing`, `seam`, `quietly`, `latent`, `survived`, `genuine`, `robust`, `seamless`, `delve`, `orchestrate`, `pave the way`, `testament`, `tapestry`.
- **The Two-Sentence Rule**: When summarizing changes or drafting PR descriptions, summarize the core change in maximum **2 plain sentences** (Sentence 1: What changed technically, Sentence 2: Why it was needed).
- **Strict Diff Grounding**: Describe only facts visible in the diff. No philosophical narratives about architecture.
- **No Conversational Padding**: Do not start summaries with "In this pull request...", "This change aims to...", or end with "Feel free to let me know...".
