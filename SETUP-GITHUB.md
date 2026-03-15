# Push Happy Traveler to GitHub

Run these commands in your terminal from the project folder. You need **Git** and **Node.js** installed.

## 1. Install dependencies and verify the app

```bash
cd /Users/rodd/Documents/happy-traveler
npm install
npm run dev
```

Open http://localhost:3000, then stop the server (Ctrl+C).

## 2. Create the repo on GitHub

- Go to [github.com/new](https://github.com/new)
- Repository name: **happy-traveler**
- Leave "Add a README" **unchecked** (we already have one)
- Click **Create repository**

## 3. Init git and push

In the same project folder:

```bash
git init
git add .
git commit -m "Initial commit: Happy Traveler Next.js app with Tailwind and pages"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/happy-traveler.git
git push -u origin main
```

Replace **YOUR_USERNAME** with your GitHub username.

If you use SSH:

```bash
git remote add origin git@github.com:YOUR_USERNAME/happy-traveler.git
git push -u origin main
```

Done. Your code will be at `https://github.com/YOUR_USERNAME/happy-traveler`.

### Alternative: GitHub CLI

If you use [GitHub CLI](https://cli.github.com/) (`gh`):

```bash
git init
git add .
git commit -m "Initial commit: Happy Traveler Next.js app with Tailwind and pages"
gh repo create happy-traveler --source=. --push
```
