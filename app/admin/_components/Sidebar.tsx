"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/admin" },
    { name: "Users", href: "/admin/users" },
    { name: "Jersey", href: "/admin/products" },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white hidden md:flex flex-col shadow-lg">
      {/* Logo / Header */}
      <div className="p-6 text-2xl font-bold tracking-tight text-orange-500">
        Jerseyपसल Admin
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 mt-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                block px-4 py-2 rounded-lg transition-all duration-200
                ${isActive ? "bg-orange-500 text-white font-semibold" : "text-gray-300 hover:bg-gray-800 hover:text-white"}
              `}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-6 text-xs text-gray-400">&copy; 2026 Jerseyपसल</div>
    </aside>
  );
}
