# Happy Traveler

A Next.js travel site with Tailwind CSS. Includes pages for Home, Explore, Theme Parks, Tips & Guides, Plan My Day, Map, Live Shows, and Contact.

## Deploy (one-time setup)

**Option A: One-click deploy**

1. Go to **[vercel.com/new](https://vercel.com/new)**
2. Sign in with **GitHub**
3. Click **Import** next to `HTG2026/HTG2026` (or paste `https://github.com/HTG2026/HTG2026`)
4. Click **Deploy** — no config needed
5. Wait ~2 min. Your site URL will be `https://[project-name].vercel.app`

**Option B: CLI**

```bash
npm i -g vercel
vercel login    # opens browser — sign in with GitHub
vercel --prod   # deploys and prints your URL
```

## Getting started

Install dependencies:

```bash
npm install
```

**Run the site:**

```bash
# Option 1: Production (most reliable)
npm run serve
# Opens at http://localhost:3005

# Option 2: Dev server (hot reload)
npm run dev
# Opens at http://localhost:3000 (or 3001/3002 if port is in use)
```

If the dev server shows errors (EMFILE, 404s, or webpack issues), use `npm run serve` instead.

## Pages

- **Home** (`/`) – Landing and quick links
- **Explore** (`/explore`) – Restaurants, experiences, live events
- **Theme Parks** (`/theme-parks`) – Disney, Universal, SeaWorld tips
- **Tips & Guides** (`/tips-guides`) – Vacation guides (coming soon)
- **Plan My Day** (`/plan-my-day`) – Chatbot itinerary builder
- **Map** (`/map`) – GTA-style Orlando map
- **Live Shows** (`/shows`) – Dr Phillips, Kia Center, Hard Rock
- **Contact** (`/contact`) – Contact form

## Scripts

- `npm run dev` – Start dev server (Turbopack)
- `npm run build` – Build for production
- `npm run start` – Start production server
- `npm run lint` – Run ESLint

## TikTok Carousel Scraper

The home page TikTok carousel updates every **6 hours** via a Vercel cron job.

### Setup (for live scraping)

1. **Upstash Redis** – Add the [Upstash Redis integration](https://vercel.com/integrations/upstash) in your Vercel project. This stores the scraped video URLs.

2. **API Keys** – See [docs/SETUP_API_KEYS.md](docs/SETUP_API_KEYS.md) for WEATHERAPI_KEY (required for ads), TICKETMASTER_API_KEY, and more.

3. **Eventbrite** (optional) – Add `EVENTBRITE_TOKEN` for live Orlando events. Get a token at [eventbrite.com/platform/api](https://www.eventbrite.com/platform/api/).

4. **Deploy to Vercel** – The cron runs automatically at `0 */6 * * *` (every 6 hours).

### Manual trigger

Call `GET /api/cron/tiktok-scrape` to run the scraper manually (e.g. for testing).
