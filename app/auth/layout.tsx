"use client";

import Header from "./components/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-950">
      <Header />

      <main>
        {children}
        </main>
    </div>
  );
}
