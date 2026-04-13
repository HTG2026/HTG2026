import { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

const BASE = getSiteUrl();

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${BASE}/explore`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE}/theme-parks`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/tips-guides`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/plan-my-day`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/map`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.85 },
    { url: `${BASE}/shows`, lastModified: new Date(), changeFrequency: "daily", priority: 0.85 },
    { url: `${BASE}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];
}
