---
name: anti-slop-commit
description: Generate evidence-grounded, concise commit messages. Defers to repository conventions, enforces claim traceability, eliminates unsupported assertions.
---

# Anti-Slop Commit Message Generator

Generates commit messages grounded in the actual staged diff. Every claim in the message must trace to a specific code change.

## Core Principles

1. **Claim → Evidence.** The commit message describes what the diff does. Not what it "achieves", "enables", or "improves" unless you can point to a test or metric that proves it.
2. **Scope = Diff.** If the diff adds a null check, the message says "add null check." It does not say "strengthen input validation" or "improve error resilience."
3. **Repository conventions first.** Check for `.commitlintrc`, `CONTRIBUTING.md`, or prior commit history before choosing a format. Anti-slop defaults are fallbacks, not overrides.

## When to Use This Skill

- When generating git commit messages from staged diffs
- When cleaning up verbose or inflated commit messages before pushing

## How It Works

### Step 1: Read the Diff

Read the staged diff before writing the message. The commit message describes what the diff actually does, not what the user asked for in natural language.

### Step 2: Check Repository Conventions

Look for existing commit conventions in this order:
1. `.commitlintrc`, `.commitlintrc.json`, `.commitlintrc.yml`
2. `CONTRIBUTING.md` (commit message section)
3. Recent commit history (`git log --oneline -20`)

If found, follow the repository's format. If not found, default to Conventional Commits: `<type>(<optional scope>): <imperative subject>`.

### Step 3: Write the Message

- **Subject line**: Imperative mood, max 72 characters. Describes the concrete code change.
- **Body** (when needed): Explains *why* the change was made. Required when the subject alone does not make the motivation obvious — e.g., bug fixes, non-trivial refactors, or changes driven by external constraints.
- **No unsupported claims**: Do not assert effects (performance, reliability, security) unless the diff contains a test, benchmark, or configuration that demonstrates them.

### Step 4: Check Scope

If the diff changes multiple unrelated behaviors, suggest splitting into separate commits rather than cramming everything into one message.

## Vocabulary Heuristic

These terms are statistically overrepresented in AI-generated commits (source: [Louis Abraham, 461k PR corpus](https://louisabraham.github.io/load-bearing/)). Replace them unless the term is used in its primary technical meaning:

| Flagged Term | Replace With |
| :--- | :--- |
| `load-bearing` | `critical`, `required`, `core` |
| `quietly` | `omits`, `suppresses`, `defaults` |
| `delve` | `inspect`, `parse`, `traverse` |
| `orchestrate` | `coordinate`, `call`, `run` |
| `robust` | name the specific error handling |
| `seamless` | `direct`, `automated` |
| `pave the way` | `prepare`, `enable` |
| `streamline` | `simplify`, `remove`, `refactor` |

These are flags, not absolute bans. "Orchestrate" is correct in a Kubernetes context. "Latent" is correct in an ML context.

## Examples

### Simple bugfix

**Diff**: Adds `if (!user) return;` before accessing `user.name`

**Bad** (unsupported claims):
```text
fix(auth): strengthen user validation to prevent cascading failures
```

**Good** (grounded):
```text
fix(auth): add null check before accessing user.name
```

### Feature with body

**Diff**: Adds rate limiting middleware with Redis counter

**Good**:
```text
feat(auth): add ip-based rate limiting to login endpoint

Limits login attempts to 5 per minute per IP using Redis INCR
with 60s TTL. Returns 429 when exceeded.
```

### Multi-concern diff (suggest split)

**Diff**: Fixes a typo in a comment AND adds a new API route

**Good response**: "This diff contains two unrelated changes. Suggest splitting into separate commits:
1. `docs: fix typo in auth handler comment`
2. `feat(api): add GET /users/:id/preferences endpoint`"

## Tips

- Use imperative mood: "fix bug", "add feature", "refactor handler".
- Keep subject lines under 72 characters.
- If you cannot explain the *why* from the diff alone, ask the user rather than guessing.
- A commit message that says less but says it accurately is better than one that says more but speculates.
