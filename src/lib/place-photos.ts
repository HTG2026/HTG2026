/**
 * Place photo fetchers — Google Places, Yelp, Foursquare.
 * Returns the best available photo URL for a place.
 */

const ORLANDO_LAT = 28.5383;
const ORLANDO_LON = -81.3792;

export interface PlacePhotoResult {
  url: string;
  /** True if URL goes through our proxy (Google) */
  proxy?: boolean;
  provider?: "google" | "yelp" | "foursquare";
}

/** Google Places API — Find Place + Photo. Returns photo_reference for proxy. */
export async function fetchGooglePlacePhoto(
  name: string,
  area: string
): Promise<{ proxyRef: string } | null> {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!key) return null;

  const query = `${name} ${area} Orlando FL`;
  const findUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(query)}&inputtype=textquery&fields=place_id,photos&key=${key}`;

  try {
    const res = await fetch(findUrl);
    const data = (await res.json()) as {
      candidates?: Array<{ place_id?: string; photos?: Array<{ photo_reference?: string }> }>;
    };
    const candidate = data.candidates?.[0];
    const photoRef = candidate?.photos?.[0]?.photo_reference;
    if (photoRef) return { proxyRef: photoRef };
  } catch {
    // ignore
  }
  return null;
}

/** Yelp Fusion API — Business Search. Returns direct image URL. */
export async function fetchYelpPlacePhoto(
  name: string,
  area: string
): Promise<PlacePhotoResult | null> {
  const key = process.env.YELP_API_KEY;
  if (!key) return null;

  const url = `https://api.yelp.com/v3/businesses/search?term=${encodeURIComponent(name)}&location=${encodeURIComponent(area)}, Orlando, FL&limit=1`;

  try {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${key}` },
    });
    const data = (await res.json()) as {
      businesses?: Array<{ image_url?: string }>;
    };
    const img = data.businesses?.[0]?.image_url;
    if (img) return { url: img, provider: "yelp" };
  } catch {
    // ignore
  }
  return null;
}

/** Foursquare Places API v3 — Search + Photos. Returns assembled URL. */
export async function fetchFoursquarePlacePhoto(
  name: string,
  area: string
): Promise<PlacePhotoResult | null> {
  const key = process.env.FOURSQUARE_API_KEY;
  if (!key) return null;

  const searchUrl = `https://api.foursquare.com/v3/places/search?query=${encodeURIComponent(name)}&ll=${ORLANDO_LAT},${ORLANDO_LON}&limit=1`;

  try {
    const searchRes = await fetch(searchUrl, {
      headers: {
        Authorization: key,
        "Accept": "application/json",
      },
    });
    const searchData = (await searchRes.json()) as {
      results?: Array<{ fsq_id?: string }>;
    };
    const fsqId = searchData.results?.[0]?.fsq_id;
    if (!fsqId) return null;

    const photosUrl = `https://api.foursquare.com/v3/places/${fsqId}/photos?limit=1&sort=POPULAR`;
    const photosRes = await fetch(photosUrl, {
      headers: {
        Authorization: key,
        "Accept": "application/json",
      },
    });
    const photosData = (await photosRes.json()) as
      | Array<{ prefix?: string; suffix?: string }>
      | { photos?: Array<{ prefix?: string; suffix?: string }> };
    const arr = Array.isArray(photosData)
      ? photosData
      : photosData?.photos ?? [];
    const photo = arr[0];
    const prefix = photo?.prefix;
    const suffix = photo?.suffix;
    if (prefix && suffix) {
      const url = `${prefix}600x600${suffix}`;
      return { url, provider: "foursquare" };
    }
  } catch {
    // ignore
  }
  return null;
}

/** Fetch best available photo. Tries Google (proxy) → Yelp → Foursquare. */
export async function fetchPlacePhoto(
  name: string,
  area: string
): Promise<PlacePhotoResult | null> {
  // Google (returns proxy ref — caller must build proxy URL)
  const google = await fetchGooglePlacePhoto(name, area);
  if (google) {
    return {
      url: `/api/place-photo-proxy?ref=${encodeURIComponent(google.proxyRef)}`,
      proxy: true,
      provider: "google",
    };
  }

  // Yelp
  const yelp = await fetchYelpPlacePhoto(name, area);
  if (yelp) return yelp;

  // Foursquare
  const fsq = await fetchFoursquarePlacePhoto(name, area);
  if (fsq) return fsq;

  return null;
}
