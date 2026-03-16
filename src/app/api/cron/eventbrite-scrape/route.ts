import { NextRequest, NextResponse } from "next/server";
import { setEvents } from "@/lib/redis";
import { FALLBACK_EVENTS } from "@/data/events";

async function fetchEventbriteOrlando(): Promise<unknown[]> {
  const token = process.env.EVENTBRITE_TOKEN;
  if (!token) return [];

  try {
    // Eventbrite API: search events in Orlando
    const res = await fetch(
      "https://www.eventbriteapi.com/v3/events/search/?location.address=Orlando&location.within=50km&expand=venue",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (!res.ok) return [];

    const data = await res.json();
    const events = (data?.events || []).slice(0, 12).map((e: { name?: { text?: string }; start?: { local?: string }; venue?: { name?: string; address?: { city?: string } }; description?: { text?: string }; logo?: { url?: string }; url?: string }) => ({
      id: e.name?.text?.slice(0, 20) || "event",
      name: e.name?.text || "Event",
      date: e.start?.local ? new Date(e.start.local).toLocaleDateString() : "TBD",
      venue: e.venue?.name || "",
      area: e.venue?.address?.city || "Orlando",
      desc: (e.description?.text || "").slice(0, 80) + "...",
      image: e.logo?.url || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
      url: e.url,
    }));
    return events;
  } catch {
    return [];
  }
}

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    const ua = request.headers.get("user-agent") || "";
    if (!ua.includes("vercel-cron")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  try {
    const events = await fetchEventbriteOrlando();
    const toStore = events.length > 0 ? events : FALLBACK_EVENTS;
    await setEvents(toStore);
    return NextResponse.json({ ok: true, count: toStore.length, source: events.length ? "eventbrite" : "fallback" });
  } catch (e) {
    console.error("Eventbrite scrape error:", e);
    await setEvents(FALLBACK_EVENTS);
    return NextResponse.json({ ok: true, count: FALLBACK_EVENTS.length, source: "fallback" });
  }
}
