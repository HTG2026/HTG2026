import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orlando Map — GTA-Style by Region",
  description:
    "Explore Orlando on a GTA-style map. Kissimmee, I-Drive, Dr Phillips, Winter Park, Baldwin Park, Downtown. Click markers to reserve tables or book experiences.",
  openGraph: {
    title: "Orlando Map — GTA-Style by Region | The Happy Traveler",
    description:
      "Explore Orlando by region. Click any spot to reserve or book.",
  },
};

export default function MapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
