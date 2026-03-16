import { NextResponse } from "next/server";
import { getEvents } from "@/lib/redis";
import { FALLBACK_EVENTS, type EventItem } from "@/data/events";

function normalizeEvent(e: unknown): EventItem {
  const o = e as Record<string, unknown>;
  return {
    id: String(o?.id ?? o?.name ?? Math.random()),
    name: String(o?.name ?? "Event"),
    date: String(o?.date ?? "TBD"),
    venue: String(o?.venue ?? ""),
    area: String(o?.area ?? "Orlando"),
    desc: String(o?.desc ?? ""),
    image: String(o?.image ?? "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80"),
    price: o?.price as string | undefined,
    url: o?.url as string | undefined,
  };
}

export async function GET() {
  try {
    const raw = await getEvents();
    const events =
      raw && Array.isArray(raw) && raw.length > 0
        ? raw.map(normalizeEvent)
        : FALLBACK_EVENTS;
    return NextResponse.json({
      events,
      source: raw?.length ? "cache" : "fallback",
    });
  } catch {
    return NextResponse.json({
      events: FALLBACK_EVENTS,
      source: "fallback",
    });
  }
}
