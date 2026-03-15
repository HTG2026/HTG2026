import { NextRequest, NextResponse } from "next/server";
import { setTikTokFeed } from "@/lib/redis";

const FALLBACK_URLS = [
  "https://www.tiktok.com/@disneyparks/video/7387826342689099039",
  "https://www.tiktok.com/@see.wdw/video/7414624446197075231",
  "https://www.tiktok.com/@sobrizzle/video/7369772085859732778",
  "https://www.tiktok.com/@thatchipperbunch/video/7444188965017554206",
];

async function scrapeTikTokOrlando(): Promise<string[]> {
  const apiKey = process.env.SCRAPECREATORS_API_KEY;

  if (apiKey) {
    try {
      const res = await fetch(
        `https://api.scrapecreators.com/v1/tiktok/hashtag?tag=OrlandoFlorida&country=US&count=10`,
        {
          headers: { "x-api-key": apiKey },
        }
      );
      if (res.ok) {
        const data = await res.json();
        const urls =
          data?.videos?.map?.(
            (v: { url?: string; videoUrl?: string }) => v.url || v.videoUrl
          )?.filter(Boolean) || [];
        if (urls.length > 0) return urls.slice(0, 8);
      }
    } catch {
      // fall through to fallback
    }
  }

  // Add more scrapers here (e.g. Apify, RapidAPI). See README.
  return FALLBACK_URLS;
}

export async function GET(request: NextRequest) {
  // Verify cron secret (Vercel sends this)
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    const userAgent = request.headers.get("user-agent") || "";
    if (!userAgent.includes("vercel-cron")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  try {
    const urls = await scrapeTikTokOrlando();
    await setTikTokFeed(urls);
    return NextResponse.json({ ok: true, count: urls.length });
  } catch (e) {
    console.error("TikTok scrape error:", e);
    return NextResponse.json(
      { error: "Scrape failed", message: String(e) },
      { status: 500 }
    );
  }
}
