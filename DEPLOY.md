# Deploy to Vercel (so friends can see your site)

## One-time setup (about 2 minutes)

1. **Install Vercel CLI** (if needed):
   ```bash
   npm i -g vercel
   ```

2. **Log in** (opens your browser):
   ```bash
   vercel login
   ```
   - Sign in with GitHub when the browser opens
   - Return to the terminal when done

## Deploy

From the project folder:

```bash
cd /Users/rodd/Documents/happy-traveler
npm run deploy
```

Or:

```bash
vercel --prod
```

Vercel will build and deploy. You’ll get a URL like `https://happy-traveler-xxx.vercel.app` — share that with friends.

---

**Tip:** After the first deploy, every `git push` to GitHub can trigger automatic redeploys if you connect the repo in the Vercel dashboard.
