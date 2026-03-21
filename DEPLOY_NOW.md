# Deploy Your Site — 3 Steps

**Simpler options (fix Git hook, one secret, or laptop CLI):** [docs/SIMPLE_DEPLOY.md](docs/SIMPLE_DEPLOY.md)

Your app **builds successfully** locally. To get it live:

---

## Step 1: Open this link

**https://vercel.com/new/clone?repository-url=https://github.com/HTG2026/HTG2026**

---

## Step 2: Sign in

- Click **Continue with GitHub**
- Authorize Vercel if prompted

---

## Step 3: Deploy

- Click the green **Deploy** button
- Wait 2–3 minutes
- You’ll get a URL like `https://htg2026.vercel.app`

---

## If that doesn’t work

1. **Repo not found?** Make sure the repo `HTG2026/HTG2026` is public, or that you’re signed into the GitHub account that owns it.

2. **Build fails?** Check the build logs in the Vercel dashboard. The app builds locally, so it’s usually an env var or framework detection issue.

3. **404 on the site?** Use the exact URL Vercel gives you after deploy. Don’t guess the URL.

4. **Pushes to GitHub but no new Vercel deployment?** See **[docs/VERCEL_NO_DEPLOY_FIX.md](VERCEL_NO_DEPLOY_FIX.md)** — reconnect Git in Vercel or add GitHub Actions secrets (`VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`).
