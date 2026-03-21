# Fix GitHub → Vercel secrets (when Actions stays red)

Use **exactly three** repository secrets. Wrong names or wrong values = deploy fails.

**Where:** GitHub → repo **HTG2026/HTG2026** → **Settings** → **Secrets and variables** → **Actions** → **Repository secrets**

Delete the old three if you’re unsure, then add fresh ones.

---

## 1. `VERCEL_TOKEN`

1. Open **https://vercel.com/account/tokens**
2. **Create** (name it e.g. `github-actions`)
3. Copy the token **once** (you won’t see it again).
4. GitHub → **New repository secret**  
   - **Name:** `VERCEL_TOKEN` (exact spelling, all caps)  
   - **Secret:** paste the token only — **no** quotes, **no** spaces, **no** new line after it.

If you don’t have the string saved anymore, **create a new token** and replace this secret.

---

## 2. `VERCEL_ORG_ID` (Team ID — **not** project name)

1. Open **https://vercel.com/dashboard**
2. Click your **team** (or personal scope) in the top-left — **Settings**
3. **General** → find **Team ID**  
   - Usually looks like **`team_xxxxxxxxxxxxxxxx`**
4. GitHub → **New repository secret**  
   - **Name:** `VERCEL_ORG_ID`  
   - **Secret:** paste **only** that ID (same rules: no quotes, no extra line).

**Do not use:** project slug, email, or “team name” text unless it’s literally the ID field.

---

## 3. `VERCEL_PROJECT_ID` (**must** start with `prj_`)

1. Vercel → open **this site’s project** (the one that should deploy)
2. **Settings** → **General**
3. Scroll to **Project ID** — value looks like **`prj_xxxxxxxxxxxxxxxx`**
4. GitHub → **New repository secret**  
   - **Name:** `VERCEL_PROJECT_ID`  
   - **Secret:** paste **only** that `prj_…` string.

**Wrong:** project **name** in the URL (e.g. `htg2026`), or **deployment** id.  
**Right:** the **Project ID** field on **Settings → General**.

---

## Names must match exactly

| GitHub secret name      | Common mistake                          |
|-------------------------|-----------------------------------------|
| `VERCEL_TOKEN`          | Typo: `VERCEL_API_TOKEN`, `TOKEN`       |
| `VERCEL_ORG_ID`         | Typo: `ORG_ID`, `VERCEL_TEAM_ID`        |
| `VERCEL_PROJECT_ID`     | Typo: `PROJECT_ID`, `VERCEL_PROJECT`    |

The workflow reads **only** these three names.

---

## After saving

1. **Actions** → **Deploy to Vercel** → **Run workflow** (or push any commit to `main`).
2. If **whoami** fails → token is wrong or revoked → new token.
3. If **deploy** fails but **whoami** works → almost always **wrong `prj_` or `team_` ID** or they belong to a **different** Vercel account than the token.

---

## Same person, two accounts?

The GitHub token must be created while logged into Vercel as the **same user/team that owns the project**. If the project is under Team A but the token is from a personal account with no access, deploy will fail.
