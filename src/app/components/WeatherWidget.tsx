"use client";

import { useEffect, useState } from "react";

interface Weather {
  temp: number | null;
  desc: string;
  humidity?: number;
}

export default function WeatherWidget() {
  const [weather, setWeather] = useState<Weather | null>(null);

  useEffect(() => {
    fetch("/api/weather")
      .then((r) => r.json())
      .then((d) => setWeather({ temp: d.temp, desc: d.desc, humidity: d.humidity }))
      .catch(() => setWeather(null));
  }, []);

  if (!weather) return null;

  return (
    <div className="flex items-center gap-2 text-slate-600 text-sm">
      <span className="text-lg" aria-hidden>
        {weather.temp != null ? "🌡️" : "—"}
      </span>
      <span>
        {weather.temp != null ? `${weather.temp}°F` : "—"} Orlando
      </span>
      <span className="text-slate-500 text-xs hidden sm:inline">{weather.desc}</span>
    </div>
  );
}
