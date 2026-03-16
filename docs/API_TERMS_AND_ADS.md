# API Terms & Ad-Supported Site

You plan to sell ads on the site. Here’s how each API/service treats that.

## ⚠️ Action required

### Open-Meteo (Weather)
**Free tier: non-commercial only.**  
Their terms say: *"operating websites with subscriptions or advertising"* is not allowed on the free tier.

**Options:**
1. **Switch to WeatherAPI.com** – Free tier allows commercial use. Add `WEATHERAPI_KEY` (free at weatherapi.com).
2. **Switch to NOAA Weather.gov** – US government data, generally free for commercial use, no key.
3. **Open-Meteo paid plan** – If you prefer to keep Open-Meteo.

---

## ✅ Likely fine

### Eventbrite
API is for displaying public events and linking to Eventbrite. General ToS restricts “scraping or commercial use of site content,” but using the API to show events and link to tickets is the intended use. Ads on the rest of the site are typically acceptable. **Recommendation:** Confirm with Eventbrite if you want certainty.

### Ticketmaster Discovery API
Free tier terms are unclear on ad-supported sites. Many travel/event sites use it with ads. **Recommendation:** Use it; if they object, you can fall back to Eventbrite + curated list.

### Upstash Redis
Standard infrastructure ToS. No known restrictions for ad-supported sites.

### ScrapeCreators (TikTok)
Pay-as-you-go; no clear restriction on ad-supported sites in public docs. **Recommendation:** Treat as fine unless they say otherwise.

---

## Summary

| Service        | Ads OK?        | Action                                      |
|----------------|----------------|---------------------------------------------|
| Open-Meteo     | ❌ Free tier   | Switch to WeatherAPI.com or NOAA            |
| Eventbrite     | ✅ Likely      | No change; confirm if concerned             |
| Ticketmaster   | ⚠️ Gray area   | Use; have fallback ready                    |
| Upstash Redis  | ✅ Yes         | No change                                   |
| ScrapeCreators | ✅ Likely      | No change                                   |
