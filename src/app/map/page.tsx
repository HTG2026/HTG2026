"use client";

import { useMemo, useState } from "react";
import { PLACES } from "@/data/places";
import { MAP_REGIONS, getPlacesByRegion } from "@/data/map-regions";

const TYPE_EMOJI: Record<string, string> = {
  restaurants: "🍽️",
  bars: "🍸",
  experiences: "🎯",
  museums: "🏛️",
  activities: "🚶",
  events: "🎉",
};

function MapMarker({
  place,
  index,
}: {
  place: (typeof PLACES)[0];
  index: number;
}) {
  const [hover, setHover] = useState(false);
  const hasLink = !!place.bookUrl;

  // Position within the marker grid (spread markers in a semi-random pattern)
  const row = Math.floor(index / 4);
  const col = index % 4;
  const x = 18 + col * 22 + (row % 2) * 8;
  const y = 28 + row * 18;

  const markerContent = (
    <g
      transform={`translate(${x}, ${y})`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ cursor: hasLink ? "pointer" : "default" }}
    >
      <circle
        r={hasLink ? 10 : 8}
        fill={hasLink ? "var(--teal)" : "rgba(255,255,255,0.3)"}
        stroke="rgba(255,255,255,0.5)"
        strokeWidth={1.5}
        className={hasLink ? "hover:fill-[#00d4d0] transition-colors" : ""}
      />
      <text
        y={3}
        textAnchor="middle"
        fontSize={8}
        fill="white"
        style={{ pointerEvents: "none" }}
      >
        {TYPE_EMOJI[place.type] || "•"}
      </text>
      {hover && (
        <g transform="translate(0, -24)">
          <rect
            x={-60}
            y={-12}
            width={120}
            height={hasLink ? 28 : 20}
            rx={4}
            fill="rgba(0,0,0,0.9)"
            stroke="var(--teal)"
            strokeWidth={1}
          />
          <text
            y={2}
            textAnchor="middle"
            fontSize={9}
            fill="white"
            style={{ pointerEvents: "none" }}
          >
            {place.name.length > 22 ? place.name.slice(0, 20) + "…" : place.name}
          </text>
          {hasLink && (
            <text y={14} textAnchor="middle" fontSize={7} fill="var(--teal)">
              Click to book →
            </text>
          )}
        </g>
      )}
    </g>
  );

  if (hasLink && place.bookUrl) {
    return (
      <a
        href={place.bookUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: "block" }}
      >
        {markerContent}
      </a>
    );
  }
  return markerContent;
}

function DistrictCard({
  region,
  places,
}: {
  region: (typeof MAP_REGIONS)[0];
  places: (typeof PLACES)[0][];
}) {
  return (
    <div
      className="relative overflow-hidden rounded-lg border-2 border-white/10 bg-black/40 backdrop-blur-sm transition-all hover:border-teal/40 hover:shadow-lg hover:shadow-teal/10"
      style={{
        background: `linear-gradient(135deg, ${region.color}88 0%, ${region.color}44 100%)`,
      }}
    >
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%" className="text-white">
          <defs>
            <pattern
              id={`grid-${region.id}`}
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 20 0 L 0 0 0 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#grid-${region.id})`} />
        </svg>
      </div>
      <div className="relative p-4">
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-white/90">
          {region.label}
        </h3>
        <p className="mb-4 text-[0.65rem] text-white/50">
          {places.length} spot{places.length !== 1 ? "s" : ""}
        </p>
        <svg
          viewBox="0 0 100 120"
          className="h-32 w-full min-w-0"
          preserveAspectRatio="xMidYMid meet"
        >
          {places.map((place, i) => (
            <MapMarker key={place.name} place={place} index={i} />
          ))}
        </svg>
      </div>
    </div>
  );
}

/** Region positions for unified map (viewBox 0 0 400 300) */
const REGION_POLYS: Record<string, string> = {
  kissimmee: "50,220 180,220 180,280 50,280",
  idrive: "180,180 280,180 280,260 180,260",
  drphillips: "180,100 320,100 320,180 180,180",
  winterpark: "80,20 200,20 200,100 80,100",
  baldwinpark: "200,60 280,60 280,120 200,120",
  downtown: "80,100 200,100 200,180 80,220 80,180",
};

/** Compact marker for unified map - click opens link */
function UnifiedMapMarker({ place, x, y }: { place: (typeof PLACES)[0]; x: number; y: number }) {
  const hasLink = !!place.bookUrl;
  const content = (
    <g transform={`translate(${x}, ${y})`}>
      <circle
        r={6}
        fill={hasLink ? "var(--teal)" : "rgba(255,255,255,0.4)"}
        stroke="rgba(255,255,255,0.6)"
        strokeWidth={1}
        className={hasLink ? "cursor-pointer hover:fill-[#00d4d0] transition-colors" : ""}
      />
    </g>
  );
  if (hasLink && place.bookUrl) {
    return (
      <a href={place.bookUrl} target="_blank" rel="noopener noreferrer" title={place.name}>
        {content}
      </a>
    );
  }
  return content;
}

