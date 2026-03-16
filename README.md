# Happy Traveler

A Next.js travel site with Tailwind CSS. Includes pages for Home, Destinations, Blog, Flight Tracker, and Contact.

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

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pages

- **Home** (`/`) – Landing and quick links
- **Destinations** (`/destinations`) – Browse regions
- **Blog** (`/blog`) – Travel stories and guides
- **Flight Tracker** (`/flight-tracker`) – Track flights (UI ready; connect an API for live data)
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
