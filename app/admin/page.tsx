"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/api/axios";

export default function Page() {
  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    transactions: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, productsRes, txRes] = await Promise.all([
          axios.get("/api/admin/users"),
          axios.get("/admin/products"),
          axios.get("/api/transactions"),
        ]);

        setStats({
          users: usersRes.data?.data?.length || 0,
          products: productsRes.data?.data?.length || 0,
          transactions: txRes.data?.data?.length || 0,
        });
      } catch (error) {
        console.error("Dashboard stats fetch failed", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white text-gray-800 flex items-center justify-center">
        Loading dashboard stats...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 p-10">

      <h1 className="text-4xl font-bold mb-12 text-gray-800">
        Admin Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-8 mb-14">

        <div className="bg-white border shadow-lg rounded-2xl p-8 hover:shadow-xl transition">
          <p className="text-gray-500">Total Users</p>
          <h2 className="text-4xl font-bold text-purple-600 mt-3">
            {stats.users}
          </h2>
        </div>

        <div className="bg-white border shadow-lg rounded-2xl p-8 hover:shadow-xl transition">
          <p className="text-gray-500">Total Products</p>
          <h2 className="text-4xl font-bold text-blue-600 mt-3">
            {stats.products}
          </h2>
        </div>

        <div className="bg-white border shadow-lg rounded-2xl p-8 hover:shadow-xl transition">
          <p className="text-gray-500">Transactions</p>
          <h2 className="text-4xl font-bold text-green-600 mt-3">
            {stats.transactions}
          </h2>
        </div>

      </div>

      {/* Attractive Bottom Section */}
      <div className="bg-gray-50 border rounded-2xl p-8 shadow-md">

        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          System Overview
        </h2>

        <div className="grid md:grid-cols-2 gap-8">

          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold mb-3">Recent Activity</h3>
            <p className="text-sm text-gray-500">
              User registrations, product updates and transactions will appear here in future enhancement.
            </p>
          </div>
    
          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold mb-3">Performance Insight</h3>
            <p className="text-sm text-gray-500">
              Analytics charts and revenue tracking can be added for better monitoring.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}