"use client";

import Image from "next/image";
import Link from "next/link";

interface PlaceCardProps {
  name: string;
  area: string;
  desc: string;
  rating: number;
  reviewCount: number;
  image: string;
  category: string;
  priceRange?: string;
  badge?: string;
  href?: string;
}

export default function PlaceCard({
  name,
  area,
  desc,
  rating,
  reviewCount,
  image,
  category,
  priceRange,
  badge,
  href = "#",
}: PlaceCardProps) {
  const content = (
    <div className="group block overflow-hidden rounded-xl border border-white/10 bg-htcard/50 hover:border-teal/30 hover:bg-teal/5 hover:shadow-xl hover:shadow-teal/5 transition-all duration-300">
      <div className="relative aspect-[4/3] overflow-hidden bg-white/5">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute top-2 left-2 flex gap-1.5">
          {badge && (
            <span className="rounded-md bg-orange/90 px-2 py-0.5 text-[0.6rem] font-bold text-white backdrop-blur-sm">
              {badge}
            </span>
          )}
          <span className="rounded-md bg-black/50 px-2 py-0.5 text-[0.6rem] font-medium text-white/90 backdrop-blur-sm">
            {category}
          </span>
        </div>
        <div className="absolute bottom-2 left-2 right-2 flex items-center gap-2">
          <div className="rounded-lg bg-black/60 backdrop-blur-sm px-2 py-1 flex items-center gap-1.5">
            <span className="text-[0.7rem] font-bold text-teal">{rating.toFixed(1)}</span>
            <span className="text-[0.55rem] text-gold">★</span>
            <span className="text-[0.6rem] text-white/80">({reviewCount.toLocaleString()})</span>
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-white group-hover:text-teal transition-colors mb-0.5">{name}</h3>
        <p className="text-[0.7rem] text-white/40 mb-2">{area}</p>
        <p className="text-sm text-white/55 line-clamp-2">{desc}</p>
        {priceRange && (
          <p className="mt-2 text-[0.7rem] text-gold font-medium">{priceRange}</p>
        )}
      </div>
    </div>
  );

  const isExternal = href?.startsWith("http");
  if (href && !isExternal) return <Link href={href}>{content}</Link>;
  if (href && isExternal)
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="block">
        {content}
      </a>
    );
  return content;
}
