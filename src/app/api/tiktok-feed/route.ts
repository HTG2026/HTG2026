import { NextResponse } from "next/server";
import { getTikTokFeed } from "@/lib/redis";

const FALLBACK_URLS = [
  "https://www.tiktok.com/@disneyparks/video/7387826342689099039",
  "https://www.tiktok.com/@see.wdw/video/7414624446197075231",
  "https://www.tiktok.com/@sobrizzle/video/7369772085859732778",
  "https://www.tiktok.com/@thatchipperbunch/video/7444188965017554206",
];

export async function GET() {
  try {
    const urls = await getTikTokFeed();
    return NextResponse.json({
      urls: urls && urls.length > 0 ? urls : FALLBACK_URLS,
      source: urls?.length ? "cache" : "fallback",
    });
  } catch {
    return NextResponse.json({ urls: FALLBACK_URLS, source: "fallback" });
  }
}
