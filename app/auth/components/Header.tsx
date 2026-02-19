"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { id: "home", label: "Home", href: "/auth/dashboard" },
  { id: "country", label: "Country", href: "/auth/category/country" },
  { id: "clubs", label: "Clubs", href: "/auth/category/clubs" },
  { id: "settings", label: "Settings", href: "/auth/settings" },
];

export default function Header() {
  const { logout, user } = useAuth();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-gray-950 border-b border-gray-800 backdrop-blur">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-white tracking-wide">
          JERSEY<span className="text-purple-500">पसल</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-300">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              className={`hover:text-white transition ${
                pathname === link.href
                  ? "text-white border-b-2 border-purple-500 pb-1"
                  : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="hidden md:block">
            <input
              placeholder="Search jerseys..."
              className="rounded-full px-4 py-2 text-sm bg-gray-800 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          {/* Favourites */}
          <Link href="/auth/context/FavouriteContext" className="relative text-xl text-white">
            ❤️
          </Link>

          {/* Cart */}
          <Link href="/cart" className="relative text-xl text-white">
            🛒
            <span className="absolute -top-2 -right-2 text-xs bg-purple-600 text-white rounded-full h-5 w-5 flex items-center justify-center">
              0
            </span>
          </Link>

          {/* User Section */}
          <div className="hidden sm:flex items-center gap-3 text-sm text-white">
            <span className="opacity-80">{user?.email}</span>
            <button
              onClick={logout}
              className="bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded-md text-white transition cursor-pointer"
            >
              Logout
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden text-white text-2xl"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? "✖" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm">
          <div className="bg-gray-900 text-white w-72 h-full shadow-xl p-6 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Menu</h2>
              <button onClick={() => setMobileOpen(false)}>✖</button>
            </div>

            <nav className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="hover:text-purple-400 transition"
                >
                  {link.label}
                </Link>
              ))}

              <Link href="/favourites" onClick={() => setMobileOpen(false)}>
                Favourites
              </Link>

              <Link href="/cart" onClick={() => setMobileOpen(false)}>
                Cart
              </Link>

              <Link href="/settings" onClick={() => setMobileOpen(false)}>
                Settings
              </Link>
            </nav>

            <div className="pt-6 border-t border-gray-700">
              <p className="text-sm mb-2 opacity-70">{user?.email}</p>
              <button
                onClick={logout}
                className="w-full bg-purple-600 hover:bg-purple-700 py-2 rounded-md"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
