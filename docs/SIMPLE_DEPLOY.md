# Simpler ways to get Vercel deploying

## 1) Default: Vercel ↔ GitHub (no Actions)

1. [Vercel Dashboard](https://vercel.com/dashboard) → your project → **Settings** → **Git**.
2. **Connect** repo **`HTG2026/HTG2026`**, production branch **`main`**.
3. Every **`git push`** to `main` deploys automatically.

---

## 2) Deploy from your laptop

```bash
npx vercel login
npx vercel link    # once
npx vercel --prod  # when you want production updated
```

Or use **`npm run deploy`** in this repo (runs `vercel --prod`).

---

## 3) Optional: commit `.vercel/project.json`

If you use the CLI a lot, run **`npx vercel link`** once and commit **`.vercel/project.json`** so the project is pinned. IDs in that file are not secret (same as in the Vercel dashboard).

---

**Summary:** Use **(1)** for normal workflow. Use **(2)** for manual deploys.

**If it still fails:** **[VERCEL_STILL_BROKEN.md](VERCEL_STILL_BROKEN.md)** (checklist + fresh import + CLI test).
