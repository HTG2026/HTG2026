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

const EVENTS_KEY = "happy-traveler:events";

export async function getEvents(): Promise<unknown[] | null> {
  if (!redis) return null;
  try {
    const data = await redis.get<unknown[]>(EVENTS_KEY);
    return data;
  } catch {
    return null;
  }
}

export async function setEvents(events: unknown[]): Promise<void> {
  if (!redis) return;
  try {
    await redis.set(EVENTS_KEY, events, { ex: 60 * 60 * 24 }); // 24hr TTL
  } catch {
    // ignore
  }
}

const PLACE_PHOTO_KEY_PREFIX = "happy-traveler:place-photo:";

function placePhotoCacheKey(name: string, area: string): string {
  const slug = `${name}|${area}`.toLowerCase().replace(/[^a-z0-9|]/g, "-");
  return `${PLACE_PHOTO_KEY_PREFIX}${slug}`;
}

export async function getPlacePhoto(name: string, area: string): Promise<string | null> {
  if (!redis) return null;
  try {
    const data = await redis.get<string>(placePhotoCacheKey(name, area));
    return data;
  } catch {
    return null;
  }
}

export async function setPlacePhoto(name: string, area: string, url: string): Promise<void> {
  if (!redis) return;
  try {
    await redis.set(placePhotoCacheKey(name, area), url, { ex: 60 * 60 * 24 * 7 }); // 7 day TTL
  } catch {
    // ignore
  }
}
