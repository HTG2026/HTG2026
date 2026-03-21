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

**Without it:** APIs are called on each request (may hit rate limits). Place photos also use Redis cache.

---

### SCRAPECREATORS_API_KEY
**Why:** Real-time TikTok hashtag scraping for #OrlandoFlorida.

**Get it:** https://scrapecreators.com/

```bash
SCRAPECREATORS_API_KEY=your_key_here
```

**Without it:** Curated TikTok URLs are used.

---

### Place Photos (Google, Yelp, Foursquare)

Add any of these to get **real photos** for restaurants, bars, and attractions instead of stock photos.

#### GOOGLE_PLACES_API_KEY
**Why:** Real business photos from Google Places (highest priority).

**Get it:** https://console.cloud.google.com/apis/credentials (enable Places API)

```bash
GOOGLE_PLACES_API_KEY=your_key_here
```

#### YELP_API_KEY
**Why:** Real business photos from Yelp (free tier).

**Get it:** https://www.yelp.com/developers/v3/manage_app

```bash
YELP_API_KEY=your_key_here
```

#### FOURSQUARE_API_KEY
**Why:** Real venue photos from Foursquare Places API.

**Get it:** https://foursquare.com/developers/signup

```bash
FOURSQUARE_API_KEY=your_key_here
```

**Order:** Google → Yelp → Foursquare. First available wins. Results cached in Redis for 7 days.

**Without any:** Static/stock images from Unsplash and Wikimedia are used.

---

## Quick Start

1. Copy `.env.example` to `.env.local`
2. Add keys for the features you want
3. Restart: `npm run dev` or `npm run build && npm run start`
