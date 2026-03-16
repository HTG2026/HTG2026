export interface ShowItem {
  id: string;
  name: string;
  date: string;
  venue: string;
  venueId?: string;
  price?: string;
  url: string;
  image?: string;
}

export const SHOWS_FALLBACK: ShowItem[] = [
  {
    id: "1",
    name: "Broadway & Concerts",
    date: "Ongoing",
    venue: "Dr Phillips Center",
    venueId: "dr-phillips",
    price: "Varies",
    url: "https://www.drphillipscenter.org/events",
  },
  {
    id: "2",
    name: "Orlando Magic Games",
    date: "Season",
    venue: "Kia Center",
    venueId: "kia-center",
    price: "From $15",
    url: "https://www.kiacenter.com/events",
  },
  {
    id: "3",
    name: "Concerts & Events",
    date: "Ongoing",
    venue: "Kia Center",
    venueId: "kia-center",
    price: "Varies",
    url: "https://www.kiacenter.com/events",
  },
  {
    id: "4",
    name: "Live Performances",
    date: "Ongoing",
    venue: "Hard Rock Live",
    venueId: "hard-rock",
    price: "Varies",
    url: "https://www.hardrocklive.com/orlando/",
  },
  {
    id: "5",
    name: "Concerts & Comedy",
    date: "Ongoing",
    venue: "House of Blues",
    venueId: "house-of-blues",
    price: "Varies",
    url: "https://www.houseofblues.com/orlando",
  },
  {
    id: "6",
    name: "Mango's Tropical Cafe",
    date: "Nightly",
    venue: "I-Drive Live",
    venueId: "i-drive-live",
    price: "From $15",
    url: "https://mangostropicalcafe.com/orlando/",
  },
];
