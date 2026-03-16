export default function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "The Happy Traveler",
    description: "Central Florida's insider guide. Orlando, Cocoa, Tampa. Real park hacks, hidden spots, Magical Dining, and local knowledge.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://happy-traveler.vercel.app",
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
