"use client";

import { useState } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { id: "adult", label: "Adult", href: "/adult" },
  { id: "kid", label: "Kid", href: "/kid" },
  { id: "cart", label: "Cart", href: "/cart" },
  { id: "about", label: "About Us", href: "/about" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="w-full bg-[#542383] border-b border-black/10 sm:relative">
      {/* Top Bar */}
      <div className="mx-auto max-w-7xl flex items-center justify-between px-4 sm:px-6 lg:px-8 w-full py-4">
        <h1 className="text-xl font-bold tracking-wide text-white">
          JERSEY<span className="font-extrabold">पसल</span>
        </h1>

        {/* Desktop Nav */}
        <nav className="hidden sm:flex space-x-6 text-sm font-medium text-white">
          {NAV_LINKS.map((link) => (
            <Link key={link.id} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <button className="hidden sm:block text-sm px-4 py-1 rounded-full bg-white shadow">
            <img src="/icons/nepal.svg" className="w-5 h-5" />
          </button>

          <input
            placeholder="🔍Search..."
            className="hidden sm:block rounded-full px-4 py-1 text-sm outline-none shadow bg-white"
          />

          <div className="relative">
            <span className="text-xl">🛒</span>
            <span className="absolute -top-2 -right-2 text-xs bg-black text-white rounded-full h-5 w-5 flex items-center justify-center">
              0
            </span>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="sm:hidden text-white text-2xl"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? "╳" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="sm:hidden fixed inset-0 z-50 bg-black/20 backdrop-blur-sm">
          {/* Slide-down panel */}
          <div className="bg-gray-900 text-white w-full shadow-xl">
            <div className="flex justify-between items-center px-4 py-4">
              <h2 className="font-semibold">Menu</h2>
              <button className="text-2xl" onClick={() => setMobileOpen(false)}>
                ✖
              </button>
            </div>

            <div className="flex flex-col p-4 space-y-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-4 rounded-md font-medium hover:bg-gray-800"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
