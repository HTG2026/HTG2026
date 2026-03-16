import type { Metadata, Viewport } from "next";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import JsonLd from "./components/JsonLd";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://happy-traveler.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "The Happy Traveler — Orlando & Central Florida's Insider Guide",
    template: "%s | The Happy Traveler",
  },
  description: "Orlando restaurants, Magical Dining, theme park hacks, hidden bars, and local experiences. Plan your perfect Central Florida day with real Orlando data.",
  keywords: ["Orlando", "Central Florida", "Magical Dining", "Disney", "Universal", "Orlando restaurants", "Orlando nightlife", "Cocoa Beach", "Tampa", "theme park tips", "Orlando travel"],
  authors: [{ name: "The Happy Traveler" }],
  creator: "The Happy Traveler",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "The Happy Traveler",
    title: "The Happy Traveler — Orlando & Central Florida's Insider Guide",
    description: "Real park hacks, Magical Dining restaurants, hidden spots. Plan your perfect Orlando day.",
    images: [{ url: "/logo.png", width: 400, height: 120, alt: "The Happy Traveler" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Happy Traveler — Orlando's Insider Guide",
    description: "Real park hacks, Magical Dining, hidden spots. Plan your perfect Orlando day.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: SITE_URL },
  category: "travel",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#07090B",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <JsonLd />
      </head>
      <body className="antialiased min-h-screen flex flex-col font-body bg-htdark text-white">
        <header className="fixed top-0 left-0 right-0 z-[800] flex items-center justify-between px-4 sm:px-10 py-3 bg-[rgba(7,9,11,.95)] backdrop-blur-xl border-b border-white/[0.08]">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image src="/logo.png" alt="The Happy Traveler" width={140} height={40} className="h-9 w-auto" />
          </Link>
          <nav className="flex flex-wrap items-center gap-1 sm:gap-2">
            <Link href="/" className="text-[.78rem] font-medium text-white/50 hover:text-white hover:bg-white/8 px-3 py-1.5 rounded-full transition-all">
              Home
            </Link>
            <Link href="/explore" className="text-[.78rem] font-medium text-white/50 hover:text-white hover:bg-white/8 px-3 py-1.5 rounded-full transition-all">
              Explore
            </Link>
            <Link href="/theme-parks" className="text-[.78rem] font-medium text-white/50 hover:text-white hover:bg-white/8 px-3 py-1.5 rounded-full transition-all">
              Theme Parks
            </Link>
            <Link href="/tips-guides" className="text-[.78rem] font-medium text-white/50 hover:text-white hover:bg-white/8 px-3 py-1.5 rounded-full transition-all">
              Tips & Guides
            </Link>
            <Link href="/plan-my-day" className="text-[.78rem] font-medium text-teal border border-teal/35 hover:bg-teal/10 px-3 py-1.5 rounded-full transition-all">
              Plan My Day ✨
            </Link>
            <Link href="/map" className="text-[.78rem] font-medium text-white/50 hover:text-white hover:bg-white/8 px-3 py-1.5 rounded-full transition-all">
              Map
            </Link>
            <Link href="/flight-tracker" className="text-[.78rem] font-medium text-white/50 hover:text-white hover:bg-white/8 px-3 py-1.5 rounded-full transition-all">
              Flight Tracker
            </Link>
            <Link href="/contact" className="text-[.78rem] font-bold bg-orange text-white hover:bg-[#e04510] px-3 py-1.5 rounded-full transition-all">
              Contact
            </Link>
          </nav>
        </header>
        <main className="flex-1 pt-16 sm:pt-20">
          {children}
        </main>
        <footer className="bg-[#040607] border-t border-[rgba(255,255,255,.07)] py-12 px-6 sm:px-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <div className="mb-2">
              <Image src="/logo.png" alt="The Happy Traveler" width={120} height={34} className="h-8 w-auto" />
            </div>
            <p className="text-[.76rem] text-white/30 leading-relaxed">
              Central Florida&apos;s insider guide. Orlando, Cocoa, Tampa. Real hacks, hidden spots, local knowledge.
            </p>
          </div>
          <div>
            <h4 className="text-[.62rem] font-extrabold tracking-[2.2px] uppercase text-white/25 mb-3">Explore</h4>
            <Link href="/explore" className="block text-[.76rem] text-white/35 hover:text-teal mb-3 transition-colors">Local Businesses</Link>
            <Link href="/theme-parks" className="block text-[.76rem] text-white/35 hover:text-teal mb-3 transition-colors">Theme Parks</Link>
            <Link href="/tips-guides" className="block text-[.76rem] text-white/35 hover:text-teal mb-3 transition-colors">Tips & Guides</Link>
            <Link href="/map" className="block text-[.76rem] text-white/35 hover:text-teal mb-3 transition-colors">Orlando Map</Link>
            <Link href="/flight-tracker" className="block text-[.76rem] text-white/35 hover:text-teal transition-colors">Flight Tracker</Link>
          </div>
          <div>
            <h4 className="text-[.62rem] font-extrabold tracking-[2.2px] uppercase text-white/25 mb-3">Connect</h4>
            <Link href="/contact" className="block text-[.76rem] text-white/35 hover:text-teal transition-colors">Contact</Link>
          </div>
        </footer>
        <div className="bg-[#040607] border-t border-white/5 py-3 px-6 sm:px-12 flex justify-between items-center">
          <span className="text-[.66rem] text-white/20">© {new Date().getFullYear()} The Happy Traveler. All rights reserved.</span>
        </div>
      </body>
    </html>
  );
}
