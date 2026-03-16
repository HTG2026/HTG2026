/**
 * Business model — for future business profiles & claimed listings.
 * Extends Place with ownership, verification, payments.
 */

import type { PlaceType } from "@/data/places";

export interface Business {
  id: string;
  slug: string;
  name: string;
  type: PlaceType;
  area: string;
  description: string;
  images: string[];
  priceRange: string;
  badge?: string;
  bookUrl?: string;

  // Extended fields for claimed businesses
  contact?: {
    email?: string;
    phone?: string;
    address?: string;
  };
  hours?: Record<string, string>;
  verified: boolean;
  ownerId?: string;
  stripeAccountId?: string;

  createdAt: Date;
  updatedAt: Date;
}