function UnifiedMapView({
  placesByRegion,
}: {
  placesByRegion: Map<string, (typeof PLACES)[0][]>;
}) {
  const [hoverRegion, setHoverRegion] = useState<string | null>(null);

  const getMarkerPositions = (regionId: string, count: number) => {
    const pts = REGION_POLYS[regionId]?.split(" ").map((p) => p.split(",").map(Number)) ?? [];
    if (pts.length < 3) return [];
    const xs = pts.map((p) => p[0]);
    const ys = pts.map((p) => p[1]);
    const minX = Math.min(...xs) + 15;
    const maxX = Math.max(...xs) - 15;
    const minY = Math.min(...ys) + 20;
    const maxY = Math.max(...ys) - 15;
    const positions: [number, number][] = [];
    const cols = Math.ceil(Math.sqrt(count));
    const rows = Math.ceil(count / cols);
    for (let i = 0; i < count; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = minX + (col + 0.5) * ((maxX - minX) / cols);
      const y = minY + (row + 0.5) * ((maxY - minY) / rows);
      positions.push([x, y]);
    }
    return positions;
  };

  return (
    <div className="relative overflow-hidden rounded-xl border-2 border-white/15 bg-[#0d1117] p-2 shadow-2xl">
      <div className="absolute inset-0 opacity-30">
        <svg width="100%" height="100%" className="text-teal/20">
          <defs>
            <pattern
              id="map-grid"
              width="16"
              height="16"
              patternUnits="userSpaceOnUse"
            >
              <path d="M 16 0 L 0 0 0 16" fill="none" stroke="currentColor" strokeWidth="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#map-grid)" />
        </svg>
      </div>
      <svg
        viewBox="0 0 400 300"
        className="relative h-[280px] w-full sm:h-[360px]"
        preserveAspectRatio="xMidYMid meet"
      >
        {MAP_REGIONS.map((region) => {
          const points = REGION_POLYS[region.id];
          const isHover = hoverRegion === region.id;
          const [x0, y0] = points.split(" ")[0].split(",").map(Number);
          return (
            <g key={region.id}>
              <polygon
                points={points}
                fill={region.color}
                fillOpacity={isHover ? 0.9 : 0.6}
                stroke="rgba(255,255,255,0.4)"
                strokeWidth={2}
                className="transition-all cursor-default"
                onMouseEnter={() => setHoverRegion(region.id)}
                onMouseLeave={() => setHoverRegion(null)}
              />
              <text
                x={x0 + 4}
                y={y0 + 14}
                fontSize={9}
                fontWeight="bold"
                fill="white"
                className="uppercase tracking-wider"
              >
                {region.label.split(" / ")[0]}
              </text>
            </g>
          );
        })}
        {MAP_REGIONS.flatMap((region) => {
          const places = (placesByRegion.get(region.id) ?? []).slice(0, 12);
          const positions = getMarkerPositions(region.id, places.length);
          return places.map((place, i) => (
            <UnifiedMapMarker
              key={`${region.id}-${place.name}`}
              place={place}
              x={positions[i]?.[0] ?? 0}
              y={positions[i]?.[1] ?? 0}
            />
          ));
        })}
      </svg>
    </div>
  );
}

export default function MapPage() {
  const placesByRegion = useMemo(() => getPlacesByRegion(PLACES), []);

  return (
    <div className="min-h-screen bg-[#0a0e12]">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10">
          <div className="text-[.6rem] font-extrabold tracking-[3px] uppercase text-teal mb-2">
            Orlando Map
          </div>
          <h1 className="font-display text-[clamp(2.2rem,4vw,3.5rem)] leading-tight">
            <span className="text-white">GTA-Style</span>{" "}
            <span className="italic text-teal">Orlando</span>
          </h1>
          <p className="mt-3 max-w-xl text-sm text-white/50">
            Explore Orlando by region. Click any marker to reserve a table, book
            tickets, or get more info.
          </p>
        </div>

        <div className="mb-12">
          <UnifiedMapView placesByRegion={placesByRegion} />
        </div>

        <h2 className="mb-6 text-sm font-bold uppercase tracking-wider text-white/70">
          Districts — click markers to book
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {MAP_REGIONS.map((region) => (
            <DistrictCard
              key={region.id}
              region={region}
              places={placesByRegion.get(region.id) ?? []}
            />
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-4 rounded-xl border border-white/10 bg-black/30 p-4">
          <span className="text-[0.65rem] font-bold uppercase text-white/40">
            Legend
          </span>
          {Object.entries(TYPE_EMOJI).map(([type, emoji]) => (
            <span
              key={type}
              className="flex items-center gap-1.5 text-[0.7rem] text-white/60"
            >
              <span>{emoji}</span>
              <span className="capitalize">{type}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
