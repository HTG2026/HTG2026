# Vercel: no new deployment after `git push`

If **GitHub shows your latest commit** but **Vercel has no new deployment**, the link between GitHub and Vercel is broken.

---

## Fix — reconnect Git (the normal path)

1. Open [Vercel Dashboard](https://vercel.com/dashboard) → your project.
2. **Settings** → **Git**.
3. **Disconnect** the repository (confirm).
4. **Connect Git Repository** again → choose **HTG2026/HTG2026**.
5. Set **Production Branch** to **`main`**.
6. Save, then push any commit (or **Deployments → Redeploy** on latest).

---

## Still stuck?

- **[SIMPLE_DEPLOY.md](SIMPLE_DEPLOY.md)** — laptop CLI (`npx vercel --prod`) and tips.
- **Production env vars:** Vercel → Project → **Settings → Environment Variables** (build can fail if required vars are missing).

This repo **does not** ship a GitHub Actions deploy workflow; deploys are expected to come from **Vercel ↔ Git** only.
