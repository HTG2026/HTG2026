import { NextRequest, NextResponse } from "next/server";
import { fetchPlacePhoto } from "@/lib/place-photos";
import { getPlacePhoto, setPlacePhoto } from "@/lib/redis";

export async function GET(req: NextRequest) {
  const name = req.nextUrl.searchParams.get("name");
  const area = req.nextUrl.searchParams.get("area");
  if (!name || !area) {
    return NextResponse.json({ error: "Missing name or area" }, { status: 400 });
  }

  // Check cache first
  const cached = await getPlacePhoto(name, area);
  if (cached) {
    return NextResponse.json({ url: cached });
  }

  const result = await fetchPlacePhoto(name, area);
  if (!result) {
    return NextResponse.json({ url: null });
  }

  // Proxy URLs stay relative; external URLs (Yelp, Foursquare) are already absolute
  const url = result.url;
  await setPlacePhoto(name, area, url);

  return NextResponse.json({ url });
}
