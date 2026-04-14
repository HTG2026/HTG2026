# No-code homepage editing (Sanity)

You get a **visual editor** (forms, lists) in the browser. No JSON files required once this is set up.

## 1. Create a free Sanity project

1. Go to **[sanity.io](https://www.sanity.io/)** → sign up / log in.
2. **Create project** → note the **Project ID**.

## 2. Deploy the content schema to Sanity

From your laptop, in the `happy-traveler` folder (with Node installed):

```bash
npm run sanity:schemas
```

(`sanity schemas deploy` — use the same Project ID and dataset as in `.env.local`.) This deploys the **Homepage** schema so the Sanity editor shows the right fields.

If the CLI asks you to log in, follow the browser prompt.

**Alternative:** run `npx sanity dev` once — opens a local Studio with this repo’s schema; useful if `schemas deploy` isn’t available in your CLI version.

## 3. Environment variables (Vercel + local)

Add to **Vercel** → Project → **Settings** → **Environment Variables** (Production):

| Name | Value |
|------|--------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Your project ID from step 1 |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` (unless you chose another) |

Copy the same into **`.env.local`** for local preview.

**Redeploy** on Vercel after saving env vars.

## 4. CORS (so the Studio can talk to your project)

In **[sanity.io/manage](https://www.sanity.io/manage)** → your project → **API** → **CORS origins** → add:

- `http://localhost:3000`
- `https://htg-2026-april.vercel.app` (your real Vercel URL)

## 5. Open the editor (no code)

1. Go to **[sanity.io/manage](https://www.sanity.io/manage)** → your project.
2. Open **Studio** (or the “Content” / structure view).
3. Create a document of type **Homepage** if none exists, fill in fields (same structure as `content/home.json`), then **Publish**.

The live site reads from Sanity when `NEXT_PUBLIC_SANITY_PROJECT_ID` is set. If Sanity is empty or unreachable, it falls back to **`content/home.json`**.

## 6. Optional: copy from JSON first

To avoid typing everything twice, keep `content/home.json` as reference and mirror sections into the **Homepage** document in Sanity, then publish.

---

**Without Sanity:** unset the env vars; the site keeps using **`content/home.json`** only (or edit that file on GitHub).
