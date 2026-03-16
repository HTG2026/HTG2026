"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

const FALLBACK_URLS = [
  "https://www.tiktok.com/@disneyparks/video/7387826342689099039",
  "https://www.tiktok.com/@see.wdw/video/7414624446197075231",
  "https://www.tiktok.com/@sobrizzle/video/7369772085859732778",
  "https://www.tiktok.com/@thatchipperbunch/video/7444188965017554206",
];

function renderTikTokEmbeds(container: HTMLElement | null) {
  if (!container) return;
  const tiktok = (window as unknown as { tiktok?: { embed?: { lib?: { render: (el?: HTMLElement) => void } } } }).tiktok;
  if (tiktok?.embed?.lib?.render) {
    tiktok.embed.lib.render(container);
  }
}

export default function TikTokCarousel() {
  const [urls, setUrls] = useState<string[]>(FALLBACK_URLS);
  const [embedReady, setEmbedReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/tiktok-feed")
      .then((res) => res.json())
      .then((data) => {
        if (data?.urls?.length) setUrls(data.urls);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!embedReady || urls.length === 0) return;
    const key = urls.join("|");
    if (key === FALLBACK_URLS.join("|")) return;
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
              TikTok · #OrlandoFlorida
            </div>
            <h2 className="font-serif text-[clamp(1.6rem,2.5vw,2.2rem)] font-black italic leading-tight text-htdark">
              Hacks going <span className="not-italic">viral</span>
            </h2>
          </div>
          <a
            href="https://www.tiktok.com/search?q=orlando+florida"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[.76rem] font-semibold text-slate-600 hover:text-teal transition-colors hidden sm:block"
          >
            Watch on TikTok →
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
