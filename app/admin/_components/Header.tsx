"use client";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const { logout, user } = useAuth();

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-gray-900/80 border-b border-gray-800">
      <nav
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex h-16 items-center justify-between">
          {/* Left: Logo & Title */}
          <div className="flex items-center gap-3">
            <Link href="/admin" className="flex items-center gap-2 group">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-orange-500 text-white font-semibold">
                A
              </span>
              <span className="text-base font-semibold tracking-tight text-white group-hover:opacity-80 transition-opacity">
                Admin Panel
              </span>
            </Link>
          </div>

          {/* Right: User info & Logout */}
          <div className="flex items-center gap-4">
            <div className="text-sm font-medium text-gray-300">
              {user?.email || "Admin"}
            </div>
            <button
              onClick={() => logout()}
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-gray-800 hover:bg-orange-500 hover:text-white text-gray-200 transition-colors text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
