import { NextResponse } from "next/server";

const ORLANDO_LAT = 28.5383;
const ORLANDO_LON = -81.3792;

/** WeatherAPI.com allows commercial use (ads). Open-Meteo free tier is non-commercial only. */
export async function GET() {
  try {
    const key = process.env.WEATHERAPI_KEY;
    if (key) {
      const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${key}&q=${ORLANDO_LAT},${ORLANDO_LON}`
      );
      const data = (await res.json()) as {
        current?: { temp_f?: number; condition?: { text?: string } };
      };
      const c = data?.current;
      if (c) {
        return NextResponse.json({
          temp: Math.round(c.temp_f ?? 0),
          desc: c.condition?.text ?? "—",
        });
      }
    }
    // Fallback: Open-Meteo (non-commercial only — switch to WeatherAPI for ads)
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${ORLANDO_LAT}&longitude=${ORLANDO_LON}&current=temperature_2m,weather_code&temperature_unit=fahrenheit&timezone=America/New_York`
    );
    const data = (await res.json()) as {
      current?: { temperature_2m?: number; weather_code?: number };
    };
    const current = data?.current;
    if (!current) throw new Error("No weather data");
    const temp = Math.round(current.temperature_2m ?? 0);
    const desc = weatherCodeToDesc(current.weather_code ?? 0);
    return NextResponse.json({ temp, desc });
  } catch (e) {
    return NextResponse.json(
      { temp: null, desc: "—", error: String(e) },
      { status: 500 }
    );
  }
}

function weatherCodeToDesc(code: number): string {
  if (code === 0) return "Clear";
  if (code <= 3) return "Partly cloudy";
  if (code <= 48) return "Foggy";
  if (code <= 67) return "Rainy";
  if (code <= 77) return "Snow";
  if (code <= 82) return "Showers";
  if (code <= 86) return "Thunderstorms";
  return "Variable";
}
