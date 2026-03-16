import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore Orlando — Restaurants, Experiences, Events",
  description: "Orlando restaurants, Magical Dining, bars, museums, activities, and Eventbrite events. 40+ curated spots in Central Florida.",
  openGraph: {
    title: "Explore Orlando — Restaurants & Experiences | The Happy Traveler",
    description: "Magical Dining restaurants, hidden bars, airboat tours, and local Orlando spots.",
  },
};

export default function ExploreLayout({
  children,
}: { children: React.ReactNode }) {
  return children;
}
