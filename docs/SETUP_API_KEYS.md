# API Keys Setup

Add these to `.env.local` for full functionality. All are optional except where noted for ad-supported sites.

## Required for Ad-Supported Sites

### WEATHERAPI_KEY
**Why:** Open-Meteo free tier prohibits sites with ads. WeatherAPI.com allows commercial use.

**Get it:** https://www.weatherapi.com/signup.aspx (free, 100K calls/month)

```bash
WEATHERAPI_KEY=your_key_here
```

---

## Optional (Enhance Features)

### TICKETMASTER_API_KEY
**Why:** Pulls live events with dates & prices from Dr Phillips Center, Kia Center, Hard Rock Live.

**Get it:** https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/

```bash
TICKETMASTER_API_KEY=your_key_here
```

**Without it:** Curated venue links + Eventbrite events (if configured) are shown.

---

### EVENTBRITE_TOKEN
**Why:** Live Orlando events for /explore and /api/events.

**Get it:** https://www.eventbrite.com/platform/api/

```bash
EVENTBRITE_TOKEN=your_token_here
```

**Without it:** Static fallback events are shown.

---

### UPSTASH_REDIS_REST_URL & UPSTASH_REDIS_REST_TOKEN
**Why:** Caches TikTok feed and Eventbrite events (reduces API calls).

**Get it:** https://vercel.com/integrations/upstash (or console.upstash.com)

```bash
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=...
```

**Without it:** APIs are called on each request (may hit rate limits).

---

### SCRAPECREATORS_API_KEY
**Why:** Real-time TikTok hashtag scraping for #OrlandoFlorida.

**Get it:** https://scrapecreators.com/

```bash
SCRAPECREATORS_API_KEY=your_key_here
```

**Without it:** Curated TikTok URLs are used.

---

## Quick Start

1. Copy `.env.example` to `.env.local`
2. Add keys for the features you want
3. Restart: `npm run dev` or `npm run build && npm run start`
