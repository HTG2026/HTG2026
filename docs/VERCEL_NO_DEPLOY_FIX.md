# Vercel: no new deployment after `git push`

**If Actions fails and you think it’s the secrets:** use the step-by-step **[GITHUB_VERCEL_SECRETS.md](GITHUB_VERCEL_SECRETS.md)** (exact names + where to copy each value).

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

**Important:** Use the **IDs**, not the project name or URL slug.

1. Vercel → your project → **Settings** → **General**.
2. Copy **Project ID** — must look like **`prj_xxxxxxxx`** (GitHub secret `VERCEL_PROJECT_ID`). If you only see a short name, you’re on the wrong field.
3. **Team ID** (Org ID) — same **General** page often shows **Team ID** as **`team_xxxxxxxx`**, or: top-left team menu → **Team Settings** → **Team ID**. GitHub secret `VERCEL_ORG_ID`.

If **`vercel whoami`** passes in Actions but deploy fails, the Project ID or Team ID almost always doesn’t match the project you think is linked.

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

The workflow runs **`vercel deploy --prod`** so **Next.js builds on Vercel**, not in GitHub (same as a normal Git deploy). Check the deploy log in **Vercel** if GitHub only shows a generic error.

- Ensure **Production** env vars exist in Vercel → Project → **Settings → Environment Variables**.
- **Org ID** must be the **Team ID** (or personal team id from Vercel General settings), not the project slug.
- **Project ID** must match **Settings → General → Project ID** exactly.

Open the failed GitHub run → expand **Deploy to production** for CLI output.

### Still red after fixes?

- **Re-copy secrets** in GitHub: select all → delete → paste again. Hidden **newlines** after the ID break JSON; the deploy script now **trims** them, but old workflows didn’t.
- **Project ID** must start with **`prj_`**. If yours doesn’t, open Vercel → **Settings → General** and use the field labeled **Project ID**, not the name in the URL.
- **Token**: create a **new** token at [vercel.com/account/tokens](https://vercel.com/account/tokens) and update `VERCEL_TOKEN` (old tokens can be revoked or lack access).
