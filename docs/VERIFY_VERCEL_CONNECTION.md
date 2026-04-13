# Verify Vercel ↔ GitHub is live

## What we can check from the repo

- **Default fallback in code** (`NEXT_PUBLIC_SITE_URL` unset): `https://happy-traveler.vercel.app`  
  That hostname often returns **`DEPLOYMENT_NOT_FOUND`** unless *your* project is assigned that exact name. **Do not assume** a `.vercel.app` URL — use the one Vercel shows after deploy ([see VERCEL_STILL_BROKEN.md](./VERCEL_STILL_BROKEN.md)).

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
