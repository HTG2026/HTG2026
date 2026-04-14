import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schema } from "./sanity/schemaTypes";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "happy-traveler",
  title: "Happy Traveler",
  projectId: projectId || "placeholder",
  dataset,
  plugins: [structureTool()],
  schema,
});
