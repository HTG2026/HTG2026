"use client";

import { useState } from "react";
import Link from "next/link";

const RECOMMENDATIONS = [
  {
    category: "SEO & Discoverability",
    items: [
      "Add location-specific landing pages (e.g. /orlando, /cocoa-beach) for long-tail keywords.",
      "Implement FAQ schema on tips & guides for rich snippets in search.",
      "Add breadcrumb navigation with BreadcrumbList JSON-LD.",
      "Create blog content around 'Orlando Magical Dining 2025' and seasonal events.",
    ],
  },
  {
    category: "Conversion & Engagement",
    items: [
      "Add 'Save to favorites' for places — persist in localStorage or user accounts.",
      "Enable share buttons (Twitter, Pinterest) on itinerary and place cards.",
      "Add email capture for 'Get Orlando tips weekly' newsletter.",
      "Implement 'Copy itinerary' button to clipboard.",
    ],
  },
  {
    category: "Content & Data",
    items: [
      "Connect real-time Eventbrite API for live Orlando events.",
      "Add user reviews and ratings (or aggregate from Google/TripAdvisor).",
      "Integrate OpenTable/Resy for restaurant reservations.",
      "Add 'Price from' and booking links for experiences.",
    ],
  },
  {
    category: "UX & Performance",
    items: [
      "Add skeleton loaders for Explore and Plan My Day.",
      "Implement image lazy-loading with blur placeholder.",
      "Add dark/light mode toggle for accessibility.",
      "Optimize Core Web Vitals — ensure LCP < 2.5s.",
    ],
  },
  {
    category: "Monetization",
    items: [
      "Affiliate links for theme park tickets (Undercover Tourist, etc.).",
      "Partner with Magical Dining restaurants for featured placements.",
      "Scooter/rental affiliate programs.",
      "Sponsored 'Local Pick' badges for verified partners.",
    ],
  },
];

export default function AIRecommendations() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section className="py-16 px-6 sm:px-12 bg-white/[0.02] border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[.6rem] font-extrabold tracking-[3px] uppercase text-teal">AI-Powered</span>
          <span className="rounded-full bg-teal/20 px-2 py-0.5 text-[.55rem] font-bold text-teal border border-teal/30">
            SITE IMPROVEMENTS
          </span>
        </div>
        <h2 className="font-serif text-[clamp(1.5rem,2.5vw,2rem)] font-black italic leading-tight mb-2">
          Recommendations for <span className="not-italic text-teal">growth</span>
        </h2>
        <p className="text-white/50 text-sm max-w-xl mb-8">
          Actionable improvements to boost SEO, engagement, and conversions. Prioritize by impact.
        </p>

        <div className="space-y-3">
          {RECOMMENDATIONS.map((rec) => (
            <div
              key={rec.category}
              className="rounded-xl border border-white/10 bg-htcard/30 overflow-hidden"
            >
              <button
                onClick={() => setExpanded(expanded === rec.category ? null : rec.category)}
                className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-white/5 transition-colors"
              >
                <span className="font-semibold text-white">{rec.category}</span>
                <span className="text-white/40 text-lg">{expanded === rec.category ? "−" : "+"}</span>
              </button>
              {expanded === rec.category && (
                <ul className="px-4 pb-4 space-y-2">
                  {rec.items.map((item, i) => (
                    <li key={i} className="flex gap-2 text-sm text-white/60">
                      <span className="text-teal shrink-0">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <p className="mt-6 text-[.7rem] text-white/35">
          These recommendations are generated from best practices for travel sites, SEO, and conversion optimization.
        </p>
      </div>
    </section>
  );
}
