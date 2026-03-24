import { NextResponse } from "next/server";
import { getTikTokFeed } from "@/lib/redis";
import { TIKTOK_FALLBACK_URLS } from "@/data/tiktok-fallbacks";

export async function GET() {
  try {
    const urls = await getTikTokFeed();
    return NextResponse.json({
      urls: urls && urls.length > 0 ? urls : TIKTOK_FALLBACK_URLS,
      source: urls?.length ? "cache" : "fallback",
    });
  } catch {
    return NextResponse.json({ urls: TIKTOK_FALLBACK_URLS, source: "fallback" });
  }
}
