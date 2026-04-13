# Verify Vercel ↔ GitHub is live

## How the app picks the site URL

1. **`NEXT_PUBLIC_SITE_URL`** — optional; use for a **custom domain** or a stable URL you choose in Vercel.
2. **`VERCEL_URL`** — set automatically on every Vercel deployment. The app uses `https://${VERCEL_URL}` when the env above is unset, so metadata/sitemap match **this** deployment (no guessed hostname).
3. **Local:** `http://localhost:3000` when neither is set.

You can still set `NEXT_PUBLIC_SITE_URL` in Vercel to your production custom domain so canonical URLs stay consistent across preview vs production if needed.

## Automated check (after you set the real URL)

1. In **Vercel** → your project → **Settings** → **Environment Variables**, set **`NEXT_PUBLIC_SITE_URL`** to your **Production** URL (the `.vercel.app` URL or custom domain from **Deployments**).

2. Copy the same value into **`.env.local`** locally (for scripts and metadata).

3. Run:

   ```bash
   npm run check:vercel
   ```

   Or pass the URL once:

   ```bash
   npm run check:vercel -- https://YOUR-PROJECT.vercel.app
   ```

**OK** = HTTP 200 and no `x-vercel-error: DEPLOYMENT_NOT_FOUND`.

## Confirm Git integration (dashboard)

1. [vercel.com/dashboard](https://vercel.com/dashboard) → select the project.
2. **Settings** → **Git** — repository should show **`HTG2026/HTG2026`** (or your fork) and the correct production branch (usually **`main`**).
3. **Deployments** — latest commit on `main` should show a **Ready** deployment within a few minutes of `git push`.

If pushes do not create deployments, see [VERCEL_NO_DEPLOY_FIX.md](./VERCEL_NO_DEPLOY_FIX.md).
