import { getSiteUrl } from "@/lib/site-url";

export default function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "The Happy Traveler",
    description: "Central Florida's insider guide. Orlando, Kissimmee, Lake Buena Vista, Winter Park, Baldwin Park, Dr Phillips, I-Drive. Real park hacks, hidden spots, and local knowledge.",
    url: getSiteUrl(),
    areaServed: [
      { "@type": "City", name: "Orlando", containedInPlace: { "@type": "State", name: "Florida" } },
      { "@type": "City", name: "Cocoa Beach", containedInPlace: { "@type": "State", name: "Florida" } },
      { "@type": "City", name: "Tampa", containedInPlace: { "@type": "State", name: "Florida" } },
    ],
    serviceType: ["Travel Guide", "Restaurant Recommendations", "Theme Park Tips", "Local Experiences"],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
