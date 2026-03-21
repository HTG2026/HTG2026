/**
 * Real Orlando experiences for Plan My Day — dining, nightlife, theme parks, activities.
 * Sourced from Visit Orlando, local guides, and theme park resources.
 */

export interface ItineraryStop {
  time: string;
  emoji: string;
  name: string;
  detail: string;
  area?: string;
  priceHint?: string;
  /** Link to reserve, book tickets, or get info */
  bookUrl?: string;
}

export interface ThemeParkOption {
  park: string;
  ride: string;
  tip: string;
  bestTime: string;
  emoji: string;
  /** Link to buy park tickets */
  bookUrl?: string;
}

const DISNEY_TICKETS = "https://disneyworld.disney.go.com/tickets/";
const UNIVERSAL_TICKETS = "https://www.universalorlando.com/web/en/us/tickets-packages";
const SEAWORLD_TICKETS = "https://seaworld.com/orlando/tickets/";

export const THEME_PARK_OPTIONS: ThemeParkOption[] = [
  { park: "Magic Kingdom", ride: "TRON Lightcycle / Run", tip: "Rope drop 45 min early. Hit TRON first — done before 9am wave.", bestTime: "9:00 AM", emoji: "🎢", bookUrl: DISNEY_TICKETS },
  { park: "Magic Kingdom", ride: "Tiana's Bayou Adventure", tip: "Second rope-drop target. Under 20 min at open.", bestTime: "9:30 AM", emoji: "🎢", bookUrl: DISNEY_TICKETS },
  { park: "Epcot", ride: "Guardians of the Galaxy: Cosmic Rewind", tip: "Virtual queue at 7am or 1pm. First reverse-launch coaster.", bestTime: "1:00 PM", emoji: "🚀", bookUrl: DISNEY_TICKETS },
  { park: "Epcot", ride: "Remy's Ratatouille Adventure", tip: "Single-rider line saves 30+ min. No LL needed at rope drop.", bestTime: "10:00 AM", emoji: "🐀", bookUrl: DISNEY_TICKETS },
  { park: "Hollywood Studios", ride: "Rise of the Resistance", tip: "Rope drop or buy ILL. 18-min experience.", bestTime: "9:00 AM", emoji: "⭐", bookUrl: DISNEY_TICKETS },
  { park: "Hollywood Studios", ride: "Slinky Dog Dash", tip: "Under 30 min at park open. Skip LL for this.", bestTime: "9:15 AM", emoji: "🐕", bookUrl: DISNEY_TICKETS },
  { park: "Animal Kingdom", ride: "Avatar Flight of Passage", tip: "Rope drop or ILL. 4-min flight sim.", bestTime: "9:00 AM", emoji: "🦅", bookUrl: DISNEY_TICKETS },
  { park: "Animal Kingdom", ride: "Expedition Everest", tip: "Single-rider line. Back row = best air.", bestTime: "11:00 AM", emoji: "⛰️", bookUrl: DISNEY_TICKETS },
  { park: "Universal Studios", ride: "VelociCoaster", tip: "Ask for front row at merge — adds ~5 min. Works 90% of the time.", bestTime: "Early entry", emoji: "🦖", bookUrl: UNIVERSAL_TICKETS },
  { park: "Universal Studios", ride: "Hagrid's Magical Creatures", tip: "Early entry hits this before standby. No Express.", bestTime: "Early entry", emoji: "🏍️", bookUrl: UNIVERSAL_TICKETS },
  { park: "Islands of Adventure", ride: "Frozen Butterbeer", tip: "Frozen > regular. Cream foam changes everything.", bestTime: "Anytime", emoji: "🍺", bookUrl: UNIVERSAL_TICKETS },
  { park: "SeaWorld", ride: "Mako", tip: "Back row = best air time. Under 30 min wait.", bestTime: "Park open", emoji: "🦈", bookUrl: SEAWORLD_TICKETS },
  { park: "SeaWorld", ride: "Dolphin Nursery", tip: "Free feeding at opening. No ticket upgrade.", bestTime: "9:00 AM", emoji: "🐬", bookUrl: SEAWORLD_TICKETS },
];

