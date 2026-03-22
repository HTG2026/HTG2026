# Vercel still not working — do this in order

The app **`npm run build`** succeeds locally. If production still fails, the issue is **Vercel + GitHub setup**, not the Next.js code.

---

## 1) Use the exact URL Vercel gives you

**Deployments** → latest **Ready** row → **Visit**.

Do **not** guess `something.vercel.app`. Wrong hostname → **404 / DEPLOYMENT_NOT_FOUND**.

---

## 2) Confirm Git is really connected

**Settings → Git**

- **Connected Git Repository** = `HTG2026/HTG2026`
- **Production Branch** = `main`

If unsure: **Disconnect** → **Connect** again → pick the repo → **main**.

---

## 3) Read the latest deployment

**Deployments** → open the **newest** row (matches your last push).

- **Building / Queued** → wait.
- **Error** (red) → open **Build Logs**. The **last 30 lines** tell you the fix (missing env, cron/plan, etc.).
- **Ready** (green) → site is deployed; your problem is only **wrong URL** or **browser cache** (try incognito).

---

## 4) GitHub must allow Vercel

**GitHub** → **Settings** → **Applications** → **Vercel** → **Configure**

- Repository access includes **`HTG2026/HTG2026`** (or “All repositories”).

---

## 5) Cron jobs + Hobby plan

`vercel.json` defines **cron** routes. On **Hobby**, cron may be limited; if the log mentions **cron** or **plan**, either **upgrade to Pro** or temporarily remove the `"crons"` block from `vercel.json`, commit, push, and redeploy.

---

## 6) Nuclear option — new Vercel project

Sometimes the old project is stuck wrong.

1. [vercel.com/new](https://vercel.com/new) → **Import** `HTG2026/HTG2026`
2. Framework: **Next.js** (auto)
3. **Deploy**
4. Copy the **new** `.vercel.app` URL from the success screen
5. In **Environment Variables**, copy any keys from the old project (e.g. `WEATHERAPI_KEY`, Upstash, etc.)
6. Set **`NEXT_PUBLIC_SITE_URL`** to this new production URL

---

## 7) Deploy without waiting for Git (sanity check)

On your Mac, in the repo:

```bash
npx vercel login
npx vercel --prod
```

If **this** works, the code is fine; focus on **Git integration** or use **CLI deploy** until Git is fixed.
