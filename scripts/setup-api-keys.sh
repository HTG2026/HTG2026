#!/bin/bash
# Setup script for Happy Traveler API keys
# Run: ./scripts/setup-api-keys.sh
# Or copy the commands below into your terminal

ENV_FILE=".env.local"

echo "Happy Traveler — API Key Setup"
echo "==============================="
echo ""

if [ ! -f "$ENV_FILE" ]; then
  touch "$ENV_FILE"
  echo "Created $ENV_FILE"
fi

echo ""
echo "Add these to $ENV_FILE (get keys from the URLs below):"
echo ""
echo "# Weather — commercial use allowed (required for ad-supported site)"
echo "# https://www.weatherapi.com/signup.aspx"
echo "WEATHERAPI_KEY="
echo ""
echo "# Live shows (Dr Phillips, Kia Center, Hard Rock Live)"
echo "# https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/"
echo "TICKETMASTER_API_KEY="
echo ""
echo "# Optional: Eventbrite for events"
echo "# https://www.eventbrite.com/platform/api/"
echo "EVENTBRITE_TOKEN="
echo ""
echo "# Optional: Upstash Redis (TikTok/events cache)"
echo "# https://vercel.com/integrations/upstash"
echo "UPSTASH_REDIS_REST_URL="
echo "UPSTASH_REDIS_REST_TOKEN="
echo ""
echo "# Optional: ScrapeCreators for TikTok #OrlandoFlorida scraping"
echo "# https://scrapecreators.com"
echo "SCRAPECREATORS_API_KEY="
echo ""
echo "After adding keys, restart: npm run dev"
