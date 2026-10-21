# Contributing

Thanks for helping improve Learn Kana!

1. Fork the repo and create a branch from `main`.
2. Install dependencies with `npm ci` (Node.js 22) and run `npm run dev`.
3. Make your change. Keep lesson data accurate and include English and Bangla text where the existing data has them.
4. Before opening a pull request, make sure these pass:
   ```bash
   npm run lint
   npm run typecheck
   npm run build
   ```
5. Use clear, conventional commit messages (`feat:`, `fix:`, `docs:`, `chore:` …) and describe what you changed and why in the PR.

Found a mistake in a reading, translation or audio clip? Please [open an issue](https://github.com/pixel404dot/learnjp/issues) with the lesson and the correct text.

Never commit secrets (`.env` files, keystores, API keys).
