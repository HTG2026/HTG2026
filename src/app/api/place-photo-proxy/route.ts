import { NextRequest, NextResponse } from "next/server";

/**
 * Proxies Google Places photos so the API key stays server-side.
 * Client requests /api/place-photo-proxy?ref=PHOTO_REF
 * We fetch from Google and stream the image.
 */
export async function GET(req: NextRequest) {
  const ref = req.nextUrl.searchParams.get("ref");
  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!ref || !key) {
    return new NextResponse("Bad request", { status: 400 });
  }

  const googleUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=600&photo_reference=${encodeURIComponent(ref)}&key=${key}`;

  try {
    const res = await fetch(googleUrl, { redirect: "follow" });
    if (!res.ok) return new NextResponse("Photo not found", { status: 404 });
    const blob = await res.blob();
    const contentType = res.headers.get("content-type") || "image/jpeg";
    return new NextResponse(blob, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400, s-maxage=604800", // 1 day browser, 7 days CDN
      },
    });
  } catch {
    return new NextResponse("Failed to fetch photo", { status: 502 });
  }
}
