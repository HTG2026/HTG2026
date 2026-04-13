# Deploy Your Site — 3 Steps

**Simpler options (fix Git hook, one secret, or laptop CLI):** [docs/SIMPLE_DEPLOY.md](docs/SIMPLE_DEPLOY.md)

Your app **builds successfully** locally. To get it live:

---

## Fresh Vercel project (same GitHub repo)

Use this when you want a **clean dashboard** and a new `.vercel.app` URL (you can delete or ignore the old project after).

1. **Copy env vars** from the old project: Vercel → Project → **Settings** → **Environment Variables** (screenshot or list). You’ll paste them into the new project.
2. Open **[vercel.com/new](https://vercel.com/new)** → **Add New…** → **Project**.
3. **Import** `HTG2026/HTG2026` (install the GitHub app / grant access if asked). Pick branch **`main`**. Root **.** — Framework **Next.js** (auto).
4. Click **Deploy** and wait until status is **Ready**.
5. Open the **exact** URL Vercel shows (Deployments → your production deployment). Don’t guess the hostname.
6. **Settings** → **Environment Variables** → add everything from step 1. Match [.env.example](.env.example) / [docs/SETUP_API_KEYS.md](docs/SETUP_API_KEYS.md) for names. Use **Production** (and **Preview** if you use preview deploys).
7. **Deployments** → **⋯** on the latest → **Redeploy** (so new env applies).
8. **Optional:** **Settings** → **Domains** — add your custom domain; then set `NEXT_PUBLIC_SITE_URL` to `https://your-domain.com` and redeploy again.
9. **Optional:** Delete or pause the **old** Vercel project after the new one works. Remove any custom domain from the old project first if you reuse it.

---

### Alternative: one-click clone (new *GitHub* repo + Vercel)

**Only if you want a duplicate of the repo on GitHub.** Otherwise use **Fresh Vercel project** at the top.

1. **https://vercel.com/new/clone?repository-url=https://github.com/HTG2026/HTG2026**
2. Sign in with GitHub, authorize Vercel if prompted.
3. Deploy — you’ll get a new repo fork and a Vercel project.

---

## If deploy doesn’t work

1. **Repo not found?** Make sure the repo `HTG2026/HTG2026` is public, or that you’re signed into the GitHub account that owns it.

2. **Build fails?** Check the build logs in the Vercel dashboard. The app builds locally, so it’s usually an env var or framework detection issue.

3. **404 on the site?** Use the exact URL Vercel gives you after deploy. Don’t guess the URL.

4. **Pushes to GitHub but no new Vercel deployment?** See **[docs/VERCEL_NO_DEPLOY_FIX.md](VERCEL_NO_DEPLOY_FIX.md)** — reconnect Git in Vercel.
