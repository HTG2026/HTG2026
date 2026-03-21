"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface ShowItem {
  id: string;
  name: string;
  date: string;
  venue: string;
  price?: string;
  url: string;
  image?: string;
}

export default function ShowsPage() {
  const [shows, setShows] = useState<ShowItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/shows")
      .then((r) => r.json())
      .then((d) => {
        setShows(d.shows ?? []);
      })
      .catch(() => setShows([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="py-16 px-6 sm:px-12 max-w-6xl mx-auto bg-htbg">
      <div className="text-[.6rem] font-extrabold tracking-[3px] uppercase text-orange mb-2">
        Live Entertainment
      </div>
      <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] leading-tight mb-4 text-htdark">
        <span className="text-htdark">Shows &</span>{" "}
        <span className="text-teal">Performances</span>
      </h1>
      <p className="text-slate-600 text-lg max-w-xl mb-12">
        Dr Phillips Center, Kia Center, Hard Rock Live, House of Blues, I-Drive Live. Real dates and
        ticket links from the venues.
      </p>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-48 rounded-xl bg-slate-100 animate-pulse border border-slate-200"
            />
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {shows.map((show) => (
              <a
                key={show.id}
                href={show.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block overflow-hidden rounded-xl border border-slate-200 bg-white hover:border-teal/40 transition-all group shadow-sm"
              >
                <div className="relative aspect-[4/3] bg-slate-100">
                  {show.image && show.image.startsWith("https") ? (
                    <Image
                      src={show.image}
                      alt={show.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                      sizes="(max-width: 640px) 100vw, 33vw"
                      unoptimized
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-4xl opacity-30">
                      🎭
                    </div>
                  )}
                  <div className="absolute top-2 left-2 rounded-md bg-black/60 px-2 py-0.5 text-[0.65rem] font-bold text-white">
                    {show.venue}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-htdark group-hover:text-teal transition-colors mb-1">
                    {show.name}
                  </h3>
                  <p className="text-[0.7rem] text-slate-500 mb-2">{show.date}</p>
                  {show.price && (
                    <p className="text-[0.7rem] text-amber-700 font-medium">{show.price}</p>
                  )}
                </div>
              </a>
            ))}
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-600 mb-4">
              Venues
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <a
                href="https://www.drphillipscenter.org/events"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <span className="text-2xl">🎭</span>
                <div>
                  <div className="font-semibold text-htdark">Dr Phillips Center</div>
                  <div className="text-[0.7rem] text-slate-500">Broadway, concerts, ballet</div>
                </div>
              </a>
              <a
                href="https://www.kiacenter.com/events"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <span className="text-2xl">🏀</span>
                <div>
                  <div className="font-semibold text-htdark">Kia Center</div>
                  <div className="text-[0.7rem] text-slate-500">Magic games, concerts</div>
                </div>
              </a>
              <a
                href="https://www.hardrocklive.com/orlando/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <span className="text-2xl">🎸</span>
                <div>
                  <div className="font-semibold text-htdark">Hard Rock Live</div>
                  <div className="text-[0.7rem] text-slate-500">Concerts, comedy</div>
                </div>
              </a>
              <a
                href="https://www.houseofblues.com/orlando"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <span className="text-2xl">🎵</span>
                <div>
                  <div className="font-semibold text-htdark">House of Blues</div>
                  <div className="text-[0.7rem] text-slate-500">Concerts, brunch</div>
                </div>
              </a>
              <a
                href="https://mangostropicalcafe.com/orlando/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <span className="text-2xl">🌴</span>
                <div>
                  <div className="font-semibold text-htdark">Mango&apos;s Tropical Cafe</div>
                  <div className="text-[0.7rem] text-slate-500">I-Drive Live · Nightly shows</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      )}

      <div className="mt-12">
        <Link
          href="/plan-my-day"
          className="text-sm font-semibold text-teal hover:underline"
        >
          ← Plan My Day
        </Link>
      </div>
    </div>
  );
}
