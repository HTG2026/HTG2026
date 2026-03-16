import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plan My Day — AI Orlando Itinerary Builder",
  description: "Build your perfect Orlando day. Pick party size, vibe (theme parks, local, nightlife), and budget. Get real itineraries with Magical Dining, Disney hacks, and hidden spots.",
  openGraph: {
    title: "Plan My Day — AI Orlando Itinerary Builder | The Happy Traveler",
    description: "Build your perfect Orlando day. Real restaurants, theme park tips, and local experiences.",
  },
};

export default function PlanMyDayLayout({
  children,
}: { children: React.ReactNode }) {
  return children;
}
