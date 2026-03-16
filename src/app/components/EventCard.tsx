"use client";

import Image from "next/image";
import Link from "next/link";

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
  return (
    <Link href={url} className="group block overflow-hidden rounded-xl border border-white/10 bg-htcard/50 hover:border-teal/30 hover:bg-teal/5 transition-all">
      <div className="relative aspect-[4/3] overflow-hidden bg-white/5">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute top-2 left-2 flex gap-1.5">
          <span className="rounded-md bg-orange/90 px-2 py-0.5 text-[0.6rem] font-bold text-white backdrop-blur-sm">
            {date}
          </span>
          <span className="rounded-md bg-black/50 px-2 py-0.5 text-[0.6rem] font-medium text-white/90 backdrop-blur-sm">
            {area}
          </span>
        </div>
        {price && (
          <div className="absolute bottom-2 left-2 rounded-lg bg-black/60 backdrop-blur-sm px-2 py-1 text-[0.7rem] font-semibold text-gold">
            {price}
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-white group-hover:text-teal transition-colors mb-0.5">{name}</h3>
        <p className="text-[0.7rem] text-white/40 mb-2">{venue}</p>
        <p className="text-sm text-white/55 line-clamp-2">{desc}</p>
      </div>
    </Link>
  );
}
