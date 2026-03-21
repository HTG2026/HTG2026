#!/usr/bin/env node
/**
 * GitHub Actions helper: link project + whoami + deploy with retries.
 * Trims secrets (common copy/paste newline issue).
 */
import { writeFileSync, mkdirSync } from "fs";
import { execSync } from "child_process";

function trim(s) {
  return String(s ?? "")
    .trim()
    .replace(/\r\n/g, "")
    .replace(/\n/g, "")
    .replace(/\r/g, "");
}

const token = trim(process.env.VERCEL_TOKEN);
const org = trim(process.env.VERCEL_ORG_ID);
const project = trim(process.env.VERCEL_PROJECT_ID);

if (!token || !org || !project) {
  console.error(
    "Missing VERCEL_TOKEN, VERCEL_ORG_ID, or VERCEL_PROJECT_ID (after trim)."
  );
  process.exit(1);
}

if (!project.startsWith("prj_")) {
  console.warn(
    "WARN: VERCEL_PROJECT_ID usually starts with prj_ — you may have pasted the project name instead of Project ID."
  );
}

mkdirSync(".vercel", { recursive: true });
writeFileSync(
  ".vercel/project.json",
  JSON.stringify({ orgId: org, projectId: project })
);

function sh(cmd) {
  const safe = cmd.replaceAll(token, "***");
  console.log(">>", safe);
  execSync(cmd, { stdio: "inherit", shell: "/bin/bash" });
}

const t = JSON.stringify(token);
const o = JSON.stringify(org);

process.env.NEXT_TELEMETRY_DISABLED = "1";

try {
  sh(`npx vercel@latest whoami --token ${t}`);
} catch {
  console.error("Token check failed — create a new token at https://vercel.com/account/tokens");
  process.exit(1);
}

function deploy(extra = "") {
  sh(`npx vercel@latest deploy --prod --yes --token ${t} ${extra}`.trim());
}

try {
  deploy();
} catch (e) {
  console.log("::notice::First deploy failed; retrying with --scope (team id)…");
  try {
    deploy(`--scope ${o}`);
  } catch {
    process.exit(1);
  }
}
