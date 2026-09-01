---
name: anti-slop-commit
description: Enforce plain, concise Conventional Commit messages with zero AI adjectives or conversational filler.
---

# Anti-Slop Commit Message Generator

Generates clean, imperative, conventional git commit messages with zero conversational AI filler or poetic adjectives.

## When to Use This Skill

- When generating git commit messages from staged diffs
- When formatting commits to follow Conventional Commits standards
- When cleaning up noisy or verbose commit messages before pushing

## What This Skill Does

1. **Enforces Conventional Commit Format**: Formats messages strictly as `<type>(<optional scope>): <imperative subject>`.
2. **Limits Length**: Keeps the subject line under 72 characters and enforces the imperative mood (*"add mutex lock"*, not *"quietly added mutex lock"*).
3. **Eliminates AI Clichés**: Strips out narrative padding and adjectives (*"load-bearing"*, *"streamlines"*, *"paves the way"*).

## How to Use

### Basic Usage

```text
Generate a commit message for my staged git changes.
```

### Advanced Usage

```text
Create a conventional commit message with scope and technical explanation of the fix.
```

## Example

**User**: "Write a commit message for adding rate limiting to the login endpoint."

**Output**:
```text
feat(auth): add ip-based rate limiting to login endpoint

Prevents brute-force login attempts by limiting requests to 5 attempts per minute per IP address using Redis cache.
```

**Inspired by:** [Conventional Commits](https://www.conventionalcommits.org/) and [VernSG/anti-slop](https://github.com/VernSG/anti-slop).

## Tips

- Use imperative mood: "fix bug", "add feature", "refactor handler".
- Keep subject lines under 72 characters.
- Ground the message in the concrete code modification, not high-level abstractions.

## Common Use Cases

- Daily git commit workflow
- Release changelog automation
- Team commit convention standardization
