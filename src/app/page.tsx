import Link from "next/link";
import TikTokCarousel from "./components/TikTokCarousel";
import PlaceCard from "./components/PlaceCard";
import { PLACES } from "@/data/places";
import { getHomeContent } from "@/lib/get-home-content";

/** Revalidate homepage so Sanity CMS edits show up without redeploying. */
export const revalidate = 300;

const TITLE_COLOR: Record<string, string> = {
  htdark: "text-htdark",
  teal: "text-teal",
  orange: "text-orange",
};

export default async function Home() {
  const home = await getHomeContent();
  const trendingPlaces = PLACES.filter((p) =>
    home.trendingPlaceNames.includes(p.name)
  ).slice(0, 6);

  return (
    <div className="relative">
      {/* Hero — TripAdvisor-style search-first */}
      <section className="min-h-[85vh] flex flex-col justify-center pt-20 pb-16 px-6 sm:px-12 lg:px-16 relative overflow-hidden hero-mesh bg-noise bg-htbg">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2.5 bg-teal/10 border border-teal/30 rounded-full px-4 py-2 mb-6 w-fit">
            <div className="flex -space-x-1.5">
              {home.badge.avatars.map((e, i) => (
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
            <span className="text-[.7rem] font-bold text-teal">{home.badge.label}</span>
          </div>

          <h1 className="font-display text-[clamp(3rem,6vw,5rem)] leading-[0.92] tracking-wide mb-4">
            {home.hero.titleLines.map((line, i) => (
              <span
                key={i}
                className={`block ${TITLE_COLOR[line.color] ?? "text-htdark"}`}
              >
                {line.text}
              </span>
            ))}
          </h1>

          <p className="text-[.95rem] text-slate-600 leading-relaxed max-w-[500px] mb-8">
            {home.hero.subtitle}
          </p>

          <div className="bg-white rounded-2xl shadow-xl shadow-slate-300/50 ring-1 ring-slate-200 overflow-hidden max-w-2xl">
            <div className="flex flex-col sm:flex-row">
              <div className="flex-1 relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">🔍</span>
                <input
                  type="text"
                  placeholder={home.hero.searchPlaceholder}
                  className="w-full bg-transparent text-htdark py-4 pl-12 pr-4 text-[.95rem] placeholder:text-slate-400 outline-none"
                />
              </div>
              <div className="flex border-t sm:border-t-0 sm:border-l border-slate-200">
                <select className="bg-transparent text-htdark py-4 px-4 text-[.9rem] outline-none cursor-pointer border-none">
                  {home.hero.locations.map((loc) => (
                    <option key={loc}>{loc}</option>
                  ))}
                </select>
              </div>
              <Link
                href="/explore"
                className="bg-orange px-8 py-4 min-h-[44px] font-bold text-[.9rem] text-white hover:bg-[#e04510] transition-colors flex items-center justify-center touch-manipulation"
              >
                {home.hero.findSpotsLabel}
              </Link>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-6">
            {home.heroTags.map((tag) => (
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

      <div className="bg-orange py-3.5 overflow-hidden">
        <div className="flex gap-0 animate-tick w-max">
          {[...home.ticker, ...home.ticker].map((item, i) => (
            <div key={i} className="flex items-center gap-2.5 px-8 border-r border-white/20 shrink-0">
              <span className="font-display text-[1.25rem] text-white">{item.num}</span>
              <span className="text-[.7rem] font-bold text-white/80 max-w-[80px] leading-tight">{item.txt}</span>
            </div>
          ))}
        </div>
      </div>

      <section className="py-16 px-6 sm:px-12 bg-htbg">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[.6rem] font-extrabold tracking-[3px] uppercase text-orange">
                  {home.trending.kicker}
                </span>
                <span className="rounded-full bg-gold/20 px-2 py-0.5 text-[.55rem] font-bold text-amber-700 border border-gold/40">
                  {home.trending.badge}
                </span>
              </div>
              <h2 className="font-serif text-[clamp(1.6rem,2.5vw,2.2rem)] font-black italic leading-tight text-htdark">
                {home.trending.heading}{" "}
                <span className="not-italic text-teal">{home.trending.headingAccent}</span>
              </h2>
            </div>
            <Link
              href="/explore"
              className="text-[.8rem] font-semibold text-teal hover:underline hidden sm:flex sm:items-center sm:min-h-[44px]"
            >
              {home.trending.seeAll}
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {trendingPlaces.map((place) => (
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

      <div className="py-4 px-6 sm:px-12 bg-white border-y border-slate-200">
        <div className="max-w-6xl mx-auto flex gap-2 overflow-x-auto scrollbar-hide">
          {home.categoryStrip.map((cat) => (
            <Link
              key={cat.label}
              href={cat.href}
              className="flex items-center gap-1.5 bg-htcard2 border border-slate-200 py-3 px-4 min-h-[44px] rounded-full text-[.78rem] font-semibold text-slate-600 whitespace-nowrap shrink-0 hover:bg-teal/10 hover:border-teal/40 hover:text-teal transition-all touch-manipulation"
            >
              {cat.label}
            </Link>
          ))}
        </div>
      </div>

      <TikTokCarousel />

      <section className="py-16 px-6 sm:px-12 bg-htbg">
        <div className="max-w-6xl mx-auto">
          <div className="text-[.6rem] font-extrabold tracking-[3px] uppercase text-orange mb-2">
            {home.exploreSection.kicker}
          </div>
          <h2 className="font-serif text-[clamp(1.8rem,3vw,2.65rem)] font-black italic leading-tight mb-10 text-htdark">
            {home.exploreSection.heading}{" "}
            <span className="not-italic">{home.exploreSection.headingAccent}</span>{" "}
            {home.exploreSection.headingSuffix}
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {home.quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block p-6 rounded-xl border card-lift group shadow-sm touch-manipulation ${
                  link.highlight
                    ? "border-teal/40 bg-teal/5 hover:border-teal/60"
                    : "border-slate-200 bg-white hover:border-teal/40"
                }`}
              >
                <div className="text-2xl mb-2">{link.emoji}</div>
                <h3 className="text-lg font-semibold mb-2 text-htdark group-hover:text-teal transition-colors">
                  {link.title}
                </h3>
                <p className="text-sm text-slate-600">{link.body}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
