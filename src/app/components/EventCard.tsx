"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1540575467063-178bf50d2f57?w=600&q=80";

interface EventCardProps {
  name: string;
  date: string;
  venue: string;
  area: string;
  desc: string;
  image: string;
  price?: string;
  url?: string;
}

export default function EventCard({
  name,
  date,
  venue,
  area,
  desc,
  image,
  price,
  url = "#",
}: EventCardProps) {
  const [imgSrc, setImgSrc] = useState(image);
  return (
    <Link href={url} className="group block overflow-hidden rounded-xl border border-slate-200 bg-white hover:border-teal/30 hover:bg-teal/5 transition-all shadow-sm">
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <Image
          src={imgSrc}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          onError={() => setImgSrc(FALLBACK_IMAGE)}
        />
        <div className="absolute top-2 left-2 flex gap-1.5">
          <span className="rounded-md bg-orange/90 px-2 py-0.5 text-[0.6rem] font-bold text-white backdrop-blur-sm">
            {date}
          </span>
          <span className="rounded-md bg-black/60 px-2 py-0.5 text-[0.6rem] font-medium text-white/90 backdrop-blur-sm">
            {area}
          </span>
        </div>
        {price && (
          <div className="absolute bottom-2 left-2 rounded-lg bg-black/60 backdrop-blur-sm px-2 py-1 text-[0.7rem] font-semibold text-amber-200">
            {price}
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-htdark group-hover:text-teal transition-colors mb-0.5">{name}</h3>
        <p className="text-[0.7rem] text-slate-500 mb-2">{venue}</p>
        <p className="text-sm text-slate-600 line-clamp-2">{desc}</p>
      </div>
    </Link>
  );
}
