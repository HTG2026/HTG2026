# Happy Traveler

A Next.js travel site with Tailwind CSS. Includes pages for Home, Destinations, Blog, Flight Tracker, and Contact.

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

2. **ScrapeCreators** (optional) – For real TikTok hashtag scraping, add `SCRAPECREATORS_API_KEY` to your env. Without it, the carousel uses a curated fallback list.

3. **Deploy to Vercel** – The cron runs automatically at `0 */6 * * *` (every 6 hours).

### Manual trigger

Call `GET /api/cron/tiktok-scrape` to run the scraper manually (e.g. for testing).
