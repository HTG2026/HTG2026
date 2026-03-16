/**
 * User model — auth-ready for future implementation.
 * Use with NextAuth, Clerk, or similar.
 */

export interface User {
  id: string;
  email: string;
  name?: string | null;
  image?: string | null;
  emailVerified?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile extends User {
  favorites: string[];       // place IDs
  savedItineraries: string[];
  reviews?: string[];        // review IDs
}
