"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Sidebar from "./_components/Sidebar";
import Header from "./_components/Header";
import { useEffect } from "react";

export default function AdminLayout({ children }: any) {
  const { user, loading } = useAuth(); // ✅ get loading
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) {
      router.push("/login");
    }
  }, [user, loading, router]);

  // Show loader while auth is loading
  if (loading) return <div className="p-6">Loading...</div>;

  // prevent rendering if user is not admin
  if (!user || user.role !== "admin") return null;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
