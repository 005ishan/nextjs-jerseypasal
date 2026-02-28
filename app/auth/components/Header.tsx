"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";
import axios from "@/lib/api/axios";
import Image from "next/image";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const NAV_LINKS = [
  { id: "home", label: "Home", href: "/auth/dashboard" },
  { id: "country", label: "Country", href: "/auth/category/country" },
  { id: "clubs", label: "Clubs", href: "/auth/category/clubs" },
  { id: "orders", label: "Orders", href: "/auth/orders" },
  { id: "settings", label: "Settings", href: "/auth/settings" },
];

interface ProductSuggestion {
  _id: string;
  name: string;
  imageUrl?: string;
  category: "club" | "country";
}

interface CartItem {
  quantity: number;
}

interface FavouriteItem {
  _id: string;
}

function LogoutModal({
  isOpen,
  onClose,
  onConfirm,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Background */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-gray-900 border border-gray-700 text-white rounded-xl p-6 w-80 shadow-2xl z-10">
        <h3 className="text-lg font-semibold mb-3">Confirm Logout</h3>
        <p className="text-sm text-gray-300 mb-6">
          Are you sure you want to logout?
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 transition cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 transition cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default function Header() {
  const { logout, user } = useAuth();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const router = useRouter();

  // Search
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<ProductSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Cart & Favourites badges
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favourites, setFavourites] = useState<FavouriteItem[]>([]);

  // Fetch cart items
  useEffect(() => {
    if (!user?._id) return;

    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`/api/users/${user._id}/cart`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCart(res.data);
      } catch (error) {
        console.error("Failed to fetch cart for header", error);
      }
    };

    const fetchFavourites = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`/api/users/${user._id}/favourite`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFavourites(res.data);
      } catch (error) {
        console.error("Failed to fetch favourites for header", error);
      }
    };

    fetchCart();
    fetchFavourites();
  }, [user?._id]);

  const totalCartQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Debounced search
  useEffect(() => {
    if (!searchQuery) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      try {
        const res = await axios.get(
          `/admin/products/search?query=${searchQuery}`,
        );
        setSuggestions(res.data.data || []);
        setShowSuggestions(true);
      } catch (error) {
        console.error("Search error:", error);
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  // Click outside to close search suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleLogout = () => {
    try {
      logout();
      toast.success("Logged out successfully");
      router.push("/login");
    } catch {
      toast.error("Failed to logout");
    } finally {
      setIsLogoutOpen(false);
    }
  };

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
        <div className="flex items-center gap-4 relative">
          {/* Search */}
          <div className="relative" ref={searchRef}>
            <input
              type="text"
              placeholder="Search jerseys..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-full px-4 py-2 text-sm bg-gray-800 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-purple-600 w-64 transition shadow-md"
            />

            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-gray-900 border border-gray-700 rounded-xl mt-2 shadow-2xl max-h-72 overflow-y-auto z-50 transition-all duration-200">
                {suggestions.map((product) => {
                  const imageUrl = product.imageUrl
                    ? product.imageUrl.startsWith("http")
                      ? product.imageUrl
                      : `http://localhost:5050${product.imageUrl}`
                    : "/images/no-image.png";

                  return (
                    <Link
                      key={product._id}
                      href={`/auth/product/${product._id}`}
                      onClick={() => setShowSuggestions(false)}
                      className="flex items-center gap-3 p-3 hover:bg-gray-800 transition rounded-lg"
                    >
                      <img
                        src={imageUrl}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-lg shadow-sm"
                      />
                      <div className="flex flex-col">
                        <p className="text-sm font-medium text-white truncate">
                          {product.name}
                        </p>
                        <p className="text-xs text-gray-400 capitalize truncate">
                          {product.category}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Favourites */}
          <Link href="/auth/favourites" className="relative text-xl text-white">
            ❤︎
            {favourites.length > 0 && (
              <span className="absolute -top-2 -right-2 text-xs bg-purple-600 text-white rounded-full h-5 w-5 flex items-center justify-center">
                {favourites.length}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link href="/auth/Cart" className="relative text-xl text-white">
            🛒
            {totalCartQuantity > 0 && (
              <span className="absolute -top-2 -right-2 text-xs bg-purple-600 text-white rounded-full h-5 w-5 flex items-center justify-center">
                {totalCartQuantity}
              </span>
            )}
          </Link>

          {/* User Section */}
          <div className="hidden sm:flex items-center gap-3 text-sm text-white">
            <span className="opacity-80">{user?.email}</span>
            <button
              onClick={() => setIsLogoutOpen(true)}
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

              <Link
                href="/auth/favourites"
                onClick={() => setMobileOpen(false)}
                className="hover:text-purple-400 transition"
              >
                Favourites
              </Link>

              <Link
                href="/auth/Cart"
                onClick={() => setMobileOpen(false)}
                className="hover:text-purple-400 transition"
              >
                Cart
              </Link>

              <Link
                href="/auth/settings"
                onClick={() => setMobileOpen(false)}
                className="hover:text-purple-400 transition"
              >
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
      <LogoutModal
        isOpen={isLogoutOpen}
        onClose={() => setIsLogoutOpen(false)}
        onConfirm={handleLogout}
      />
    </header>
  );
}