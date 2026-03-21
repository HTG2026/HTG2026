import type { Metadata, Viewport } from "next";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import JsonLd from "./components/JsonLd";
import ChunkLoadErrorBoundary from "./ChunkLoadErrorBoundary";
import ChunkLoadRecoveryScript from "./components/ChunkLoadRecoveryScript";
import WeatherWidget from "./components/WeatherWidget";
import MobileNav from "./components/MobileNav";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://happy-traveler.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "The Happy Traveler — Central Florida's Insider Guide",
    template: "%s | The Happy Traveler",
  },
  description: "Central Florida restaurants, theme park hacks, hidden bars, and local experiences. Plan your perfect day with real Orlando experiences. Orlando, Kissimmee, Lake Buena Vista, Winter Park, Baldwin Park, Dr Phillips, I-Drive.",
  keywords: ["Central Florida", "Orlando", "Kissimmee", "Lake Buena Vista", "Winter Park", "Baldwin Park", "Dr Phillips", "I-Drive", "Disney", "Universal", "Orlando restaurants", "Orlando nightlife", "Cocoa Beach", "Tampa", "theme park tips", "Orlando travel"],
  authors: [{ name: "The Happy Traveler" }],
  creator: "The Happy Traveler",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "The Happy Traveler",
    title: "The Happy Traveler — Central Florida's Insider Guide",
    description: "Real park hacks, hidden spots, local favorites. Plan your perfect Central Florida day.",
    images: [{ url: "/logo.png", width: 400, height: 120, alt: "The Happy Traveler" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Happy Traveler — Central Florida's Insider Guide",
    description: "Real park hacks, hidden spots, local favorites. Plan your perfect Central Florida day.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: SITE_URL },
  category: "travel",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FAFAFA",
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
        <ChunkLoadRecoveryScript />
      </head>
      <body className="antialiased min-h-screen flex flex-col font-body bg-htbg text-htdark">
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <header className="fixed top-0 left-0 right-0 z-[800] flex items-center justify-between px-6 sm:px-12 py-3 nav-glass border-b border-black/[0.06]">
          <div className="flex items-center gap-4 shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.png" alt="The Happy Traveler" width={140} height={40} className="h-9 w-auto" />
            </Link>
            <WeatherWidget />
          </div>
          <MobileNav />
        </header>
        <main id="main" className="flex-1 pt-16 sm:pt-20">
          <ChunkLoadErrorBoundary>{children}</ChunkLoadErrorBoundary>
        </main>
        <footer className="bg-slate-100 border-t border-slate-200 py-12 px-6 sm:px-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <div className="mb-2">
              <Image src="/logo.png" alt="The Happy Traveler" width={120} height={34} className="h-8 w-auto" />
            </div>
            <p className="text-[.76rem] text-slate-600 leading-relaxed">
              Central Florida&apos;s insider guide. Orlando, Kissimmee, Lake Buena Vista, Winter Park, Baldwin Park, Dr Phillips, I-Drive. Real hacks, hidden spots, local knowledge.
            </p>
          </div>
          <div>
            <h4 className="text-[.62rem] font-extrabold tracking-[3px] uppercase text-slate-500 mb-3">Explore</h4>
            <Link href="/explore" className="block text-[.76rem] text-slate-600 hover:text-teal py-2.5 transition-colors">Local Businesses</Link>
            <Link href="/theme-parks" className="block text-[.76rem] text-slate-600 hover:text-teal py-2.5 transition-colors">Theme Parks</Link>
            <Link href="/tips-guides" className="block text-[.76rem] text-slate-600 hover:text-teal py-2.5 transition-colors">Tips & Guides</Link>
            <Link href="/map" className="block text-[.76rem] text-slate-600 hover:text-teal py-2.5 transition-colors">Orlando Map</Link>
            <Link href="/shows" className="block text-[.76rem] text-slate-600 hover:text-teal py-2.5 transition-colors">Live Shows</Link>
          </div>
          <div>
            <h4 className="text-[.62rem] font-extrabold tracking-[3px] uppercase text-slate-500 mb-3">Connect</h4>
            <Link href="/contact" className="block text-[.76rem] text-slate-600 hover:text-teal py-2.5 transition-colors">Contact</Link>
          </div>
        </footer>
        <div className="bg-slate-100 border-t border-slate-200 py-3 px-6 sm:px-12 flex justify-between items-center">
          <span className="text-[.66rem] text-slate-500">© {new Date().getFullYear()} The Happy Traveler. All rights reserved.</span>
        </div>
      </body>
    </html>
  );
}
