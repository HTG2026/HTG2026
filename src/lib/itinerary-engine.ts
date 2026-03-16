import {
  THEME_PARK_OPTIONS,
  DINING_OPTIONS,
  NIGHTLIFE_OPTIONS,
  ACTIVITY_OPTIONS,
  PRO_TIPS,
  type ItineraryStop,
} from "@/data/itinerary-data";

type Group = "solo" | "couple" | "squad" | "family";
type Vibe = "parks" | "local" | "mix" | "nightlife" | "shows";
type Budget = "under50" | "50-150" | "150-300" | "300plus";

export interface PlannerPrefs {
  kidsAges?: string;
  duration?: string;
  style?: string;
  dietary?: string;
  mobility?: string;
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickByBudget<T extends { budget?: string[] }>(arr: T[], budget: Budget): T[] {
  const filtered = arr.filter((x) => (x as { budget?: string[] }).budget?.includes(budget));
  return filtered.length > 0 ? filtered : arr;
}

function pickFamilyFriendly<T extends { familyFriendly?: boolean }>(arr: T[], family: boolean): T[] {
  if (!family) return arr;
  return arr.filter((x) => (x as { familyFriendly?: boolean }).familyFriendly !== false);
}

export function generateItinerary(
  group: Group,
  vibe: Vibe,
  budget: Budget,
  prefs?: PlannerPrefs
): { title: string; budgetEst: string; stops: ItineraryStop[]; proTip: string } {
  const isFamily = group === "family";
  const hasToddlers = prefs?.kidsAges === "toddlers";
  const preferLessWalking = prefs?.mobility === "moderate" || prefs?.mobility === "accessible";
  const isHalfDay = prefs?.duration === "half";
  const stops: ItineraryStop[] = [];

  // Budget estimate
  const budgetMap: Record<Budget, string> = {
    under50: "Est $25–$50 per person",
    "50-150": "Est $50–$120 per person",
    "150-300": "Est $120–$250 per person",
    "300plus": "Est $250+ per person",
  };

  if (vibe === "shows") {
    const dining = pickByBudget(DINING_OPTIONS, budget)[0] || DINING_OPTIONS[2];
    stops.push(
      { time: "10:00 AM", emoji: "☕", name: "Lineage Coffee", detail: "Single-origin · Winter Park", area: "Winter Park", priceHint: "$", bookUrl: "https://www.lineagecoffee.com/" },
      { time: "12:00 PM", emoji: dining.emoji, name: dining.name, detail: dining.detail, area: dining.area, priceHint: dining.price, bookUrl: (dining as { bookUrl?: string }).bookUrl },
      { time: "2:00 PM", emoji: "🎭", name: "Dr Phillips Center or Kia Center", detail: "Broadway, concerts, Magic games. See Live Shows for dates & tickets.", area: "Downtown", bookUrl: "/shows" },
      { time: "6:30 PM", emoji: "🍽️", name: "Dinner near venue", detail: "Kres Chophouse or The Strand — both walkable to Dr Phillips.", area: "Downtown", priceHint: "$$", bookUrl: "https://www.opentable.com/kres-chophouse" }
    );
  } else if (vibe === "parks") {
    // Theme park day
    const park1 = pickRandom(THEME_PARK_OPTIONS.filter((p) => p.park.includes("Magic") || p.park.includes("Epcot")));
    const park2 = pickRandom(THEME_PARK_OPTIONS.filter((p) => p.park.includes("Universal") || p.park.includes("Islands")));
    const dining = pickByBudget(DINING_OPTIONS, budget)[0] || DINING_OPTIONS[7]; // Pho or similar
    stops.push(
      { time: "8:15 AM", emoji: park1.emoji, name: `${park1.park} — ${park1.ride}`, detail: park1.tip, area: park1.park, bookUrl: park1.bookUrl },
      { time: park1.bestTime, emoji: park1.emoji, name: park1.ride, detail: park1.tip, bookUrl: park1.bookUrl },
      { time: "11:30 AM", emoji: dining.emoji, name: dining.name, detail: dining.detail, area: dining.area, priceHint: dining.price, bookUrl: (dining as { bookUrl?: string }).bookUrl },
      { time: "2:00 PM", emoji: "🛺", name: "Scooter rental (optional)", detail: "Resort delivery. Saves 45 min of walking for a full park day.", priceHint: "~$30" },
      { time: "5:00 PM", emoji: park2.emoji, name: `${park2.park} — ${park2.ride}`, detail: park2.tip, area: park2.park, bookUrl: park2.bookUrl }
    );
    if (!isFamily && budget !== "under50") {
      const bar = pickRandom(NIGHTLIFE_OPTIONS);
      stops.push({ time: "8:30 PM", emoji: bar.emoji, name: bar.name, detail: bar.detail, area: bar.area, priceHint: bar.price, bookUrl: (bar as { bookUrl?: string }).bookUrl });
    }
  } else if (vibe === "local") {
    // Local spots & food
    const activities = pickFamilyFriendly(ACTIVITY_OPTIONS, isFamily);
    const act1 = pickRandom(activities.filter((a) => a.price === "Free" || a.price === "$"));
    const act2 = pickRandom(activities.filter((a) => a.name !== act1.name));
    const diningOptions = pickByBudget(DINING_OPTIONS, budget);
    const lunch = pickRandom(diningOptions.filter((d) => d.price !== "$$$")) || diningOptions[0];
    const dinner = pickRandom(diningOptions.filter((d) => d.name !== lunch.name)) || diningOptions[1] || diningOptions[0];
    stops.push(
      { time: "9:00 AM", emoji: act1.emoji, name: act1.name, detail: act1.detail, area: act1.area, priceHint: act1.price, bookUrl: (act1 as { bookUrl?: string }).bookUrl },
      { time: "12:00 PM", emoji: lunch.emoji, name: lunch.name, detail: lunch.detail, area: lunch.area, priceHint: lunch.price, bookUrl: (lunch as { bookUrl?: string }).bookUrl },
      { time: "2:30 PM", emoji: act2.emoji, name: act2.name, detail: act2.detail, area: act2.area, priceHint: act2.price, bookUrl: (act2 as { bookUrl?: string }).bookUrl },
      { time: "6:30 PM", emoji: dinner.emoji, name: dinner.name, detail: dinner.detail, area: dinner.area, priceHint: dinner.price, bookUrl: (dinner as { bookUrl?: string }).bookUrl }
    );
  } else if (vibe === "nightlife") {
    // Nightlife focus
    const dayAct = pickRandom(ACTIVITY_OPTIONS.filter((a) => a.price === "Free" || a.price === "$"));
    const dinner = pickByBudget(DINING_OPTIONS, budget)[0] || DINING_OPTIONS[2];
    const bar1 = pickRandom(NIGHTLIFE_OPTIONS);
    const bar2 = pickRandom(NIGHTLIFE_OPTIONS.filter((b) => b.name !== bar1.name));
    stops.push(
      { time: "11:00 AM", emoji: dayAct.emoji, name: dayAct.name, detail: dayAct.detail, area: dayAct.area, priceHint: dayAct.price, bookUrl: (dayAct as { bookUrl?: string }).bookUrl },
      { time: "1:00 PM", emoji: "☕", name: "Lineage Coffee", detail: "Single-origin · Winter Park", area: "Winter Park", priceHint: "$", bookUrl: "https://www.lineagecoffee.com/" },
      { time: "7:00 PM", emoji: dinner.emoji, name: dinner.name, detail: dinner.detail, area: dinner.area, priceHint: dinner.price, bookUrl: (dinner as { bookUrl?: string }).bookUrl },
      { time: "9:00 PM", emoji: bar1.emoji, name: bar1.name, detail: bar1.detail, area: bar1.area, priceHint: bar1.price, bookUrl: (bar1 as { bookUrl?: string }).bookUrl },
      { time: "11:00 PM", emoji: bar2.emoji, name: bar2.name, detail: bar2.detail, area: bar2.area, priceHint: bar2.price, bookUrl: (bar2 as { bookUrl?: string }).bookUrl }
    );
  } else {
    // Mix of both
    const park = pickRandom(THEME_PARK_OPTIONS);
    const diningOptions = pickByBudget(DINING_OPTIONS, budget);
    const lunch = pickRandom(diningOptions.filter((d) => d.price === "$" || d.price === "$$")) || diningOptions[7];
    const dinner = pickRandom(diningOptions.filter((d) => d.name !== lunch.name)) || diningOptions[2];
    const bar = pickRandom(NIGHTLIFE_OPTIONS);
    const activity = pickRandom(ACTIVITY_OPTIONS.filter((a) => a.price !== "$$$"));
    stops.push(
      { time: "8:15 AM", emoji: park.emoji, name: `${park.park} — ${park.ride}`, detail: park.tip, area: park.park, bookUrl: park.bookUrl },
      { time: "11:30 AM", emoji: lunch.emoji, name: lunch.name, detail: lunch.detail, area: lunch.area, priceHint: lunch.price, bookUrl: (lunch as { bookUrl?: string }).bookUrl },
      { time: "2:00 PM", emoji: activity.emoji, name: activity.name, detail: activity.detail, area: activity.area, priceHint: activity.price, bookUrl: (activity as { bookUrl?: string }).bookUrl },
      { time: "6:30 PM", emoji: dinner.emoji, name: dinner.name, detail: dinner.detail, area: dinner.area, priceHint: dinner.price, bookUrl: (dinner as { bookUrl?: string }).bookUrl },
      { time: "8:30 PM", emoji: bar.emoji, name: bar.name, detail: bar.detail, area: bar.area, priceHint: bar.price, bookUrl: (bar as { bookUrl?: string }).bookUrl }
    );
  }

  const vibeTitles: Record<Vibe, string> = {
    parks: "Theme Park Day",
    local: "Local Orlando Day",
    mix: "Mix of Parks & Local",
    nightlife: "Orlando Nightlife",
    shows: "Live Shows & Culture",
  };

  const groupSuffix = group === "family" ? " (Family)" : group === "couple" ? " (Couple)" : "";

  return {
    title: `${vibeTitles[vibe]}${groupSuffix}`,
    budgetEst: budgetMap[budget],
    stops,
    proTip: pickRandom(PRO_TIPS),
  };
}
