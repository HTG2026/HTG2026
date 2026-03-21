# Vercel: no new deployment after `git push`

If **GitHub shows your latest commit** but **Vercel has no new deployment**, the link between GitHub and Vercel is broken or misconfigured.

---

## Option A — Reconnect Git (try this first)

1. Open [Vercel Dashboard](https://vercel.com/dashboard) → your project.
2. **Settings** → **Git**.
3. **Disconnect** the repository (confirm).
4. **Connect Git Repository** again → choose **HTG2026/HTG2026**.
5. Set **Production Branch** to **`main`**.
6. Save, then push any commit (or use **Deployments → Redeploy** on latest).

---

## Option B — Deploy via GitHub Actions (works without webhooks)

This repo includes `.github/workflows/deploy-vercel.yml`. It deploys on every push to `main`.

### 1. Create a Vercel token

1. [vercel.com/account/tokens](https://vercel.com/account/tokens) → **Create**.
2. Copy the token (shown once).

### 2. Get Org ID and Project ID

1. Vercel → your project → **Settings** → **General**.
2. Copy **Project ID**.
3. Under **Team** (or your account), open **Settings** → copy **Team ID** (this is **Org ID** for personal accounts it may show under General as well).

Alternatively, on your machine (after `npx vercel link`):

```bash
cat .vercel/project.json
```

You’ll see `orgId` and `projectId`.

### 3. Add GitHub secrets

1. GitHub → **HTG2026/HTG2026** → **Settings** → **Secrets and variables** → **Actions**.
2. **New repository secret** for each:

| Name | Value |
|------|--------|
| `VERCEL_TOKEN` | Token from step 1 |
| `VERCEL_ORG_ID` | Team / org ID |
| `VERCEL_PROJECT_ID` | Project ID |

### 4. Trigger a deploy

- Push to `main`, or  
- **Actions** tab → **Deploy to Vercel** → **Run workflow**.

---

## If both Git hook and Actions deploy

You may get **two** deployments per push after fixing Git. Then either:

- Remove **Option B** (delete the workflow), or  
- Leave only one path active (disconnect Git deploy in Vercel **or** disable the workflow).

---

## Build fails in Actions

- Match **Node** to your app (workflow uses **20**).
- Ensure **environment variables** used at build time exist in Vercel **Production** (the `vercel pull` step loads them when it succeeds).
- Open the failed run → **build** log for the exact error.
