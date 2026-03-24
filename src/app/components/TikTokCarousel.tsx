"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { TIKTOK_FALLBACK_URLS } from "@/data/tiktok-fallbacks";

function renderTikTokEmbeds(container: HTMLElement | null) {
  if (!container) return;
  const tiktok = (window as unknown as { tiktok?: { embed?: { lib?: { render: (el?: HTMLElement) => void } } } }).tiktok;
  if (tiktok?.embed?.lib?.render) {
    tiktok.embed.lib.render(container);
  }
}

export default function TikTokCarousel() {
  const [urls, setUrls] = useState<string[]>(TIKTOK_FALLBACK_URLS);
  const [embedReady, setEmbedReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/tiktok-feed")
      .then((res) => res.json())
      .then((data: { urls?: string[] }) => {
        if (data?.urls?.length) setUrls(data.urls);
      })
      .catch(() => {});
  }, []);

  // Always call TikTok's render after the script loads — including when we only
  // have fallbacks (Redis empty / no API key). Skipping that left "Watch on TikTok" links only.
  useEffect(() => {
    if (!embedReady || urls.length === 0) return;
    const id = requestAnimationFrame(() => {
      renderTikTokEmbeds(containerRef.current);
    });
    return () => cancelAnimationFrame(id);
  }, [embedReady, urls]);

  return (
      <section className="py-16 px-6 sm:px-12 bg-htcard2">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="text-[.6rem] font-extrabold tracking-[3px] uppercase text-orange mb-2">
              TikTok · What to do in Orlando
            </div>
            <h2 className="font-serif text-[clamp(1.6rem,2.5vw,2.2rem)] font-black italic leading-tight text-htdark">
              Ideas & <span className="not-italic">inspo</span> from TikTok
            </h2>
            <p className="text-sm text-slate-600 mt-2 max-w-lg">
              Top-liked videos about things to do, day trips, and local picks — refreshed on a schedule when our scraper runs.
            </p>
          </div>
          <a
            href="https://www.tiktok.com/search?q=what+to+do+in+Orlando"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[.76rem] font-semibold text-slate-600 hover:text-teal transition-colors hidden sm:block shrink-0"
          >
            Search on TikTok →
          </a>
        </div>

        <div ref={containerRef} className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 scroll-snap-x snap-mandatory">
          {urls.map((url, i) => (
            <div
              key={`${url}-${i}`}
              className="flex-shrink-0 w-[325px] sm:w-[355px] snap-start"
            >
              <blockquote
                className="tiktok-embed"
                cite={url}
                data-video-id={url.split("/video/")[1]?.split("?")[0] || ""}
                style={{ maxWidth: "325px", minWidth: "325px" }}
              >
                <section>
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    Watch on TikTok
                  </a>
                </section>
              </blockquote>
            </div>
          ))}
        </div>
      </div>

      <Script
        src="https://www.tiktok.com/embed.js"
        strategy="lazyOnload"
        onLoad={() => setEmbedReady(true)}
      />
    </section>
  );
}
