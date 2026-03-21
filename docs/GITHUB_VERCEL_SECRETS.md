# GitHub → Vercel secrets (reference only)

This repo **does not** use GitHub Actions for Vercel deploys. Deploys come from **Vercel ↔ Git** (see [SIMPLE_DEPLOY.md](SIMPLE_DEPLOY.md)).

You can **remove** any old **`VERCEL_*`** repository secrets in GitHub if you added them earlier — they are unused unless you add your own workflow.

---

## If you add a custom Actions workflow later

You would typically need:

| Secret | Source |
|--------|--------|
| `VERCEL_TOKEN` | [vercel.com/account/tokens](https://vercel.com/account/tokens) |
| `VERCEL_ORG_ID` | Vercel → Team **Settings** → **Team ID** (`team_…`) |
| `VERCEL_PROJECT_ID` | Vercel → Project **Settings** → **General** → **Project ID** (`prj_…`) |

Or commit **`.vercel/project.json`** after `npx vercel link` and only store **`VERCEL_TOKEN`**.

Names must match **exactly** (see any workflow you author).
