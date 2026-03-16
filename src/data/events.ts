export interface EventItem {
  id: string;
  name: string;
  date: string;
  venue: string;
  area: string;
  desc: string;
  image: string;
  price?: string;
  url?: string;
}

// Fallback events when Eventbrite API not configured
export const FALLBACK_EVENTS: EventItem[] = [
  {
    id: "1",
    name: "Food & Wine Festival",
    date: "Ongoing",
    venue: "Epcot",
    area: "Disney",
    desc: "Global cuisines · Wine tastings · Live music",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80",
    price: "Included with park",
  },
  {
    id: "2",
    name: "Art in the Park",
    date: "First Sunday monthly",
    venue: "Lake Eola",
    area: "Downtown Orlando",
    desc: "Local artists · Crafts · Live music",
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600&q=80",
    price: "Free",
  },
  {
    id: "3",
    name: "Orlando Farmers Market",
    date: "Sundays 10am–3pm",
    venue: "Lake Eola",
    area: "Downtown Orlando",
    desc: "Local produce · Food trucks · Crafts",
    image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600&q=80",
    price: "Free",
  },
  {
    id: "4",
    name: "Rocket Launch Viewing",
    date: "Check schedule",
    venue: "Kennedy Space Center",
    area: "Cocoa Beach",
    desc: "SpaceX · NASA · Night launches",
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=600&q=80",
    price: "Free (off-site)",
  },
  {
    id: "5",
    name: "Winter Park Art Festival",
    date: "March annually",
    venue: "Central Park",
    area: "Winter Park",
    desc: "Juried art · 200+ artists · Food",
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600&q=80",
    price: "Free",
  },
  {
    id: "6",
    name: "Halloween Horror Nights",
    date: "Sept–Oct",
    venue: "Universal Studios",
    area: "Universal",
    desc: "Haunted houses · Scare zones",
    image: "https://images.unsplash.com/photo-1508385082359-f38ae991e8f2?w=600&q=80",
    price: "$$",
  },
  {
    id: "7",
    name: "Festival of the Masters",
    date: "November",
    venue: "Disney Springs",
    area: "Disney",
    desc: "Fine art · Live entertainment",
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600&q=80",
    price: "Free",
  },
  {
    id: "8",
    name: "Baldwin Park Food Truck Bazaar",
    date: "Fridays",
    venue: "Baldwin Park",
    area: "Baldwin Park",
    desc: "Food trucks · Live music · Family",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80",
    price: "Free entry",
  },
  {
    id: "9",
    name: "Cocoa Beach Art Show",
    date: "Monthly",
    venue: "Cocoa Beach Pier",
    area: "Cocoa Beach",
    desc: "Local artists · Ocean views",
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600&q=80",
    price: "Free",
  },
];
