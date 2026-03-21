"use client";

import { useState } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/theme-parks", label: "Theme Parks" },
  { href: "/tips-guides", label: "Tips & Guides" },
  { href: "/plan-my-day", label: "Plan My Day ✨" },
  { href: "/map", label: "Map" },
  { href: "/shows", label: "Live Shows" },
  { href: "/contact", label: "Contact" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger — visible on mobile only */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="lg:hidden flex flex-col justify-center items-center w-11 h-11 rounded-lg hover:bg-slate-100 transition-colors touch-manipulation"
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
      >
        <span
          className={`block w-5 h-0.5 bg-htdark rounded-full transition-all ${
            open ? "rotate-45 translate-y-1" : ""
          }`}
        />
        <span
          className={`block w-5 h-0.5 bg-htdark rounded-full my-1 transition-all ${
            open ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block w-5 h-0.5 bg-htdark rounded-full transition-all ${
            open ? "-rotate-45 -translate-y-1.5" : ""
          }`}
        />
      </button>

      {/* Desktop nav — hidden on mobile */}
      <nav className="hidden lg:flex flex-wrap items-center gap-1 sm:gap-2">
        {NAV_LINKS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center text-[.78rem] font-medium text-slate-600 hover:text-htdark hover:bg-slate-100 px-3 py-2.5 rounded-full transition-all"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Mobile overlay + menu */}
      {open && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black/20 z-[850]"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <nav
            className="lg:hidden fixed top-[52px] left-0 right-0 bg-white border-b border-slate-200 shadow-lg z-[900] max-h-[calc(100vh-52px)] overflow-y-auto"
            role="navigation"
            aria-label="Main"
          >
            <div className="py-2 px-6">
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center min-h-[48px] px-4 py-3 text-[.9rem] font-medium text-htdark hover:bg-slate-50 rounded-lg transition-colors touch-manipulation"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        </>
      )}
    </>
  );
}
