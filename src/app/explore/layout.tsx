import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore Central Florida — Restaurants, Experiences, Live Events",
  description: "Central Florida restaurants, bars, museums, activities, and live events. 40+ curated spots. Orlando, Kissimmee, Lake Buena Vista, Winter Park, Baldwin Park, Dr Phillips, I-Drive.",
  openGraph: {
    title: "Explore Central Florida — Restaurants & Experiences | The Happy Traveler",
    description: "Editor's picks, hidden bars, airboat tours, and local Central Florida spots.",
  },
};

export default function ExploreLayout({
  children,
}: { children: React.ReactNode }) {
  return children;
}
