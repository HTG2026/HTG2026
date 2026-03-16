"use client";

import { useState, useEffect } from "react";
import PlaceCard from "../components/PlaceCard";
import EventCard from "../components/EventCard";
import { PLACES } from "@/data/places";
import type { EventItem } from "@/data/events";

const CATEGORIES = [
  { id: "all", label: "All", emoji: "🗺️" },
  { id: "restaurants", label: "Restaurants", emoji: "🍽️" },
  { id: "experiences", label: "Experiences", emoji: "🎯" },
  { id: "museums", label: "Museums", emoji: "🏛️" },
  { id: "bars", label: "Bars & Nightlife", emoji: "🍹" },
  { id: "activities", label: "Activities", emoji: "🎢" },
  { id: "events", label: "Events", emoji: "🎫" },
];

const SORT_OPTIONS = [
  { id: "rating", label: "Highest rated" },
  { id: "reviews", label: "Most reviewed" },
  { id: "popular", label: "Popular" },
];

export default function Explore() {
  const [filter, setFilter] = useState<string>("all");
  const [sort, setSort] = useState("rating");
  const [search, setSearch] = useState("");
  const [events, setEvents] = useState<EventItem[]>([]);

  useEffect(() => {
    if (filter === "events") {
      fetch("/api/events")
        .then((r) => r.json())
        .then((d) => setEvents(d.events || []))
        .catch(() => setEvents([]));
    }
  }, [filter]);

  const isEvents = filter === "events";

  let filtered = isEvents
    ? []
    : filter === "all"
      ? PLACES
      : PLACES.filter((b) => b.type === filter);

  if (!isEvents && search.trim()) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (b) =>
        b.name.toLowerCase().includes(q) ||
        b.area.toLowerCase().includes(q) ||
        b.desc.toLowerCase().includes(q)
    );
  }

  const sortedPlaces = [...filtered].sort((a, b) => {
    if (sort === "rating") return b.rating - a.rating;
    if (sort === "reviews") return b.reviewCount - a.reviewCount;
    return b.reviewCount - a.reviewCount;
  });

  const filteredEvents = isEvents && search.trim()
    ? events.filter(
        (e) =>
          e.name.toLowerCase().includes(search.toLowerCase()) ||
          (e.venue || "").toLowerCase().includes(search.toLowerCase()) ||
          (e.area || "").toLowerCase().includes(search.toLowerCase())
      )
    : events;

  const totalCount = isEvents ? filteredEvents.length : sortedPlaces.length;

  return (
    <div className="min-h-screen">
      {/* Trust badges */}
      <div className="py-3 px-6 sm:px-12 bg-white/[0.02] border-b border-white/5">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-6 text-[.7rem] text-white/40">
          <span className="flex items-center gap-1.5">
            <span className="text-gold">★</span> 4.8 avg rating
          </span>
          <span>·</span>
          <span>Magical Dining® partners</span>
          <span>·</span>
          <span>Eventbrite events</span>
          <span>·</span>
          <span>Local expert curated</span>
        </div>
      </div>

      {/* Header */}
      <div className="py-12 px-6 sm:px-12 border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[.6rem] font-extrabold tracking-[3px] uppercase text-orange">
              Central Florida
            </span>
            <span className="text-[.6rem] text-white/30">·</span>
            <span className="text-[.6rem] text-gold font-semibold">Magical Dining · Eventbrite</span>
          </div>
          <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] leading-tight mb-4">
            <span className="text-teal">Explore</span>
          </h1>
          <p className="text-white/50 text-lg max-w-xl mb-8">
            Restaurants, experiences, museums, bars, and events — curated for tourists by locals. Orlando, Cocoa, Tampa & beyond.
          </p>

          <div className="max-w-2xl">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-lg">🔍</span>
              <input
                type="text"
                placeholder="Search restaurants, experiences, neighborhoods, events…"
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
          {!isEvents && (
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
          )}
        </div>
      </div>

      {/* Results */}
      <div className="py-10 px-6 sm:px-12">
        <div className="max-w-6xl mx-auto">
          <p className="text-[.8rem] text-white/45 mb-6">
            {totalCount} {isEvents ? "events" : totalCount === 1 ? "place" : "places"} found
          </p>

          {isEvents ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredEvents.map((e) => (
                <EventCard
                  key={e.id}
                  name={e.name}
                  date={e.date}
                  venue={e.venue}
                  area={e.area}
                  desc={e.desc}
                  image={e.image}
                  price={e.price}
                  url={e.url}
                />
              ))}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sortedPlaces.map((b) => (
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
                  href={b.bookUrl || "#"}
                />
              ))}
            </div>
          )}

          {totalCount === 0 && (
            <div className="text-center py-16 text-white/50">
              <p className="text-lg font-medium mb-2">
                {isEvents ? "No events found" : "No places found"}
              </p>
              <p className="text-sm">Try a different search or category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
