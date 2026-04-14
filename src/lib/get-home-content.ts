import { createClient } from "next-sanity";
import fallback from "../../content/home.json";

type HomeContent = typeof fallback;

function stripSanityMeta<T extends Record<string, unknown>>(doc: T): Omit<T, "_id" | "_type" | "_rev" | "_createdAt" | "_updatedAt"> {
  const { _id, _type, _rev, _createdAt, _updatedAt, ...rest } = doc as T & {
    _id?: string;
    _type?: string;
    _rev?: string;
    _createdAt?: string;
    _updatedAt?: string;
  };
  void _id;
  void _type;
  void _rev;
  void _createdAt;
  void _updatedAt;
  return rest as Omit<T, "_id" | "_type" | "_rev" | "_createdAt" | "_updatedAt">;
}

/**
 * Homepage copy: Sanity when configured, otherwise content/home.json.
 */
export async function getHomeContent(): Promise<HomeContent> {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  if (!projectId || projectId === "placeholder") {
    return fallback;
  }

  const client = createClient({
    projectId,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    apiVersion: "2024-01-01",
    useCdn: true,
  });

  try {
    const doc = await client.fetch<Record<string, unknown> | null>(
      `*[_type == "homePage"][0]`
    );
    if (!doc) return fallback;
    return stripSanityMeta(doc) as HomeContent;
  } catch {
    return fallback;
  }
}
