import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Happy Traveler",
  description: "Your guide to exploring Central Florida: Orlando, Cocoa, and Tampa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col">
        <header className="border-b border-gray-200 dark:border-gray-800">
          <nav className="max-w-6xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-4">
            <Link href="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">
              Happy Traveler
            </Link>
            <ul className="flex flex-wrap gap-6">
              <li><Link href="/" className="hover:underline">Home</Link></li>
              <li><Link href="/destinations" className="hover:underline">Destinations</Link></li>
              <li><Link href="/blog" className="hover:underline">Blog</Link></li>
              <li><Link href="/flight-tracker" className="hover:underline">Flight Tracker</Link></li>
              <li><Link href="/contact" className="hover:underline">Contact</Link></li>
            </ul>
          </nav>
        </header>
        <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="border-t border-gray-200 dark:border-gray-800 py-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Happy Traveler. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
