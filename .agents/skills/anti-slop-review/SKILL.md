---
name: anti-slop-review
description: Provides actionable, factual, and direct code review feedback without pleasantries or philosophical lectures.
---

# Anti-Slop Code Reviewer

Provides high-signal, factual, and actionable code review feedback without patronizing AI pleasantries, generic praise, or philosophical lectures.

## When to Use This Skill

- When reviewing a pull request diff or code submission
- When auditing code for bugs, security vulnerabilities, or performance bottlenecks
- When providing concise, senior-engineer feedback in code reviews

## What This Skill Does

1. **Direct Issue Pinpointing**: Specifies the exact line number, function, and concrete technical risk (e.g. race condition, unhandled error, memory leak).
2. **Zero Pleasantry Fluff**: Eliminates patronizing filler (*"Thank you for this wonderful contribution!"*).
3. **Actionable Minimal Diffs**: Provides minimal code replacement snippets or exact commands for every finding.

## How to Use

### Basic Usage

```text
Review this pull request diff for bugs and security issues.
```

### Advanced Usage

```text
Perform a senior engineer code review on auth.ts focusing on concurrency and error handling.
```

## Example

**User**: "Review this token validation function."

**Output**:
```markdown
### Code Review Findings

- **[Blocking Bug] `auth.ts:42`**: `req.body.id` is unvalidated and will trigger an unhandled TypeError if undefined.
  ```diff
  - const userId = req.body.id;
  + if (!req.body?.id) return res.status(400).json({ error: "Missing user ID" });
  + const userId = req.body.id;
  ```
- **[Performance] `db.ts:88`**: `SELECT *` query inside loop causes N+1 database queries. Use batch query with `WHERE id IN (...)`.
```

**Inspired by:** [VernSG/anti-slop](https://github.com/VernSG/anti-slop) and Google Engineering Practices.

## Tips

- Distinguish severity levels clearly (`[Blocking]`, `[Security]`, `[Performance]`, `[Nitpick]`).
- Never use vague words like *"looks robust"* — verify the exact failure paths.
- Always supply actionable diff replacements.

## Common Use Cases

- Pull request code reviews
- Automated CI code review agents
- Security and performance audits
