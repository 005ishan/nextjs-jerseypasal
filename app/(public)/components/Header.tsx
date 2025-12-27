"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  return (
    <header className="relative sticky top-0 z-50">
      <div className="absolute inset-0 flex">
        <div className="w-3/5 bg-[#542383]"></div>
        <div className="w-2/5 bg-[#F8D35B]"></div>
      </div>

      <nav className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 text-white">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-bold text-lg">Jerseyपसल</span>
        </Link>

        <div className="hidden md:flex space-x-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium hover:text-yellow-200 transition ${
                isActive(link.href) ? "underline" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex space-x-3">
          <Link
            href="/login"
            className="px-4 py-2 bg-[#542383] text-wihte rounded-md text-sm hover:bg-black transition"
          >
            Log in
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 bg-white text-gray-900 rounded-md text-sm hover:bg-black hover:text-amber-50 transition"
          >
            Sign up
          </Link>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-md"
        >
          {mobileOpen ? "╳" : "☰"}
        </button>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
          />

          {/* Sidebar */}
          <div className="relative w-64 bg-gray-900 text-white p-6 flex flex-col space-y-4 animate-slide-in-right">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`px-3 py-2 rounded-md font-medium hover:bg-gray-800 ${
                  isActive(link.href) ? "underline text-yellow-300" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="mt-auto flex flex-col space-y-2">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="px-4 py-2 bg-[#542383] text-white rounded-full text-center hover:bg-yellow-400 transition"
              >
                Log in
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileOpen(false)}
                className="px-4 py-2 bg-white text-gray-900 rounded-full text-center hover:bg-gray-200 transition"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
