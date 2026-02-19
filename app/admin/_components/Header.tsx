"use client";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

function LogoutModal({
  isOpen,
  onClose,
  onConfirm,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-80 shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Logout</h3>
        <p className="mb-6">Are you sure you want to logout?</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  const { logout, user } = useAuth();
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    try {
      logout(); // Call your auth context logout
      toast.success("Logged out successfully");
      router.push("/login"); // Redirect to login page
    } catch (err) {
      toast.error("Failed to logout");
    } finally {
      setIsLogoutOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-gray-900 border-b border-gray-800">
      <nav
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex h-16 items-center justify-between">
          {/* Left: Logo & Title */}
          <div className="flex items-center gap-3">
            <Link href="/admin" className="flex items-center gap-2 group">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-orange-500 text-white font-semibold cursor-pointer">
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
              onClick={() => setIsLogoutOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-red-500 hover:bg-orange-500 hover:text-white text-gray-200 transition-colors text-sm font-medium cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Logout Modal */}
      <LogoutModal
        isOpen={isLogoutOpen}
        onClose={() => setIsLogoutOpen(false)}
        onConfirm={handleLogout}
      />
    </header>
  );
}
