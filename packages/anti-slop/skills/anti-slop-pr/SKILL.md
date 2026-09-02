---
name: anti-slop-pr
description: Enforce high-signal, zero-slop pull request descriptions grounded directly in technical code diffs.
---

# Anti-Slop PR Description

Generates concise, evidence-grounded pull request descriptions. Every claim traces to a line in the diff, a test result, or explicit context.

## Core Principles

1. **Claim → Evidence → Conclusion.** Every factual statement traces to a specific line in the diff, an inspected source file, a test result, or explicit user-provided context. No evidence, no claim.
2. **Scope = Diff.** Describe what the code change does. Do not describe what it "achieves", "enables", or "unlocks" unless you can cite a test or metric.
3. **Repository conventions first.** Check for an existing PR template (`.github/PULL_REQUEST_TEMPLATE.md`), `CONTRIBUTING.md`, or `AGENTS.md` before applying anti-slop defaults. Repository formats override anti-slop formats. Anti-slop grounding rules still apply on top.
4. **Honest minimalism.** A 3-line bugfix gets a 1-sentence summary. A 200-line feature gets more detail. Scale the description to the change, not the other way around.

## When to Use This Skill

- When drafting or summarizing a GitHub pull request description from git diffs
- When preparing release summaries or technical changelogs

## Output Structure

### Summary (max 2 sentences)

- Sentence 1: What changed technically.
- Sentence 2: Why it was needed.

The 2-sentence limit applies to the Summary section only. Changes and Verification have no sentence limit.

### Changes (per-file, no limit)

List concrete modifications by file path and action. Include function names when relevant.

### Verification

List test commands, manual verification steps, or reproduction steps.

### Breaking Changes (when applicable)

List explicit migration steps. State what breaks, what the user must do, and what version is affected.

## Grounding Rules

- **Name exact files, functions, and mechanisms** from the diff.
- **External context is allowed** when explaining *why* a change was made. Example: "Fixes timeout in `api/orders.ts` because the upstream payment-service increased its response latency." The external system is not in the diff but is necessary context.
- **Do not assert effects you have not verified.** If you claim the change "fixes" something, cite the test, reproduction, or observable evidence. If you claim a performance improvement, cite the benchmark.
- **Do not inflate scope.** A 5-line bugfix is a bugfix, not a system redesign.

## Vocabulary Heuristic

These terms are statistically overrepresented in AI-generated PRs (source: [Louis Abraham, 461k PR corpus](https://louisabraham.github.io/load-bearing/)). Replace unless the term is used in its primary technical meaning:

| Flagged Term | Lift | Replace With |
| :--- | :--- | :--- |
| `load-bearing` | 123× | `critical`, `required`, `core` |
| `quietly` | 95× | `defaults to`, `omits without throwing` |
| `delve` | 88× | `inspects`, `traverses`, `parses` |
| `seam` | 84× | `interface`, `module boundary` |
| `genuine` | 71× | `valid`, `verified` |
| `robust` | 66× | name the specific error handling |
| `latent` | 62× | `hidden bug`, `unhandled condition` |
| `seamless` | 59× | `direct`, `automated` |
| `orchestrate` | 45× | `coordinates`, `calls`, `runs` |

These are flags, not absolute bans. "Orchestrate" is correct in Kubernetes. "Latent" is correct in ML. "Seam" is correct when referencing Michael Feathers' technique.

## Example

**User**: "Write a PR description for the recent auth concurrency fix."

**Output**:
```markdown
## Summary
Adds a mutex lock to `RefreshToken` to prevent race conditions when simultaneous token refresh requests hit the same session ID.

## Changes
- `auth/token.go`: Wrapped store lookup with `s.mu.Lock()` and `defer s.mu.Unlock()`.

## Verification
- `go test -race ./auth/...`
```

## Anti-Patterns

**Unsupported claim (no banned words, still wrong):**
> "Adds error handling to the database query to prevent data corruption and improve system reliability."

A try/catch prevents an unhandled exception. Whether it prevents "data corruption" depends on the catch block, transaction isolation, and idempotency — none of which are in the diff. Whether it "improves reliability" requires a metric. Write instead: "Wraps `insertOrder` in try/catch. Logs the error and returns HTTP 500."

**Scope inflation:**
> Diff adds `if (!user) return;`
> "This pivotal change strengthens the application's resilience by introducing a defensive programming strategy."

Write instead: "Adds null check before accessing the user object."

## Tips

- State facts, not philosophy: a 5-line bugfix is just a bugfix, not a system redesign.
- For breaking changes, list explicit migration steps without dramatic language.
- If you cannot determine *why* a change was made from the diff alone, ask the user rather than guessing.
- Pair with the `@vernsg/anti-slop` CLI linter for automated CI enforcement.
