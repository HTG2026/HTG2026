"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1523531294919-e4d64d4c2a53?w=600&q=80";

const GUIDES = [
  {
    title: "First-time Orlando trip planner",
    desc: "How to balance theme parks, downtime, and budget. Where to stay, when to go, and how to avoid rookie mistakes.",
    image: "https://images.unsplash.com/photo-1523531294919-e4d64d4c2a53?w=600&q=80",
    tag: "Orlando",
  },
  {
    title: "Cocoa Beach: Rocket launches & beaches",
    desc: "See a SpaceX or NASA launch from the Space Coast. Best viewing spots, timing, and what to do before/after.",
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=600&q=80",
    tag: "Surrounding",
  },
  {
    title: "What to pack for Central Florida",
    desc: "Sun, storms, and long park days — be ready. Sunscreen, rain gear, and the one thing everyone forgets.",
    image: "https://images.unsplash.com/photo-1523380744952-b7e00f6d2ff?w=600&q=80",
    tag: "Tips",
  },
  {
    title: "Best day trips from Orlando",
    desc: "Cocoa Beach, Tampa, St. Augustine, and easy escapes within a short drive. When to go and what to do.",
    image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=600&q=80",
    tag: "Surrounding",
  },
  {
    title: "Orlando on a budget",
    desc: "Free things to do, cheap eats, and how to save on park tickets without getting scammed.",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=600&q=80",
    tag: "Tips",
  },
  {
    title: "Theme park rope drop strategy",
    desc: "Why arriving 45 min early changes everything. Which rides to hit first at each park.",
    image: "https://images.unsplash.com/photo-1523531294919-e4d64d4c2a53?w=600&q=80",
    tag: "Parks",
  },
];

export default function TipsGuides() {
  return (
    <div className="py-16 px-6 sm:px-12 max-w-6xl mx-auto bg-htbg">
      <div className="text-[.6rem] font-extrabold tracking-[3px] uppercase text-orange mb-2">Vacation Tips</div>
      <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] leading-tight mb-4 text-htdark">
        <span className="text-teal">Tips & Guides</span>
      </h1>
      <p className="text-slate-600 text-lg max-w-xl mb-12">
        How to vacation in Central Florida — Orlando focus, surrounding areas like Cocoa Beach, and local knowledge.
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        {GUIDES.map((guide, i) => (
          <GuideCard key={i} guide={guide} />
        ))}
      </div>
    </div>
  );
}

function GuideCard({ guide }: { guide: (typeof GUIDES)[0] }) {
  const [imgSrc, setImgSrc] = useState(guide.image);
  return (
    <Link
      href="#"
      className="group block overflow-hidden rounded-xl border border-slate-200 bg-white hover:border-teal/30 hover:bg-teal/5 transition-all shadow-sm"
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={imgSrc}
          alt={guide.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, 50vw"
          onError={() => setImgSrc(FALLBACK_IMAGE)}
        />
        <div className="absolute top-2 left-2">
          <span className="rounded-md bg-orange/90 px-2 py-0.5 text-[0.6rem] font-bold text-white backdrop-blur-sm">
            {guide.tag}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h2 className="text-lg font-semibold mb-2 group-hover:text-teal transition-colors">
          {guide.title}
        </h2>
        <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">{guide.desc}</p>
      </div>
    </Link>
  );
}
