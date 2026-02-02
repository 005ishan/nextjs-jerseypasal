"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Sidebar from "./_components/sidebar";
import Header from "./_components/Header";
import { useEffect } from "react";

export default function AdminLayout({ children }: any) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user || user.role !== "admin") {
      router.replace("/login");
    }
  }, [user]);

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
