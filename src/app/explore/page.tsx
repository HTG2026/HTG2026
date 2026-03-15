"use client";

import { useState } from "react";
import PlaceCard from "../components/PlaceCard";

const CATEGORIES = [
  { id: "all", label: "All", emoji: "🗺️" },
  { id: "restaurants", label: "Restaurants", emoji: "🍽️" },
  { id: "experiences", label: "Experiences", emoji: "🎯" },
  { id: "museums", label: "Museums", emoji: "🏛️" },
  { id: "bars", label: "Bars & Nightlife", emoji: "🍹" },
  { id: "activities", label: "Activities", emoji: "🎢" },
];

const SORT_OPTIONS = [
  { id: "rating", label: "Highest rated" },
  { id: "reviews", label: "Most reviewed" },
  { id: "popular", label: "Popular" },
];

const BUSINESSES = [
  {
    name: "Pho Hoa Hiep",
    type: "restaurants",
    area: "Mills 50",
    desc: "Vietnamese · Hidden gem tourists never find",
    rating: 4.8,
    reviewCount: 892,
    image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=600&q=80",
    priceRange: "$$",
    badge: "Hidden Gem",
  },
  {
    name: "Bar Purgatory",
    type: "bars",
    area: "Thornton Park",
    desc: "Craft cocktails · Local fave",
    rating: 4.9,
    reviewCount: 340,
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&q=80",
    priceRange: "$$",
    badge: "Local Fave",
  },
  {
    name: "Hunger Street Tacos",
    type: "restaurants",
    area: "Dr Phillips",
    desc: "Mexican · Trending",
    rating: 4.7,
    reviewCount: 1243,
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&q=80",
    priceRange: "$",
    badge: "Trending",
  },
  {
    name: "Lineage Coffee",
    type: "restaurants",
    area: "Winter Park",
    desc: "Café · Local fave",
    rating: 4.8,
    reviewCount: 567,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80",
    priceRange: "$",
    badge: "Local Fave",
  },
  {
    name: "The Venue",
    type: "bars",
    area: "Ivanhoe",
    desc: "Gallery + Bar · Local fave",
    rating: 4.5,
    reviewCount: 189,
    image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600&q=80",
    priceRange: "$$",
    badge: "Local Fave",
  },
  {
    name: "Boggy Creek Airboat Adventures",
    type: "experiences",
    area: "Kissimmee",
    desc: "Airboat tours · Gator spotting",
    rating: 4.7,
    reviewCount: 2147,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80",
    priceRange: "$$$",
    badge: "Viral",
  },
  {
    name: "Kennedy Space Center",
    type: "experiences",
    area: "Cocoa Beach",
    desc: "Rocket launches & exhibits",
    rating: 4.9,
    reviewCount: 4521,
    image: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=600&q=80",
    priceRange: "$$$",
    badge: "Must See",
  },
  {
    name: "Orlando Museum of Art",
    type: "museums",
    area: "Loch Haven",
    desc: "Art · First Thursdays",
    rating: 4.5,
    reviewCount: 423,
    image: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=600&q=80",
    priceRange: "$$",
  },
  {
    name: "Lake Baldwin Walk",
    type: "activities",
    area: "Baldwin Park",
    desc: "Trail · Free, scenic",
    rating: 4.8,
    reviewCount: 312,
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80",
    priceRange: "Free",
    badge: "Free",
  },
  {
    name: "Graffiti Junktion",
    type: "restaurants",
    area: "Audubon Park",
    desc: "Burgers · Hidden gem",
    rating: 4.6,
    reviewCount: 678,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80",
    priceRange: "$",
    badge: "Hidden Gem",
  },
];

export default function Explore() {
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("rating");
  const [search, setSearch] = useState("");

  let filtered =
    filter === "all"
      ? BUSINESSES
      : BUSINESSES.filter((b) => b.type === filter);

  if (search.trim()) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (b) =>
        b.name.toLowerCase().includes(q) ||
        b.area.toLowerCase().includes(q) ||
        b.desc.toLowerCase().includes(q)
    );
  }

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "rating") return b.rating - a.rating;
    if (sort === "reviews") return b.reviewCount - a.reviewCount;
    return b.reviewCount - a.reviewCount; // popular
  });

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="py-12 px-6 sm:px-12 border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-[.6rem] font-extrabold tracking-[3px] uppercase text-orange mb-2">
            Local Businesses
          </div>
          <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] leading-tight mb-4">
            <span className="text-teal">Explore</span>
          </h1>
          <p className="text-white/50 text-lg max-w-xl mb-8">
            Restaurants, experiences, museums, bars, and activities — curated for tourists by locals. Orlando, Cocoa, Tampa & beyond.
          </p>

          {/* Search bar — TripAdvisor-style */}
          <div className="max-w-2xl">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-lg">🔍</span>
              <input
                type="text"
                placeholder="Search restaurants, experiences, neighborhoods…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/5 border border-white/15 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder:text-white/35 text-[.95rem] outline-none focus:border-teal/50 focus:ring-1 focus:ring-teal/30 transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Sticky filter bar */}
      <div className="sticky top-16 z-50 py-3 px-6 sm:px-12 bg-htdark/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 sm:pb-0">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[.78rem] font-semibold whitespace-nowrap shrink-0 transition-all ${
                  filter === cat.id
                    ? "bg-teal text-white border border-teal"
                    : "bg-htcard border border-white/10 text-white/55 hover:border-teal/40 hover:text-teal"
                }`}
              >
                {cat.emoji} {cat.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[.7rem] text-white/40 font-medium">Sort by</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-htcard border border-white/10 rounded-lg py-2 px-3 text-[.8rem] font-medium text-white outline-none focus:border-teal/50 cursor-pointer"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="py-10 px-6 sm:px-12">
        <div className="max-w-6xl mx-auto">
          <p className="text-[.8rem] text-white/45 mb-6">
            {sorted.length} {sorted.length === 1 ? "place" : "places"} found
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sorted.map((b) => (
              <PlaceCard
                key={b.name}
                name={b.name}
                area={b.area}
                desc={b.desc}
                rating={b.rating}
                reviewCount={b.reviewCount}
                image={b.image}
                category={b.type.charAt(0).toUpperCase() + b.type.slice(1)}
                priceRange={b.priceRange}
                badge={b.badge}
                href="#"
              />
            ))}
          </div>
          {sorted.length === 0 && (
            <div className="text-center py-16 text-white/50">
              <p className="text-lg font-medium mb-2">No places found</p>
              <p className="text-sm">Try a different search or category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
