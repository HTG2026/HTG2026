# Clear saved GitHub password and push again

Do these in Terminal, one at a time.

## Step 1: Clear the stored password

Copy and paste this **whole block** (all 4 lines), then press Enter **once**:

```
git credential-osxkeychain erase
host=github.com
protocol=https
```

(You need to press Enter **twice** after the last line — once to add a blank line, once to run it.)

## Step 2: Create a NEW token

1. Open: https://github.com/settings/tokens/new
2. **Note:** type `happy-traveler-push`
3. **Expiration:** 90 days (or No expiration)
4. Under **Scopes**, check the box for **repo** (the top one — it will check all the repo boxes under it)
5. Scroll down, click **Generate token**
6. **Copy the token** (starts with `ghp_`). Don’t close the page until you’ve used it. No spaces before or after when you paste.

## Step 3: Push again

```bash
cd /Users/rodd/Documents/happy-traveler
git push -u origin main
```

- **Username:** `htg2026` (all lowercase)
- **Password:** paste your **new token** (nothing will show). Press Enter.

If it still says 403, tell me and we’ll try putting the token in the URL instead.
