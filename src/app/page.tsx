import Link from "next/link";
import TikTokCarousel from "./components/TikTokCarousel";
import PlaceCard from "./components/PlaceCard";
import AIRecommendations from "./components/AIRecommendations";
import { PLACES } from "@/data/places";

const TICKER_ITEMS = [
  { num: "50K+", txt: "families used this last month" },
  { num: "9K+", txt: "itineraries built" },
  { num: "30s", txt: "avg build time" },
  { num: "40+", txt: "curated spots" },
];

const HERO_TAGS = [
  "🎢 Disney Hacks",
  "🍹 Hidden Bars",
  "🌮 Local Eats",
  "🐊 Airboat Tours",
  "🌙 Nightlife",
  "🛺 Scooter Rental",
];

const TRENDING_PLACES = PLACES.filter((p) =>
  ["Christini's Ristorante Italiano", "The Ravenous Pig", "Kennedy Space Center", "Boggy Creek Airboat Adventures", "Domu", "Lake Eola Park"].includes(p.name)
).slice(0, 6);

export default function Home() {
  return (
    <div>
      {/* Hero — TripAdvisor-style search-first */}
      <section className="min-h-[85vh] flex flex-col justify-center pt-20 pb-16 px-6 sm:px-12 lg:px-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-teal/5 via-transparent to-orange/5" />
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2.5 bg-teal/10 border border-teal/25 rounded-full px-4 py-2 mb-6 w-fit">
            <div className="flex -space-x-1.5">
              {["👩", "👨", "👩", "👦"].map((e, i) => (
                <span
                  key={i}
                  className="w-5 h-5 rounded-full border-2 border-htdark bg-htcard2 flex items-center justify-center text-[.65rem]"
                >
                  {e}
                </span>
              ))}
              <span className="w-5 h-5 rounded-full border-2 border-htdark bg-htcard2 flex items-center justify-center text-[.65rem]">
                +
              </span>
            </div>
            <span className="text-[.7rem] font-bold text-teal">50,000+ families used this last month</span>
          </div>

          <h1 className="font-display text-[clamp(2.8rem,5.5vw,4.5rem)] leading-[.95] tracking-wide mb-3">
            <span className="block">The spots.</span>
            <span className="block text-teal">The hacks.</span>
            <span className="block text-orange">The real Orlando.</span>
          </h1>

          <p className="text-[.95rem] text-white/50 leading-relaxed max-w-[500px] mb-8">
            Real park hacks, hidden restaurants, and local knowledge — plus an AI that builds your perfect family day in 30 seconds.
          </p>

          {/* Search — TripAdvisor-style prominent bar */}
          <div className="bg-white rounded-2xl shadow-xl shadow-black/30 border border-white/10 overflow-hidden max-w-2xl">
            <div className="flex flex-col sm:flex-row">
              <div className="flex-1 relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-lg">🔍</span>
                <input
                  type="text"
                  placeholder="Restaurants, experiences, Disney hacks…"
                  className="w-full bg-transparent text-htdark py-4 pl-12 pr-4 text-[.95rem] placeholder:text-gray-400 outline-none"
                />
              </div>
              <div className="flex border-t sm:border-t-0 sm:border-l border-gray-200">
                <select className="bg-transparent text-htdark py-4 px-4 text-[.9rem] outline-none cursor-pointer border-none">
                  <option>Orlando, FL</option>
                  <option>Cocoa Beach</option>
                  <option>Tampa</option>
                </select>
              </div>
              <Link
                href="/explore"
                className="bg-orange px-8 py-4 font-bold text-[.9rem] text-white hover:bg-[#e04510] transition-colors flex items-center justify-center"
              >
                Search
              </Link>
            </div>
          </div>

          {/* Quick links — Things to do, Restaurants, etc. */}
          <div className="flex flex-wrap gap-2 mt-6">
            {HERO_TAGS.map((tag) => (
              <Link
                key={tag}
                href="/explore"
                className="bg-white/5 border border-white/10 text-white/70 py-2 px-4 rounded-full text-[.78rem] font-medium hover:bg-teal/15 hover:border-teal/40 hover:text-teal transition-all"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Ticker */}
      <div className="bg-orange py-3 overflow-hidden">
        <div className="flex gap-0 animate-tick w-max">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <div key={i} className="flex items-center gap-2.5 px-8 border-r border-white/20 shrink-0">
              <span className="font-display text-[1.25rem] text-white">{item.num}</span>
              <span className="text-[.7rem] font-bold text-white/80 max-w-[80px] leading-tight">{item.txt}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Trending — Photo cards like TripAdvisor */}
      <section className="py-16 px-6 sm:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
              <span className="text-[.6rem] font-extrabold tracking-[3px] uppercase text-orange">
                Trending Now
              </span>
              <span className="rounded-full bg-gold/20 px-2 py-0.5 text-[.55rem] font-bold text-gold border border-gold/30">
                AWARD-WINNING
              </span>
            </div>
            <h2 className="font-serif text-[clamp(1.6rem,2.5vw,2.2rem)] font-black italic leading-tight">
              Top picks in <span className="not-italic text-teal">Central Florida</span>
            </h2>
            </div>
            <Link
              href="/explore"
              className="text-[.8rem] font-semibold text-teal hover:underline hidden sm:block"
            >
              See all →
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TRENDING_PLACES.map((place) => (
              <PlaceCard
                key={place.name}
                name={place.name}
                area={place.area}
                desc={place.desc}
                image={place.image}
                category={place.type.charAt(0).toUpperCase() + place.type.slice(1)}
                priceRange={place.priceRange}
                badge={place.badge}
                href={place.bookUrl || "/explore"}
                reviewsUrl={place.reviewsUrl}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Category strip */}
      <div className="py-4 px-6 sm:px-10 bg-white/[0.02] border-y border-white/10">
        <div className="max-w-6xl mx-auto flex gap-2 overflow-x-auto scrollbar-hide">
          {["🗺️ Everything", "🎢 Park Hacks", "🍽️ Local Eats", "🌙 Nightlife", "🏖️ Day Trips", "🛺 Rentals", "📍 Hidden Gems", "🎶 Events"].map(
            (cat) => (
              <Link
                key={cat}
                href="/explore"
                className="flex items-center gap-1.5 bg-htcard border border-white/10 py-2.5 px-4 rounded-full text-[.78rem] font-semibold text-white/60 whitespace-nowrap shrink-0 hover:bg-teal/10 hover:border-teal/40 hover:text-teal transition-all"
              >
                {cat}
              </Link>
            )
          )}
        </div>
      </div>

      {/* TikTok carousel */}
      <TikTokCarousel />

      {/* Quick links */}
      <section className="py-20 px-6 sm:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-[.6rem] font-extrabold tracking-[3px] uppercase text-orange mb-2">Explore</div>
          <h2 className="font-serif text-[clamp(1.8rem,3vw,2.65rem)] font-black italic leading-tight mb-10">
            Plan your <span className="not-italic">Central Florida</span> trip
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/explore"
              className="block p-6 rounded-xl border border-white/10 bg-htcard/50 hover:border-teal/30 hover:bg-teal/5 transition-all group"
            >
              <div className="text-2xl mb-2">🗺️</div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-teal transition-colors">Explore</h3>
              <p className="text-sm text-white/50">Restaurants, experiences, museums, bars & activities.</p>
            </Link>
            <Link
              href="/theme-parks"
              className="block p-6 rounded-xl border border-white/10 bg-htcard/50 hover:border-teal/30 hover:bg-teal/5 transition-all group"
            >
              <div className="text-2xl mb-2">🎢</div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-teal transition-colors">Theme Parks</h3>
              <p className="text-sm text-white/50">Disney, Universal, SeaWorld & Busch Gardens tips.</p>
            </Link>
            <Link
              href="/tips-guides"
              className="block p-6 rounded-xl border border-white/10 bg-htcard/50 hover:border-teal/30 hover:bg-teal/5 transition-all group"
            >
              <div className="text-2xl mb-2">📝</div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-teal transition-colors">Tips & Guides</h3>
              <p className="text-sm text-white/50">Vacation tips, Orlando focus, surrounding areas.</p>
            </Link>
            <Link
              href="/plan-my-day"
              className="block p-6 rounded-xl border border-teal/30 bg-teal/5 hover:border-teal/50 transition-all group"
            >
              <div className="text-2xl mb-2">✨</div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-teal transition-colors">Plan My Day</h3>
              <p className="text-sm text-white/50">AI builds your day by party size, interests & budget.</p>
            </Link>
            <Link
              href="/flight-tracker"
              className="block p-6 rounded-xl border border-white/10 bg-htcard/50 hover:border-teal/30 hover:bg-teal/5 transition-all group"
            >
              <div className="text-2xl mb-2">✈️</div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-teal transition-colors">Flight Tracker</h3>
              <p className="text-sm text-white/50">Track flights to MCO.</p>
            </Link>
            <Link
              href="/contact"
              className="block p-6 rounded-xl border border-white/10 bg-htcard/50 hover:border-teal/30 hover:bg-teal/5 transition-all group"
            >
              <div className="text-2xl mb-2">✉️</div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-teal transition-colors">Contact</h3>
              <p className="text-sm text-white/50">Get in touch.</p>
            </Link>
          </div>
        </div>
      </section>

      <AIRecommendations />
    </div>
  );
}
