# Push using SSH (no token needed)

Do these in order.

---

## Step 1: Create an SSH key

In **Terminal**, run (use your real email):

```bash
ssh-keygen -t ed25519 -C "your-email@example.com" -f ~/.ssh/id_ed25519 -N ""
```

Replace `your-email@example.com` with your email. The `-N ""` means no passphrase so you won’t be asked for one.

---

## Step 2: Copy your public key

Run:

```bash
cat ~/.ssh/id_ed25519.pub
```

The terminal will show a long line starting with `ssh-ed25519`. **Select and copy the whole line** (triple-click or Cmd+A in the terminal, then Cmd+C).

---

## Step 3: Add the key to GitHub

1. Open: **https://github.com/settings/keys**
2. Click **“New SSH key”**.
3. **Title:** type `Mac` (or anything you like).
4. **Key:** paste the line you copied.
5. Click **“Add SSH key”**.

---

## Step 4: Push

In Terminal:

```bash
cd /Users/rodd/Documents/happy-traveler
git push -u origin main
```

The first time it may say “Are you sure you want to continue connecting?” — type `yes` and press Enter. No username or password is needed.

Your code will be at: **https://github.com/HTG2026/HTG2026**
