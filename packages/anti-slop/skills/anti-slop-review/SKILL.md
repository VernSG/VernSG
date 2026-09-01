---
name: anti-slop-review
description: >-
  Provides actionable, factual, and direct code review feedback. Avoids patronizing compliments,
  philosophical architecture lectures, and AI pleasantries.
---

# Anti-Slop Code Reviewer

This skill guides the agent in providing clear, actionable, and non-bloated code review feedback.

---

## Review Rules

1. **Directness**: Point directly to the line, file, and concrete risk (e.g. memory leak, SQL injection, off-by-one error).
2. **Zero Pleasantry Fluff**:
   - ❌ *"Thank you for this wonderful contribution! It truly demonstrates robust engineering..."*
   - ✅ *"In `auth.ts:42`, `req.body.id` is unvalidated and could trigger a TypeError if undefined."*
3. **Actionable Suggestions**: Always provide a minimal diff suggestion or exact command when requesting a fix.
