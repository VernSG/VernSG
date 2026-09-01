---
name: anti-slop-commit
description: >-
  Enforce plain, concise Conventional Commit messages. Eliminates conversational AI filler
  and poetic words in commit titles and bodies.
---

# Anti-Slop Commit Message Generator

Generates clean, imperative, conventional git commit messages with zero AI adjectives or metaphorical commentary.

---

## Commit Rules

1. **Format**: `<type>(<optional scope>): <imperative subject>`
2. **Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`.
3. **No Fluff in Subject**:
   - ❌ `fix(auth): quietly resolve load-bearing token refresh issue`
   - ✅ `fix(auth): add mutex lock to prevent refresh race condition`
4. **Max 72 characters** for subject line.
5. **Body**: Plain technical explanation of why the change was made without narrative adjectives.
