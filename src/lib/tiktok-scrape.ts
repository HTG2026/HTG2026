/**
 * Scrape TikTok for "what to do in Orlando" style videos via ScrapeCreators.
 * Merges keyword search (most-liked) + popular hashtags, dedupes, ranks by plays/likes.
 */

import { TIKTOK_FALLBACK_URLS } from "@/data/tiktok-fallbacks";

const API = "https://api.scrapecreators.com";

/** Keyword searches — natural "things to do" phrasing */
const KEYWORD_QUERIES = [
  "what to do in Orlando",
  "things to do Orlando Florida",
  "Orlando vacation ideas",
];

/** Hashtags (no #) — travel / activities */
const HASHTAGS = [
  "thingstodoinorlando",
  "orlandothings",
  "orlandoactivities",
  "visitorlando",
  "orlandotravel",
];

const OUTPUT_COUNT = 8;

type Scored = { url: string; score: number; id: string };

function normalizeTikTokUrl(raw: string): string | null {
  if (!raw || !raw.includes("tiktok.com")) return null;
  try {
    const u = new URL(raw);
    const m = u.pathname.match(/\/@([^/]+)\/video\/(\d+)/);
    if (m) return `https://www.tiktok.com/@${m[1]}/video/${m[2]}`;
  } catch {
    /* ignore */
  }
  return null;
}

function videoIdFromUrl(url: string): string {
  const m = url.match(/\/video\/(\d+)/);
  return m?.[1] || url;
}

/** Prefer canonical URL from share_link; fall back to @handle/video/id from API fields. */
function buildTikTokVideoUrl(
  shareUrl: string | undefined,
  awemeId: string | undefined,
  authorUniqueId: string | undefined
): string | null {
  if (shareUrl) {
    const n = normalizeTikTokUrl(shareUrl);
    if (n) return n;
  }
  if (awemeId && authorUniqueId) {
    return `https://www.tiktok.com/@${authorUniqueId}/video/${awemeId}`;
  }
  return null;
}

/** ScrapeCreators keyword search — sort_by most-liked for "best" videos */
async function fetchKeywordVideos(
  apiKey: string,
  query: string
): Promise<Scored[]> {
  const params = new URLSearchParams({
    query,
    sort_by: "most-liked",
    region: "US",
    date_posted: "last-6-months",
    trim: "true",
  });
  const res = await fetch(`${API}/v1/tiktok/search/keyword?${params}`, {
    headers: { "x-api-key": apiKey },
  });
  if (!res.ok) return [];
  const data = (await res.json()) as {
    search_item_list?: Array<{
      aweme_info?: {
        share_url?: string;
        aweme_id?: string;
        author?: { unique_id?: string };
        statistics?: {
          aweme_id?: string;
          play_count?: number;
          digg_count?: number;
        };
      };
    }>;
  };
  const list = data.search_item_list || [];
  const out: Scored[] = [];
  for (const item of list) {
    const info = item.aweme_info;
    if (!info) continue;
    const awemeId = info.aweme_id || info.statistics?.aweme_id;
    const url = buildTikTokVideoUrl(
      info.share_url,
      awemeId,
      info.author?.unique_id
    );
    if (!url) continue;
    const play = info.statistics?.play_count ?? 0;
    const digg = info.statistics?.digg_count ?? 0;
    const id = awemeId || videoIdFromUrl(url);
    out.push({ url, id, score: play + digg * 10 });
  }
  return out;
}

/**
 * ScrapeCreators: GET /v1/tiktok/search/hashtag (not /v1/tiktok/hashtag).
 * Response uses `aweme_list` with full aweme objects (share_url, statistics, author).
 */
async function fetchHashtagVideos(
  apiKey: string,
  tag: string
): Promise<Scored[]> {
  const params = new URLSearchParams({
    hashtag: tag,
    region: "US",
    trim: "true",
  });
  const res = await fetch(`${API}/v1/tiktok/search/hashtag?${params}`, {
    headers: { "x-api-key": apiKey },
  });
  if (!res.ok) return [];
  const data = (await res.json()) as {
    aweme_list?: Array<{
      share_url?: string;
      author?: { unique_id?: string };
      statistics?: {
        aweme_id?: string;
        play_count?: number;
        digg_count?: number;
      };
    }>;
  };
  const list = data.aweme_list || [];
  const out: Scored[] = [];
  for (const item of list) {
    const awemeId = item.statistics?.aweme_id;
    const url = buildTikTokVideoUrl(
      item.share_url,
      awemeId,
      item.author?.unique_id
    );
    if (!url) continue;
    const play = item.statistics?.play_count ?? 0;
    const digg = item.statistics?.digg_count ?? 0;
    const id = awemeId || videoIdFromUrl(url);
    out.push({ url, id, score: play + digg * 10 });
  }
  return out;
}

function mergeAndRank(candidates: Scored[]): string[] {
  const byId = new Map<string, Scored>();
  for (const c of candidates) {
    const prev = byId.get(c.id);
    if (!prev || c.score > prev.score) byId.set(c.id, c);
  }
  const sorted = [...byId.values()].sort((a, b) => b.score - a.score);
  return sorted.slice(0, OUTPUT_COUNT).map((c) => c.url);
}

/**
 * Returns up to 8 TikTok video URLs for the home carousel.
 */
export async function scrapeOrlandoThingsToDo(): Promise<string[]> {
  const apiKey = process.env.SCRAPECREATORS_API_KEY;
  if (!apiKey) return [...TIKTOK_FALLBACK_URLS];

  const batches = await Promise.all([
    ...KEYWORD_QUERIES.map((q) => fetchKeywordVideos(apiKey, q)),
    ...HASHTAGS.map((t) => fetchHashtagVideos(apiKey, t)),
  ]);

  const flat = batches.flat();
  const urls = mergeAndRank(flat);
  if (urls.length >= 4) return urls;
  if (urls.length > 0) {
    const seen = new Set(urls.map(videoIdFromUrl));
    for (const f of TIKTOK_FALLBACK_URLS) {
      if (urls.length >= OUTPUT_COUNT) break;
      const id = videoIdFromUrl(f);
      if (!seen.has(id)) {
        urls.push(f);
        seen.add(id);
      }
    }
    return urls.slice(0, OUTPUT_COUNT);
  }
  return [...TIKTOK_FALLBACK_URLS];
}
