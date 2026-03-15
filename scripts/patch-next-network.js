#!/usr/bin/env node
/**
 * Patches Next.js get-network-host to handle uv_interface_addresses errors
 * (e.g. on some macOS/Node versions). Prevents dev server crash.
 */
const fs = require("fs");
const path = require("path");

const files = [
  "node_modules/next/dist/lib/get-network-host.js",
  "node_modules/next/dist/esm/lib/get-network-host.js",
];

const patterns = [
  {
    search: "const interfaces = _os.default.networkInterfaces();",
    replace: `let interfaces;
    try {
        interfaces = _os.default.networkInterfaces();
    } catch {
        return [];
    }`,
  },
  {
    search: "const interfaces = os.networkInterfaces();",
    replace: `let interfaces;
    try {
        interfaces = os.networkInterfaces();
    } catch {
        return [];
    }`,
  },
];

for (const file of files) {
  const fullPath = path.join(__dirname, "..", file);
  if (!fs.existsSync(fullPath)) continue;
  let content = fs.readFileSync(fullPath, "utf8");
  if (content.includes("} catch {") && content.includes("return [];")) continue; // already patched
  for (const { search, replace } of patterns) {
    if (content.includes(search)) {
      content = content.replace(search, replace);
      fs.writeFileSync(fullPath, content);
      console.log("Patched:", file);
      break;
    }
  }
}
