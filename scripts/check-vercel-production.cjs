#!/usr/bin/env node
/**
 * Confirms the production URL responds with a real Vercel deployment (not DEPLOYMENT_NOT_FOUND).
 * Reads NEXT_PUBLIC_SITE_URL from .env.local or the environment.
 */
const fs = require("fs");
const path = require("path");

function readEnvLocal() {
  const p = path.join(__dirname, "..", ".env.local");
  if (!fs.existsSync(p)) return null;
  const text = fs.readFileSync(p, "utf8");
  const m = text.match(/^NEXT_PUBLIC_SITE_URL=(.+)$/m);
  if (!m) return null;
  return m[1].trim().replace(/^["']|["']$/g, "");
}

async function main() {
  const fromCli = process.argv[2];
  let url = fromCli || process.env.NEXT_PUBLIC_SITE_URL || readEnvLocal();

  if (!url || url.includes("your-domain")) {
    console.error(
      "No production URL configured.\n" +
        "  • Set NEXT_PUBLIC_SITE_URL in Vercel (Project → Settings → Environment Variables)\n" +
        "  • Copy the exact URL from Vercel → Deployments → your latest Production deployment\n" +
        "  • Put the same value in .env.local locally, then run:\n" +
        "      npm run check:vercel\n" +
        "  • Or: npm run check:vercel -- https://your-project.vercel.app"
    );
    process.exit(1);
  }

  if (!/^https?:\/\//i.test(url)) url = `https://${url}`;
  let target;
  try {
    target = new URL(url);
  } catch {
    console.error("Invalid URL:", url);
    process.exit(1);
  }

  console.log("Checking:", target.origin + "/");

  const res = await fetch(target.origin + "/", {
    redirect: "follow",
    headers: { "user-agent": "happy-traveler-check-vercel/1.0" },
  });

  const vercelErr = res.headers.get("x-vercel-error");
  const status = res.status;

  if (vercelErr === "DEPLOYMENT_NOT_FOUND" || status === 404) {
    console.error(
      `FAIL: ${status} — ${vercelErr || "Not found"}\n` +
        "  This hostname is not serving your project. Use the exact .vercel.app (or custom domain) from the Vercel dashboard."
    );
    process.exit(1);
  }

  if (!res.ok) {
    console.error(`FAIL: HTTP ${status}`);
    process.exit(1);
  }

  console.log(`OK: HTTP ${status} — Vercel is serving this URL (no DEPLOYMENT_NOT_FOUND).`);
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
