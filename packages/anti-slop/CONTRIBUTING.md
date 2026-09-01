# Contributing to Anti-Slop

Thank you for helping keep technical communication crisp, factual, and free of AI slop!

---

## How to Contribute

### 1. Submitting New Slop Words / Phrases
If you identify a new emerging AI cliché or over-used adjective in PRs:
1. Edit `data/lexicon.json`.
2. Add the term to the appropriate category with:
   - `term`: The exact keyword or phrase.
   - `lift`: Approximate or observed frequency lift.
   - `replacement`: Plain Senior Engineer alternative.
   - `example_bad`: Example of AI slop sentence.
   - `example_good`: Grounded technical rewrite.
3. Run tests: `npm test`.

### 2. Adding a New Agent Adapter
If a new coding assistant or IDE emerges:
1. Create a drop-in template in `adapters/<agent_name>/`.
2. Update `src/installer.js` to support the `--agent <agent_name>` flag.
3. Add a test in `test/installer.test.js`.

### 3. Running Tests
```bash
npm test
```
