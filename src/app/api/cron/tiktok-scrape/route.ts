import { NextRequest, NextResponse } from "next/server";
import { setTikTokFeed } from "@/lib/redis";
import { scrapeOrlandoThingsToDo } from "@/lib/tiktok-scrape";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    const userAgent = request.headers.get("user-agent") || "";
    if (!userAgent.includes("vercel-cron")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  try {
    const urls = await scrapeOrlandoThingsToDo();
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
