<div align="center">

# 🛡️ Anti-Slop (`@vernsg/anti-slop`)

**Stop AI slop from polluting your GitHub PR descriptions and commit messages.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![Node: >=18](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)]()
[![Slop Free](https://img.shields.io/badge/AI--Slop-0%25-success.svg)]()

<br />

<img src="./assets/research.png" alt="The Load-Bearing Vocabulary of Claude Research Dashboard" width="100%" />

<br />

```text
❌ "This PR quietly refactors a load-bearing seam across the auth layer..."
⬇
✅ "Fixes token refresh race condition by adding a mutex lock in auth.go."
```

</div>

---

## 🚨 The Problem

A [statistical study of 461,000+ GitHub PRs](https://louisabraham.github.io/load-bearing/) (Louis Abraham, 2026) revealed that **45% of pull requests now share the exact same AI vocabulary cluster**.
- **Over-inflated jargon:** Words like *"load-bearing"* spiked by **+12,304% ($123\times$)**, along with *"quietly"*, *"seam"*, *"latent"*, and *"genuine"*.
- **Reviewer fatigue:** Reviewers stop reading bloated 3-paragraph summaries and look only at the raw diff.
- **Obscured mechanics:** AI buzzwords replace concrete technical facts (mutexes, regex validation, index additions).

---

## ⚡ Quick Start

### 1. Install Rules for Your AI Agents (1 Second)
Scaffold rules directly into your project for **Antigravity, Cursor, Claude Code, Windsurf, Copilot, & Gemini**:

```bash
npx @vernsg/anti-slop install --agent all
```

### 2. Lint Any PR Text or File
```bash
npx @vernsg/anti-slop lint "This PR quietly refactors the load-bearing seam"
```

---

## 📐 The Two-Sentence Rule

Summarize any PR in **maximum 2 plain sentences** (Sentence 1: What changed technically, Sentence 2: Why it was needed).

| Scenario | ❌ AI Slop | ✅ Anti-Slop Senior Engineer |
| :--- | :--- | :--- |
| **Bugfix** | *"Quietly resolves a latent race condition by protecting the load-bearing auth seam."* | **"Adds mutex lock to `RefreshToken` to prevent race conditions during concurrent token refreshes."** |
| **Validation** | *"Delves into user onboarding and orchestrates a robust validation layer."* | **"Returns HTTP 400 when registration email fails regex validation."** |
| **Database** | *"Executes a pivotal adjustment to streamline the order retrieval tapestry."* | **"Adds composite index on `(user_id, created_at)` to `orders` table to speed up user history queries."** |

---

## 🤖 Supported Agents

| Agent | Config File | Install Command |
| :--- | :--- | :--- |
| **Antigravity** | `.agents/skills/anti-slop-pr/SKILL.md` | `npx @vernsg/anti-slop install --agent antigravity` |
| **Claude Code** | `CLAUDE.md` | `npx @vernsg/anti-slop install --agent claude` |
| **Cursor IDE** | `.cursorrules` | `npx @vernsg/anti-slop install --agent cursor` |
| **Windsurf** | `.windsurfrules` | `npx @vernsg/anti-slop install --agent windsurf` |
| **Gemini IDE** | `GEMINI.md` | `npx @vernsg/anti-slop install --agent gemini` |
| **GitHub Copilot** | `.github/copilot-instructions.md` | `npx @vernsg/anti-slop install --agent copilot` |

---

## ⚙️ Automated CI / Git Hook

### GitHub Action (`.github/workflows/anti-slop.yml`)
```yaml
name: Anti-Slop Linter
on: [pull_request]
jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npx @vernsg/anti-slop lint "${{ github.event.pull_request.body }}"
```

---

## 📄 License & Reference
- **Research Source:** [Louis Abraham - The load-bearing vocabulary of Claude](https://louisabraham.github.io/load-bearing/)
- **License:** [MIT](./LICENSE)
