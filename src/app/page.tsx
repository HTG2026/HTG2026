import Link from "next/link";
import TikTokCarousel from "./components/TikTokCarousel";
import PlaceCard from "./components/PlaceCard";
import { PLACES } from "@/data/places";

const TICKER_ITEMS = [
  { num: "40+", txt: "curated spots" },
  { num: "5", txt: "clicks to plan" },
  { num: "100%", txt: "locals-only picks" },
  { num: "Free", txt: "to use" },
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
    <div className="relative">
      {/* Hero — TripAdvisor-style search-first */}
      <section className="min-h-[85vh] flex flex-col justify-center pt-20 pb-16 px-6 sm:px-12 lg:px-16 relative overflow-hidden hero-mesh bg-noise bg-htbg">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2.5 bg-teal/10 border border-teal/30 rounded-full px-4 py-2 mb-6 w-fit">
            <div className="flex -space-x-1.5">
              {["👩", "👨", "👩", "👦"].map((e, i) => (
                <span
                  key={i}
                  className="w-5 h-5 rounded-full border-2 border-slate-300 bg-white flex items-center justify-center text-[.65rem]"
                >
                  {e}
                </span>
              ))}
              <span className="w-5 h-5 rounded-full border-2 border-slate-300 bg-white flex items-center justify-center text-[.65rem]">
                +
              </span>
            </div>
            <span className="text-[.7rem] font-bold text-teal">Real Orlando tips from locals</span>
          </div>

          <h1 className="font-display text-[clamp(3rem,6vw,5rem)] leading-[0.92] tracking-wide mb-4">
            <span className="block text-htdark">The spots.</span>
            <span className="block text-teal">The hacks.</span>
            <span className="block text-orange">The real Orlando.</span>
          </h1>

          <p className="text-[.95rem] text-slate-600 leading-relaxed max-w-[500px] mb-8">
            Real park hacks, hidden restaurants, and local knowledge — plus a chatbot that curates your perfect day based on your budget and preferences. In 5 clicks or less.
          </p>

          {/* Search — TripAdvisor-style prominent bar */}
          <div className="bg-white rounded-2xl shadow-xl shadow-slate-300/50 ring-1 ring-slate-200 overflow-hidden max-w-2xl">
            <div className="flex flex-col sm:flex-row">
              <div className="flex-1 relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">🔍</span>
                <input
                  type="text"
                placeholder="Restaurants, experiences, Disney hacks…"
                className="w-full bg-transparent text-htdark py-4 pl-12 pr-4 text-[.95rem] placeholder:text-slate-400 outline-none"
                />
              </div>
              <div className="flex border-t sm:border-t-0 sm:border-l border-slate-200">
                <select className="bg-transparent text-htdark py-4 px-4 text-[.9rem] outline-none cursor-pointer border-none">
                  <option>Orlando, FL</option>
                  <option>Cocoa Beach</option>
                  <option>Tampa</option>
                </select>
              </div>
              <Link
                href="/explore"
                className="bg-orange px-8 py-4 min-h-[44px] font-bold text-[.9rem] text-white hover:bg-[#e04510] transition-colors flex items-center justify-center touch-manipulation"
              >
                Find Spots
              </Link>
            </div>
          </div>

          {/* Quick links — Things to do, Restaurants, etc. */}
          <div className="flex flex-wrap gap-2 mt-6">
            {HERO_TAGS.map((tag) => (
              <Link
                key={tag}
                href="/explore"
                className="bg-white border border-slate-200 text-slate-600 py-3 px-4 min-h-[44px] rounded-full text-[.78rem] font-medium hover:bg-teal/10 hover:border-teal/40 hover:text-teal transition-all shadow-sm flex items-center touch-manipulation"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Ticker */}
      <div className="bg-orange py-3.5 overflow-hidden">
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
      <section className="py-16 px-6 sm:px-12 bg-htbg">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
              <span className="text-[.6rem] font-extrabold tracking-[3px] uppercase text-orange">
                Trending Now
              </span>
              <span className="rounded-full bg-gold/20 px-2 py-0.5 text-[.55rem] font-bold text-amber-700 border border-gold/40">
                EDITOR&apos;S PICKS
              </span>
            </div>
            <h2 className="font-serif text-[clamp(1.6rem,2.5vw,2.2rem)] font-black italic leading-tight text-htdark">
              Top picks in <span className="not-italic text-teal">Central Florida</span>
            </h2>
            </div>
            <Link
              href="/explore"
              className="text-[.8rem] font-semibold text-teal hover:underline hidden sm:flex sm:items-center sm:min-h-[44px]"
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
      <div className="py-4 px-6 sm:px-12 bg-white border-y border-slate-200">
        <div className="max-w-6xl mx-auto flex gap-2 overflow-x-auto scrollbar-hide">
          {["🗺️ Everything", "🎢 Park Hacks", "🍽️ Local Eats", "🌙 Nightlife", "🎭 Live Shows", "🏖️ Day Trips", "🛺 Rentals", "📍 Hidden Gems", "🎶 Live Events"].map(
            (cat) => (
              <Link
                key={cat}
                href={cat.includes("Live Shows") ? "/shows" : "/explore"}
                className="flex items-center gap-1.5 bg-htcard2 border border-slate-200 py-3 px-4 min-h-[44px] rounded-full text-[.78rem] font-semibold text-slate-600 whitespace-nowrap shrink-0 hover:bg-teal/10 hover:border-teal/40 hover:text-teal transition-all touch-manipulation"
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
      <section className="py-16 px-6 sm:px-12 bg-htbg">
        <div className="max-w-6xl mx-auto">
          <div className="text-[.6rem] font-extrabold tracking-[3px] uppercase text-orange mb-2">Explore</div>
          <h2 className="font-serif text-[clamp(1.8rem,3vw,2.65rem)] font-black italic leading-tight mb-10 text-htdark">
            Plan your <span className="not-italic">Central Florida</span> trip
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/explore"
              className="block p-6 rounded-xl border border-slate-200 bg-white hover:border-teal/40 card-lift group shadow-sm touch-manipulation"
            >
              <div className="text-2xl mb-2">🗺️</div>
              <h3 className="text-lg font-semibold mb-2 text-htdark group-hover:text-teal transition-colors">Explore</h3>
              <p className="text-sm text-slate-600">Restaurants, experiences, museums, bars and activities.</p>
            </Link>
            <Link
              href="/theme-parks"
              className="block p-6 rounded-xl border border-slate-200 bg-white hover:border-teal/40 card-lift group shadow-sm touch-manipulation"
            >
              <div className="text-2xl mb-2">🎢</div>
              <h3 className="text-lg font-semibold mb-2 text-htdark group-hover:text-teal transition-colors">Theme Parks</h3>
              <p className="text-sm text-slate-600">Disney, Universal, SeaWorld & Busch Gardens tips.</p>
            </Link>
            <Link
              href="/tips-guides"
              className="block p-6 rounded-xl border border-slate-200 bg-white hover:border-teal/40 card-lift group shadow-sm touch-manipulation"
            >
              <div className="text-2xl mb-2">📝</div>
              <h3 className="text-lg font-semibold mb-2 text-htdark group-hover:text-teal transition-colors">Tips & Guides</h3>
              <p className="text-sm text-slate-600">Vacation tips, Central Florida focus, surrounding areas.</p>
            </Link>
            <Link
              href="/plan-my-day"
              className="block p-6 rounded-xl border border-teal/40 bg-teal/5 hover:border-teal/60 card-lift group shadow-sm touch-manipulation"
            >
              <div className="text-2xl mb-2">✨</div>
              <h3 className="text-lg font-semibold mb-2 text-htdark group-hover:text-teal transition-colors">Plan My Day</h3>
              <p className="text-sm text-slate-600">Chatbot curates your day by party size, interests & budget. In 5 clicks or less.</p>
            </Link>
            <Link
              href="/shows"
              className="block p-6 rounded-xl border border-slate-200 bg-white hover:border-teal/40 card-lift group shadow-sm touch-manipulation"
            >
              <div className="text-2xl mb-2">🎭</div>
              <h3 className="text-lg font-semibold mb-2 text-htdark group-hover:text-teal transition-colors">Live Shows</h3>
              <p className="text-sm text-slate-600">Dr Phillips, Kia Center, Hard Rock, I-Drive Live.</p>
            </Link>
            <Link
              href="/contact"
              className="block p-6 rounded-xl border border-slate-200 bg-white hover:border-teal/40 card-lift group shadow-sm touch-manipulation"
            >
              <div className="text-2xl mb-2">✉️</div>
              <h3 className="text-lg font-semibold mb-2 text-htdark group-hover:text-teal transition-colors">Contact</h3>
              <p className="text-sm text-slate-600">Questions? We&apos;re here to help.</p>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
