---
name: anti-slop-commit
description: >-
  Enforce plain, concise Conventional Commit messages. Activate this skill whenever the user
  asks to write, generate, or review a git commit message.
---

# Anti-Slop Commit Message Protocol

Generates clean, imperative, conventional git commit messages with zero AI adjectives or conversational filler.

---

## Commit Execution Rules

1. **Format**: `<type>(<optional scope>): <imperative subject>`
2. **Standard Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`.
3. **Subject Line Constraints**:
   - Maximum **72 characters**.
   - Imperative mood ("add mutex lock", not "added mutex lock" or "quietly adds mutex lock").
   - ❌ Never use AI adjectives: *"quietly resolve load-bearing token issue"*.
   - ✅ State factual action: *"add mutex lock to prevent token refresh race condition"*.
4. **Body (Optional)**:
   - Provide a plain technical explanation of *why* the commit was necessary if the subject line is insufficient.
   - Do not include conversational remarks (*"Feel free to review..."*).