export const DINING_OPTIONS = [
  { name: "Christini's Ristorante Italiano", area: "Dr Phillips", detail: "Italian fine dining · Editor's pick", price: "$$$", emoji: "🍝", budget: ["150-300", "300plus"], bookUrl: "https://www.opentable.com/christinis-ristorante-italiano" },
  { name: "The Capital Grille", area: "Dr Phillips", detail: "Dry-aged steaks · Wine cellar", price: "$$$", emoji: "🥩", budget: ["150-300", "300plus"], bookUrl: "https://www.opentable.com/the-capital-grille-millenia-orlando" },
  { name: "Prato", area: "Winter Park", detail: "Wood-fired Italian · MICHELIN Guide", price: "$$", emoji: "🍕", budget: ["50-150", "150-300"], bookUrl: "https://www.opentable.com/r/prato-winter-park" },
  { name: "The Ravenous Pig", area: "Winter Park", detail: "Farm-to-table · Craft beer", price: "$$", emoji: "🐷", budget: ["50-150", "150-300"], bookUrl: "https://resy.com/cities/orlando/the-ravenous-pig" },
  { name: "Kres Chophouse", area: "Downtown Orlando", detail: "Prime steaks · Historic venue", price: "$$$", emoji: "🥩", budget: ["150-300", "300plus"], bookUrl: "https://www.opentable.com/kres-chophouse" },
  { name: "Norman's at The Ritz-Carlton", area: "Grande Lakes", detail: "Norman Van Aken · New World cuisine", price: "$$$", emoji: "✨", budget: ["300plus"], bookUrl: "https://www.opentable.com/r/normans-orlando-4" },
  { name: "Pinocchio Village Haus", area: "Magic Kingdom", detail: "$12 flatbreads · Front-row view of It's a Small World", price: "$", emoji: "🍕", budget: ["under50", "50-150"], bookUrl: "https://disneyworld.disney.go.com/dining/magic-kingdom/pinocchio-village-haus/" },
  { name: "Pho Hoa Hiep", area: "Mills 50", detail: "Vietnamese · Hidden gem tourists never find", price: "$", emoji: "🍜", budget: ["under50"], bookUrl: "https://www.yelp.com/biz/pho-hoa-hiep-orlando" },
  { name: "Hunger Street Tacos", area: "Dr Phillips", detail: "Birria tacos · Trending", price: "$", emoji: "🌮", budget: ["under50", "50-150"], bookUrl: "https://www.hungerstreettacos.com/" },
  { name: "Se7en Bites", area: "Milk District", detail: "Bakery · Brunch · Southern comfort", price: "$$", emoji: "🥧", budget: ["under50", "50-150"], bookUrl: "https://www.se7enbites.com/" },
  { name: "Domu", area: "East End Market", detail: "Ramen · House-made noodles", price: "$$", emoji: "🍜", budget: ["50-150"], bookUrl: "https://www.domuchicago.com/east-end-market" },
  { name: "Lineage Coffee", area: "Winter Park", detail: "Single-origin · Local fave", price: "$", emoji: "☕", budget: ["under50"], bookUrl: "https://www.lineagecoffee.com/" },
  { name: "Graffiti Junktion", area: "Audubon Park", detail: "Burgers · Hidden gem", price: "$", emoji: "🍔", budget: ["under50", "50-150"], bookUrl: "https://www.graffitijunktion.com/" },
];

