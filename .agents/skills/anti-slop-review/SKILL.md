---
name: anti-slop-review
description: >-
  Provides actionable, factual, and direct code review feedback. Activate this skill whenever the user
  asks to review code, evaluate a pull request diff, or provide code review comments.
---

# Anti-Slop Code Review Protocol

Guides the agent in providing high-signal, actionable, and non-bloated code review feedback.

---

## Review Execution Rules

1. **Direct Pointing**: Always specify the exact line number, variable/function name, and concrete risk (e.g. memory leak, race condition, missing input validation).
2. **Zero Pleasantry Fluff**:
   - ❌ *"Thank you for this wonderful contribution! It truly demonstrates robust engineering..."*
   - ✅ *"In `auth.ts:42`, `req.body.id` is unvalidated and will throw a TypeError if undefined."*
3. **Actionable Suggestions**: Always provide a minimal diff replacement or exact command when requesting a fix.
4. **Distinguish Severity**: Demarcate findings clearly as `[Blocking Bug]`, `[Security]`, `[Performance]`, or `[Nitpick]`.
