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
      {/* Background split 60/40 */}
      <div className="absolute inset-0 flex">
        <div className="w-3/5 bg-[#542383]"></div>
        <div className="w-2/5 bg-[#F8D35B]"></div>
      </div>

      {/* Content */}
      <nav className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 text-white">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="font-bold text-lg">Jerseyपसल</span>
        </Link>

        {/* Desktop Nav */}
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

        {/* Desktop Auth Buttons */}
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

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-md border border-[#542383]"
        >
          {mobileOpen ? <span className="text-xl font-bold text-[#542383]">✕</span> : <span className="text-xl font-bold text-[#542383]">☰</span>}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden relative bg-gray-900">
          <div className="flex flex-col p-4 space-y-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`px-3 py-2 rounded-md font-medium hover:bg-gray-800 ${
                  isActive(link.href)
                    ? "underline text-yellow-200"
                    : "text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="flex flex-col mt-2 space-y-2">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="px-4 py-2 bg-[#542383] text-white rounded-md text-center hover:bg-gray-200"
              >
                Log in
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileOpen(false)}
                className="px-4 py-2 bg-white text-gray-900 rounded-md text-center hover:bg-gray-200"
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
