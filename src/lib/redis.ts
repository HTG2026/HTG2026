import { Redis } from "@upstash/redis";

const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null;

const TIKTOK_FEED_KEY = "happy-traveler:tiktok-feed";

export async function getTikTokFeed(): Promise<string[] | null> {
  if (!redis) return null;
  try {
    const data = await redis.get<string[]>(TIKTOK_FEED_KEY);
    return data;
  } catch {
    return null;
  }
}

export async function setTikTokFeed(urls: string[]): Promise<void> {
  if (!redis) return;
  try {
    await redis.set(TIKTOK_FEED_KEY, urls, { ex: 60 * 60 * 24 * 7 }); // 7 day TTL
  } catch {
    // ignore
  }
}
