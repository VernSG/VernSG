---
name: anti-slop-pr
description: >-
  Enforce high-signal, zero-slop PR descriptions. Discards AI buzzwords (load-bearing, seam, quietly)
  and strictly grounds explanations in technical diff facts and the 2-Sentence Rule.
---

# Anti-Slop PR Description Generator

This skill teaches the agent how to write concise, senior-engineer grade Pull Request descriptions that respect the reviewer's time and contain zero conversational filler.

---

## Core Principles

### 1. The Two-Sentence Rule
Every PR description summary MUST be understandable in **maximum 2 plain sentences**:
- **Sentence 1 (What changed):** State the concrete mechanism or code modification.
- **Sentence 2 (Why it changed):** State the problem solved, bug fixed, or capability enabled.

### 2. Zero AI Slop & Banned Lexicon
Never use rhetorical metaphors or defensive filler words. See [references/banned-vocabulary.md](./references/banned-vocabulary.md).
- ❌ **No architectural hyperbole:** Never call a utility function or interface *"load-bearing"*, *"a critical seam"*, or *"tectonic"*.
- ❌ **No poetic adverbs:** Never say *"quietly resolves"*, *"delves into"*, or *"plainly rejects"*.
- ❌ **No empty framing:** Never begin with *"In this PR, we aim to..."* or *"Feel free to review"*.

### 3. Strict Diff Grounding
Describe only what exists in the actual git diff:
- Name the exact files, exported functions, mutexes, config keys, or DB columns changed.
- If a change is 5 lines, describe it as a 5-line fix, not a system redesign.

---

## Standard Output Format

When generating a PR description, format it strictly using this template:

```markdown
## Summary
[Sentence 1: What changed technically] [Sentence 2: Why it was needed]

## Changes
- `<file_path>`: [Technical change detail]
- `<file_path>`: [Technical change detail]

## Verification
- [Command run / test executed / manual reproduction step checked]
```

---

## Paired Diff Examples

Check [examples/paired-diffs.md](./examples/paired-diffs.md) for direct comparisons between AI Slop and Grounded Senior Engineer output.
