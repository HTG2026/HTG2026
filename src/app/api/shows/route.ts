import { NextResponse } from "next/server";
import { getEvents } from "@/lib/redis";
import { SHOWS_FALLBACK } from "@/data/shows";

export interface ShowItem {
  id: string;
  name: string;
  date: string;
  venue: string;
  venueId: string;
  price?: string;
  url: string;
  image?: string;
}

export async function GET() {
  try {
    const key = process.env.TICKETMASTER_API_KEY;
    const shows: ShowItem[] = [];

    if (key) {
      const venueIds = [
        "KovZpZAJd1eA", // Dr Phillips Center Orlando
        "KovZpZAev1e1", // Kia Center Orlando
        "KovZpZAE6e1A", // Hard Rock Live Orlando
      ];
      for (const vid of venueIds) {
        try {
          const res = await fetch(
            `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${key}&venueId=${vid}&size=10&sort=date,asc`
          );
          const data = (await res.json()) as {
            _embedded?: { events?: Array<{
              id?: string;
              name?: string;
              dates?: { start?: { localDate?: string; localTime?: string } };
              priceRanges?: Array<{ min?: number; max?: number }>;
              url?: string;
              images?: Array<{ url?: string }>;
              _embedded?: { venues?: Array<{ name?: string }> };
            }> };
          };
          const events = data?._embedded?.events ?? [];
          for (const e of events) {
            const start = e.dates?.start;
            const dateStr = start?.localDate
              ? start.localTime
                ? `${start.localDate} ${start.localTime.slice(0, 5)}`
                : start.localDate
              : "TBD";
            const pr = e.priceRanges?.[0];
            const price =
              pr?.min != null && pr?.max != null
                ? `$${pr.min}–$${pr.max}`
                : pr?.min != null
                  ? `From $${pr.min}`
                  : undefined;
            shows.push({
              id: e.id ?? String(Math.random()),
              name: e.name ?? "Event",
              date: dateStr,
              venue: e._embedded?.venues?.[0]?.name ?? "Orlando",
              venueId: vid,
              price,
              url: e.url ?? "#",
              image: e.images?.[0]?.url,
            });
          }
        } catch {
          // Skip venue on error
        }
      }
    }

    if (shows.length === 0) {
      const eventbrite = await getEvents?.();
      const ebEvents = Array.isArray(eventbrite)
        ? eventbrite
            .filter((e: unknown) => {
              const o = e as { venue?: string };
              return /dr phillips|kia center|hard rock|house of blues|i-drive|orlando/i.test(
                String(o?.venue ?? "")
              );
            })
            .slice(0, 12)
            .map((e: unknown) => {
              const o = e as Record<string, unknown>;
              return {
              id: String(o.id ?? o.name ?? Math.random()),
                name: String(o.name ?? "Event"),
                date: String(o.date ?? "TBD"),
                venue: String(o.venue ?? "Orlando"),
                venueId: "eventbrite",
                price: o.price as string | undefined,
                url: (o.url as string) ?? "#",
                image: o.image as string | undefined,
              };
            })
        : [];
      const combined = [...ebEvents, ...SHOWS_FALLBACK].slice(0, 15);
      return NextResponse.json({ shows: combined, source: "fallback" });
    }

    shows.sort((a, b) => a.date.localeCompare(b.date));
    return NextResponse.json({ shows: shows.slice(0, 20), source: "ticketmaster" });
  } catch (e) {
    return NextResponse.json(
      { shows: SHOWS_FALLBACK, source: "fallback", error: String(e) }
    );
  }
}
