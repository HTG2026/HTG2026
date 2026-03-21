# Simpler ways to get Vercel deploying

## 1) Easiest: fix Vercel ↔ GitHub (no Actions, no extra secrets)

This is what Vercel is built for. **You don’t need GitHub Actions at all** if this works.

1. Open [Vercel Dashboard](https://vercel.com/dashboard) → your project.
2. **Settings** → **Git**.
3. **Disconnect**.
4. **Connect Git Repository** → pick **`HTG2026/HTG2026`**.
5. **Production Branch** = **`main`**.
6. Save. Push any small commit to `main` — Vercel should deploy automatically.

**After this works:** you can delete `.github/workflows/deploy-vercel.yml` in the repo (optional) so you’re not maintaining two deploy paths.

---

## 2) One GitHub secret only (if you still want Actions)

You only need **`VERCEL_TOKEN`** in GitHub if the project link file is **in the repo**.

On your computer (logged into Vercel in the browser):

```bash
cd /path/to/happy-traveler
npx vercel link
```

Answer the prompts (same team + project as production). Then:

```bash
git add .vercel/project.json
git commit -m "chore: add Vercel project link for CI"
git push origin main
```

`.vercel/project.json` only contains **org + project IDs** (not your password). It’s safe to commit.

GitHub → **Secrets** → you can **remove** `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID`; keep **`VERCEL_TOKEN`** only.

---

## 3) Deploy from your laptop (no GitHub setup)

```bash
npx vercel login
npx vercel link    # once
npx vercel --prod  # whenever you want production updated
```

---

**Summary:** Try **(1)** first. Use **(2)** or **(3)** only if you specifically need Actions or CLI.
