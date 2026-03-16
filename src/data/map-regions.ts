/**
 * Orlando map regions for GTA-style map.
 * Maps place areas to focus regions.
 */

import type { Place } from "./places";

export type MapRegionId =
  | "kissimmee"
  | "idrive"
  | "drphillips"
  | "winterpark"
  | "baldwinpark"
  | "downtown";

export interface MapRegion {
  id: MapRegionId;
  label: string;
  /** SVG path or polygon points for district shape */
  color: string;
  /** Areas that belong to this region */
  areas: string[];
}

/** Map place area -> region id */
const AREA_TO_REGION: Record<string, MapRegionId> = {
  "Kissimmee": "kissimmee",
  "Kenansville": "kissimmee",
  "Lake Buena Vista": "kissimmee",
  "I-Drive": "idrive",
  "Dr Phillips": "drphillips",
  "Grande Lakes": "drphillips",
  "Winter Park": "winterpark",
  "East End Market": "winterpark",
  "Apopka": "winterpark",
  "Baldwin Park": "baldwinpark",
  "Downtown Orlando": "downtown",
  "Thornton Park": "downtown",
  "Mills 50": "downtown",
  "Ivanhoe": "downtown",
  "Milk District": "downtown",
  "Audubon Park": "downtown",
  "Loch Haven": "downtown",
  "Cocoa Beach": "kissimmee", // Day trip, grouped with south
};

export const MAP_REGIONS: MapRegion[] = [
  {
    id: "kissimmee",
    label: "Kissimmee / Lake Buena Vista",
    color: "#1a4d3d",
    areas: ["Kissimmee", "Kenansville", "Lake Buena Vista", "Cocoa Beach"],
  },
  {
    id: "idrive",
    label: "I-Drive",
    color: "#2d3a4a",
    areas: ["I-Drive"],
  },
  {
    id: "drphillips",
    label: "Dr Phillips",
    color: "#3d2d4a",
    areas: ["Dr Phillips", "Grande Lakes"],
  },
  {
    id: "winterpark",
    label: "Winter Park",
    color: "#2d4a3d",
    areas: ["Winter Park", "East End Market", "Apopka"],
  },
  {
    id: "baldwinpark",
    label: "Baldwin Park",
    color: "#2d3d4a",
    areas: ["Baldwin Park"],
  },
  {
    id: "downtown",
    label: "Downtown",
    color: "#4a2d3d",
    areas: ["Downtown Orlando", "Thornton Park", "Mills 50", "Ivanhoe", "Milk District", "Audubon Park", "Loch Haven"],
  },
];

export function getRegionForPlace(place: Place): MapRegionId | null {
  return AREA_TO_REGION[place.area] ?? null;
}

export function getPlacesByRegion(places: Place[]): Map<MapRegionId, Place[]> {
  const byRegion = new Map<MapRegionId, Place[]>();
  for (const place of places) {
    const region = getRegionForPlace(place);
    if (region) {
      const list = byRegion.get(region) ?? [];
      list.push(place);
      byRegion.set(region, list);
    }
  }
  return byRegion;
}