export const NIGHTLIFE_OPTIONS = [
  { name: "Bar Purgatory", area: "Thornton Park", detail: "Craft cocktails · Local fave tourists walk right past", price: "$$", emoji: "🍸", bookUrl: "https://www.barpurgatory.com/" },
  { name: "Mathers Social Gathering", area: "Downtown Orlando", detail: "Speakeasy · Vintage vibe", price: "$$", emoji: "🥃", bookUrl: "https://www.matherssocialgathering.com/" },
  { name: "Hanson's Shoe Repair", area: "Downtown Orlando", detail: "Prohibition-era · Reservations required", price: "$$", emoji: "👞", bookUrl: "https://www.thehansonbuilding.com/hansons-shoe-repair/reservations" },
  { name: "The Robinson", area: "Thornton Park", detail: "Rooftop · Skyline views", price: "$$", emoji: "🌃", bookUrl: "https://www.therobinsonorlando.com/" },
  { name: "The Venue", area: "Ivanhoe", detail: "Gallery + Bar · Art", price: "$$", emoji: "🎨", bookUrl: "https://www.thevenueorlando.com/" },
  { name: "The Courtesy Bar", area: "Mills 50", detail: "Old Fashioned is unreal. Tourists never find it.", price: "$$", emoji: "🍹", bookUrl: "https://www.thecourtesybar.com/reservations" },
];

export const ACTIVITY_OPTIONS = [
  { name: "Boggy Creek Airboat Adventures", area: "Kissimmee", detail: "Gator spotting · Family favorite", price: "$$$", emoji: "🐊", familyFriendly: true, bookUrl: "https://bcairboats.com/" },
  { name: "Kennedy Space Center", area: "Cocoa Beach", detail: "Rocket launches & NASA exhibits", price: "$$$", emoji: "🚀", familyFriendly: true, bookUrl: "https://www.kennedyspacecenter.com/info/tickets" },
  { name: "Wild Florida Airboats", area: "Kenansville", detail: "Airboat · Gators · Safari park", price: "$$$", emoji: "🐊", familyFriendly: true, bookUrl: "https://www.wildfloridairboats.com/book-airboat-tours" },
  { name: "Gatorland", area: "Kissimmee", detail: "Gator park · Zip line · Shows", price: "$$", emoji: "🐊", familyFriendly: true, bookUrl: "https://www.gatorland.com/tickets/" },
  { name: "Winter Park Boat Tour", area: "Winter Park", detail: "Scenic cruise · Chain of Lakes", price: "$$", emoji: "⛵", familyFriendly: true, bookUrl: "https://www.scenicboattours.com/" },
  { name: "Lake Eola Park", area: "Downtown Orlando", detail: "Swan boats · Free", price: "Free", emoji: "🦢", familyFriendly: true, bookUrl: "https://www.orlando.gov/Parks-the-Environment/Directory/Lake-Eola-Park" },
  { name: "Leu Gardens", area: "Audubon Park", detail: "50 acres · Free Monday 9am–noon", price: "$", emoji: "🌺", familyFriendly: true, bookUrl: "https://www.leugardens.org/Visit/Admission-Hours" },
  { name: "Wekiwa Springs State Park", area: "Apopka", detail: "Springs · Kayaking · Swimming", price: "$", emoji: "🏊", familyFriendly: true, bookUrl: "https://reserve.floridastateparks.org/Web/#!park/75" },
  { name: "Paddleboard Orlando", area: "Winter Park", detail: "Chain of Lakes · Sunset tours", price: "$$", emoji: "🏄", familyFriendly: false, bookUrl: "https://paddleboardorlando.com/" },
  { name: "Orlando Balloon Rides", area: "Kissimmee", detail: "Sunrise · Champagne", price: "$$$", emoji: "🎈", familyFriendly: false, bookUrl: "https://www.bobsballoons.com/" },
  { name: "ICON Park", area: "I-Drive", detail: "Wheel · Madame Tussauds", price: "$$", emoji: "🎡", familyFriendly: true, bookUrl: "https://theorlandoeye.com/tickets/" },
];

export const PRO_TIPS = [
  "Frozen Butterbeer > regular. The cream foam changes everything.",
  "Rope drop 45 min early. Cast members let you in before official open.",
  "Skip Lightning Lane on short-wait rides. Most run under 20 min at park open.",
  "On-site Universal hotel = 1hr early entry. Often better than $80 Express Pass.",
  "Mako back row = best air time. Most underrated coaster in Orlando.",
  "Dolphin feeding at SeaWorld is free. Head to Dolphin Nursery at opening.",
  "Ask for front row on VelociCoaster at the merge. Usually adds only 5 min.",
  "Scooter delivered to your resort saves 45 min in park wheelchair rental lines.",
];
