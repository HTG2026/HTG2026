/**
 * Canonical site URL for metadata, sitemap, and JSON-LD.
 *
 * Order:
 * 1. NEXT_PUBLIC_SITE_URL — set in Vercel or .env.local for a stable marketing domain.
 * 2. VERCEL_URL — injected on every Vercel build/deploy (https://vercel.com/docs/projects/environment-variables/system-environment-variables)
 * 3. http://localhost:3000 — local dev.
 *
 * Avoids a hardcoded *.vercel.app guess that triggers DEPLOYMENT_NOT_FOUND.
 */
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit && !explicit.includes("your-domain")) {
    return explicit.replace(/\/$/, "");
  }
  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) {
    const host = vercel.replace(/^https?:\/\//, "").replace(/\/$/, "");
    return `https://${host}`;
  }
  return "http://localhost:3000";
}
