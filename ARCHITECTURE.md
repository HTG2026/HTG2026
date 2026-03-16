# Happy Traveler — Architecture & Design System

World-class structure for payments, business profiles, and user profiles.

---

## 1. Information Architecture

```
/                     → Home (discovery, search)
/explore              → Browse places & events
/explore/[slug]       → Business/place detail (future: business profile)
/plan-my-day          → AI itinerary builder
/map                  → GTA-style map
/theme-parks          → Theme park tips
/tips-guides          → Travel guides
/flight-tracker       → Flight tracking
/contact              → Contact

# Future routes (auth-ready)
/account              → User profile, favorites, saved itineraries
/account/login        → Sign in
/account/signup       → Sign up
/business             → Business dashboard (claim listing, analytics)
/business/[id]        → Public business profile
/checkout             → Payment flow (reservations, bookings)
```

---

## 2. Data Models (Future)

### User
```ts
interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  favorites: string[];      // place IDs
  savedItineraries: string[];
  createdAt: Date;
}
```

### Business
```ts
interface Business {
  id: string;
  name: string;
  slug: string;
  type: PlaceType;
  area: string;
  description: string;
  images: string[];
  contact: { email, phone, address };
  hours?: Record<string, string>;
  verified: boolean;
  ownerId?: string;        // user ID when claimed
  stripeAccountId?: string; // for payouts
}
```

### Payment
```ts
// Stripe-ready structure
interface PaymentIntent {
  id: string;
  amount: number;          // cents
  currency: string;
  status: 'pending' | 'succeeded' | 'failed';
  metadata: { bookingId, userId, businessId };
}
```

---

## 3. Design Principles

| Principle | Implementation |
|-----------|-----------------|
| **Clarity** | Clear hierarchy, scannable content, obvious CTAs |
| **Consistency** | 8px grid, type scale, shared components |
| **Accessibility** | WCAG AA, focus states, semantic HTML |
| **Performance** | Lazy load, skeleton states, optimize images |
| **Delight** | Subtle motion, micro-interactions, feedback |
| **Trust** | Verified badges, clear pricing, secure indicators |

---

## 4. Component Hierarchy

```
Layout
├── Header (nav, search, account CTA)
├── Main (page content)
└── Footer

Page
├── PageHeader (title, breadcrumb)
├── Section (Container + heading)
└── Content (grid, list, etc.)

Primitives
├── Button (primary, secondary, ghost)
├── Card (elevated, outlined)
├── Input, Select, Textarea
├── Skeleton (loading state)
└── EmptyState (no results)
```

---

## 5. Tech Stack (Current + Planned)

| Layer | Current | Future |
|-------|---------|--------|
| Auth | — | NextAuth.js or Clerk |
| DB | — | PostgreSQL (Vercel Postgres / Supabase) |
| Payments | — | Stripe |
| Storage | — | Vercel Blob / S3 for images |
| Cache | Upstash Redis | Same |

---

## 6. File Structure (Target)

```
src/
├── app/
│   ├── (auth)/           # Auth routes
│   ├── (dashboard)/      # Protected: account, business
│   ├── api/
│   └── ...
├── components/
│   ├── ui/               # Primitives (Button, Card, etc.)
│   ├── layout/           # Header, Footer, Container
│   └── features/         # PlaceCard, EventCard, etc.
├── lib/
│   ├── auth.ts
│   ├── db.ts
│   └── stripe.ts
├── design-system/
│   └── tokens.ts
└── types/
    ├── user.ts
    ├── business.ts
    └── payment.ts
```
