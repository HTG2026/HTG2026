import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plan My Day — Chatbot Central Florida Itinerary Builder",
  description: "Build your perfect Central Florida day. Pick party size, vibe (theme parks, local, nightlife), and budget. Get real itineraries with Disney hacks and hidden spots.",
  openGraph: {
    title: "Plan My Day — Chatbot Central Florida Itinerary Builder | The Happy Traveler",
    description: "Build your perfect Central Florida day. Real restaurants, theme park tips, and local experiences.",
  },
};

export default function PlanMyDayLayout({
  children,
}: { children: React.ReactNode }) {
  return children;
}
