#!/usr/bin/env node
/**
 * GitHub Actions: deploy with Vercel CLI.
 * Prefer .vercel/project.json in the repo → only VERCEL_TOKEN needed in GitHub.
 * Else set VERCEL_ORG_ID + VERCEL_PROJECT_ID (legacy).
 */
import { readFileSync, existsSync, writeFileSync, mkdirSync } from "fs";
import { execSync } from "child_process";

function trim(s) {
  return String(s ?? "")
    .trim()
    .replace(/\r\n/g, "")
    .replace(/\n/g, "")
    .replace(/\r/g, "");
}

const token = trim(process.env.VERCEL_TOKEN);
if (!token) {
  console.error("Missing VERCEL_TOKEN.");
  process.exit(1);
}

let org;
let project;

if (existsSync(".vercel/project.json")) {
  try {
    const j = JSON.parse(readFileSync(".vercel/project.json", "utf8"));
    org = trim(j.orgId);
    project = trim(j.projectId);
  } catch {
    console.error("Invalid .vercel/project.json in repo.");
    process.exit(1);
  }
} else {
  org = trim(process.env.VERCEL_ORG_ID);
  project = trim(process.env.VERCEL_PROJECT_ID);
  if (!org || !project) {
    console.error(
      "No .vercel/project.json in repo. Either:\n" +
        "  • Run: npx vercel link && git add .vercel/project.json && git push (then only VERCEL_TOKEN in GitHub), or\n" +
        "  • Set GitHub secrets VERCEL_ORG_ID + VERCEL_PROJECT_ID\n" +
        "See docs/SIMPLE_DEPLOY.md"
    );
    process.exit(1);
  }
  mkdirSync(".vercel", { recursive: true });
  writeFileSync(
    ".vercel/project.json",
    JSON.stringify({ orgId: org, projectId: project })
  );
}

if (!project.startsWith("prj_")) {
  console.warn(
    "WARN: project id usually starts with prj_ — check Vercel → Settings → General → Project ID."
  );
}

function sh(cmd) {
  console.log(">>", cmd.replaceAll(token, "***"));
  execSync(cmd, { stdio: "inherit", shell: "/bin/bash" });
}

const t = JSON.stringify(token);
const o = JSON.stringify(org);

process.env.NEXT_TELEMETRY_DISABLED = "1";

try {
  sh(`npx vercel@latest whoami --token ${t}`);
} catch {
  console.error(
    "Token check failed — new token: https://vercel.com/account/tokens"
  );
  process.exit(1);
}

function deploy(extra = "") {
  sh(`npx vercel@latest deploy --prod --yes --token ${t} ${extra}`.trim());
}

try {
  deploy();
} catch {
  console.log("::notice::Retrying deploy with --scope…");
  try {
    deploy(`--scope ${o}`);
  } catch {
    process.exit(1);
  }
}
