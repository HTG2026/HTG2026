"use client";

import { useState } from "react";

const PARKS = {
  disney: {
    name: "Disney Parks",
    emoji: "🏰",
    parks: "Magic Kingdom, Epcot, Hollywood Studios, Animal Kingdom",
    tips: [
      { icon: "⏰", title: "Rope drop 45 min early", body: "Cast members let you in before official open. Hit TRON or Tiana's first — done before the 9am wave clears security. Saves 2–3 hours vs normal entry." },
      { icon: "📱", title: "Skip Lightning Lane on short-wait rides", body: "Most rides run under 20 min at park open. LL only makes sense for TRON, Guardians, Tiana's. Never buy it for everything." },
      { icon: "🍕", title: "Pinocchio Village Haus hack", body: "$12 flatbreads with a front-row view of It's a Small World boats. Sit by the window. Zero tourists know this. No wait at 11:30am." },
    ],
  },
  universal: {
    name: "Universal Orlando",
    emoji: "🎢",
    parks: "Universal Studios, Islands of Adventure, Volcano Bay",
    tips: [
      { icon: "🎢", title: "Velocicoaster front row — just ask", body: "Ask the cast member at the merge point for front row. Usually adds only 5 min. Works 90% of the time." },
      { icon: "🍺", title: "Frozen Butterbeer > regular", body: "The cream foam changes everything. Most tourists get regular because it's first on the menu. Locals know frozen is the move." },
      { icon: "⚡", title: "On-site hotel = 1hr early entry", body: "Often better than $80 Express Pass. Early entry hits Hagrid's, Velocicoaster, and MiB before standby even opens." },
    ],
  },
  seaworld: {
    name: "SeaWorld & Busch Gardens",
    emoji: "🐬",
    parks: "SeaWorld Orlando, Busch Gardens Tampa",
    tips: [
      { icon: "🐬", title: "Dolphin feeding is free", body: "Head to the Dolphin Nursery at opening. No ticket upgrade needed. Just show up early and ask." },
      { icon: "🎢", title: "Mako back row = best air time", body: "Most underrated coaster in Orlando. Back row gives serious ejector air. Under 30 min wait." },
      { icon: "🦁", title: "Serengeti Safari at dusk", body: "Animals are 10x more active than morning tours. Book the last safari of the day." },
    ],
  },
};

export default function ThemeParks() {
  const [active, setActive] = useState<keyof typeof PARKS>("disney");
  const park = PARKS[active];

  return (
    <div className="py-16 px-6 sm:px-12 max-w-6xl mx-auto">
      <div className="text-[.6rem] font-extrabold tracking-[3px] uppercase text-orange mb-2">Best Practices</div>
      <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] leading-tight mb-4">
        <span className="text-teal">Theme Parks</span>
      </h1>
      <p className="text-white/50 text-lg max-w-xl mb-12">
        Disney, Universal, SeaWorld, and Busch Gardens — hacks, tips, and how to make the most of your day.
      </p>

      {/* Park tabs */}
      <div className="flex gap-2 mb-10 flex-wrap">
        {(Object.keys(PARKS) as (keyof typeof PARKS)[]).map((key) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            className={`px-4 py-2 rounded-full text-[.74rem] font-semibold transition-all ${
              active === key
                ? "bg-orange border-orange text-white"
                : "bg-htcard border border-white/10 text-white/50 hover:border-teal/30 hover:text-teal"
            }`}
          >
            {PARKS[key].emoji} {PARKS[key].name}
          </button>
        ))}
      </div>

      {/* Active park content */}
      <div className="p-6 rounded-xl border border-white/10 bg-htcard/50">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">{park.emoji}</span>
          <div>
            <h2 className="text-xl font-semibold text-teal">{park.name}</h2>
            <p className="text-white/40 text-sm">{park.parks}</p>
          </div>
        </div>
        <div className="space-y-6 mt-8">
          {park.tips.map((tip, i) => (
            <div key={i} className="p-4 rounded-xl border border-white/5 hover:border-orange/20 transition-colors">
              <div className="flex gap-3">
                <span className="text-xl">{tip.icon}</span>
                <div>
                  <h3 className="font-semibold mb-1">{tip.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{tip.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
