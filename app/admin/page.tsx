"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/api/axios";
import {
  BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from "recharts";

interface Transaction {
  _id: string;
  amount: number;
  paymentMethod: string;
  productName?: string;
  transactionId: string;
  createdAt: string;
}

interface User {
  _id: string;
  createdAt: string;
}

function SkeletonCard() {
  return (
    <div className="relative bg-white border shadow-lg rounded-2xl p-8 overflow-hidden">
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-gray-100 to-transparent" />
      <div className="h-3 bg-gray-200 rounded-full w-1/3 mb-4" />
      <div className="h-8 bg-gray-200 rounded-full w-1/2" />
    </div>
  );
}

function SkeletonBar() {
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <div className="h-3 bg-gray-200 rounded-full w-16" />
        <div className="h-3 bg-gray-200 rounded-full w-12" />
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3" />
    </div>
  );
}

function SkeletonChart() {
  return (
    <div className="relative bg-gray-50 border rounded-2xl p-6 shadow-md overflow-hidden">
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-gray-100 to-transparent" />
      <div className="h-4 bg-gray-200 rounded-full w-1/3 mb-6" />
      <div className="flex items-end gap-2 h-[250px] px-4">
        {[60, 85, 45, 90, 55, 70, 40].map((h, i) => (
          <div key={i} className="flex-1 bg-gray-200 rounded-t-md" style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  );
}

function SkeletonTxRow() {
  return (
    <div className="relative bg-white border border-gray-200 rounded-xl px-5 py-4 flex items-center justify-between overflow-hidden">
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-gray-100 to-transparent" />
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 rounded-full bg-gray-200 shrink-0" />
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded-full w-24" />
          <div className="h-3 bg-gray-200 rounded-full w-32" />
        </div>
      </div>
      <div className="flex flex-col items-end gap-2">
        <div className="h-4 bg-gray-200 rounded-full w-16" />
        <div className="h-3 bg-gray-200 rounded-full w-20" />
      </div>
    </div>
  );
}

export default function Page() {
  const [stats, setStats] = useState({ users: 0, products: 0, transactions: 0 });
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [usersRes, productsRes, txRes] = await Promise.all([
          axios.get("/api/admin/users"),
          axios.get("/admin/products"),
          axios.get("/api/transactions"),
        ]);

        const usersData: User[] = usersRes.data?.data || [];
        const productsData = productsRes.data?.data || [];
        const txData: Transaction[] = txRes.data?.data || [];

        // Use pagination total if available, fallback to array length
        const totalUsers =
          usersRes.data?.pagination?.total ||
          usersRes.data?.total ||
          usersData.length;

        setStats({
          users: totalUsers,
          products: productsData.length,
          transactions: txData.length,
        });

        setTransactions(txData);
        setUsers(usersData);
      } catch (error) {
        console.error("Dashboard stats fetch failed", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  // Transactions per day
  const txByDay = transactions.reduce<Record<string, number>>((acc, tx) => {
    const day = new Date(tx.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" });
    acc[day] = (acc[day] || 0) + 1;
    return acc;
  }, {});
  const txChartData = Object.entries(txByDay).slice(-7).map(([date, count]) => ({ date, Transactions: count }));

  // Users growth
  const usersByDay = users.reduce<Record<string, number>>((acc, user) => {
    const day = new Date(user.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" });
    acc[day] = (acc[day] || 0) + 1;
    return acc;
  }, {});
  let cumulative = 0;
  const userChartData = Object.entries(usersByDay).slice(-7).map(([date, count]) => {
    cumulative += count;
    return { date, Users: cumulative };
  });

  // Stats bar percentages
  const total = stats.users + stats.products + stats.transactions || 1;
  const userPct = Math.round((stats.users / total) * 100);
  const productPct = Math.round((stats.products / total) * 100);
  const txPct = Math.round((stats.transactions / total) * 100);

  // Latest 5 transactions
  const latestTx = [...transactions]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const methodIcon = (method: string) => {
    if (method.toLowerCase() === "esewa")
      return <img src="/icons/esewa.png" alt="eSewa" className="h-4 w-auto" />;
    if (method.toLowerCase() === "khalti")
      return <img src="/icons/khalti.png" alt="Khalti" className="h-4 w-auto" />;
    return <span>💳</span>;
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 p-10">
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>

      <h1 className="text-4xl font-bold mb-12 text-gray-800">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-8 mb-10">
        {loading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          <>
            <div className="bg-white border shadow-lg rounded-2xl p-8 hover:shadow-xl transition">
              <p className="text-gray-500">Total Users</p>
              <h2 className="text-4xl font-bold text-purple-600 mt-3">{stats.users}</h2>
            </div>
            <div className="bg-white border shadow-lg rounded-2xl p-8 hover:shadow-xl transition">
              <p className="text-gray-500">Total Products</p>
              <h2 className="text-4xl font-bold text-blue-600 mt-3">{stats.products}</h2>
            </div>
            <div className="bg-white border shadow-lg rounded-2xl p-8 hover:shadow-xl transition">
              <p className="text-gray-500">Transactions</p>
              <h2 className="text-4xl font-bold text-green-600 mt-3">{stats.transactions}</h2>
            </div>
          </>
        )}
      </div>

      {/* Stats Bars */}
      <div className="bg-gray-50 border rounded-2xl p-8 shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-8 text-gray-800">Stats Overview</h2>
        {loading ? (
          <div className="space-y-6">
            <SkeletonBar />
            <SkeletonBar />
            <SkeletonBar />
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-purple-500 inline-block" />
                  <span className="text-sm font-medium text-gray-700">Users</span>
                </div>
                <span className="text-sm font-bold text-purple-600">{stats.users} <span className="text-gray-400 font-normal">({userPct}%)</span></span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div className="h-3 rounded-full bg-purple-500 transition-all duration-1000" style={{ width: `${userPct}%` }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-blue-500 inline-block" />
                  <span className="text-sm font-medium text-gray-700">Products</span>
                </div>
                <span className="text-sm font-bold text-blue-600">{stats.products} <span className="text-gray-400 font-normal">({productPct}%)</span></span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div className="h-3 rounded-full bg-blue-500 transition-all duration-1000" style={{ width: `${productPct}%` }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-green-500 inline-block" />
                  <span className="text-sm font-medium text-gray-700">Transactions</span>
                </div>
                <span className="text-sm font-bold text-green-600">{stats.transactions} <span className="text-gray-400 font-normal">({txPct}%)</span></span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div className="h-3 rounded-full bg-green-500 transition-all duration-1000" style={{ width: `${txPct}%` }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {loading ? (
          <>
            <SkeletonChart />
            <SkeletonChart />
          </>
        ) : (
          <>
            <div className="bg-gray-50 border rounded-2xl p-6 shadow-md">
              <h2 className="text-lg font-semibold text-gray-800 mb-6">Transactions Per Day</h2>
              {txChartData.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-10">No transaction data yet.</p>
              ) : (
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={txChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#6b7280" }} />
                    <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "#6b7280" }} />
                    <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", fontSize: "12px" }} />
                    <Legend />
                    <Bar dataKey="Transactions" fill="#22c55e" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>

            <div className="bg-gray-50 border rounded-2xl p-6 shadow-md">
              <h2 className="text-lg font-semibold text-gray-800 mb-6">User Growth Over Time</h2>
              {userChartData.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-10">No user data yet.</p>
              ) : (
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={userChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#6b7280" }} />
                    <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "#6b7280" }} />
                    <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e7eb", borderRadius: "12px", fontSize: "12px" }} />
                    <Legend />
                    <Line type="monotone" dataKey="Users" stroke="#a855f7" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </>
        )}
      </div>

      {/* System Overview */}
      <div className="bg-gray-50 border rounded-2xl p-8 shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">System Overview</h2>
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">Latest Transactions</h3>

        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => <SkeletonTxRow key={i} />)}
          </div>
        ) : latestTx.length === 0 ? (
          <p className="text-sm text-gray-400">No transactions yet.</p>
        ) : (
          <div className="space-y-3">
            {latestTx.map((tx, index) => (
              <div key={tx._id} className="bg-white border border-gray-200 rounded-xl px-5 py-4 flex items-center justify-between hover:shadow-sm transition">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-xs text-gray-500 font-bold shrink-0">
                    {index + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      {methodIcon(tx.paymentMethod)}
                      <span className="text-sm font-semibold text-gray-700 uppercase">{tx.paymentMethod}</span>
                    </div>
                    {tx.productName && <p className="text-xs text-gray-400 mt-0.5">{tx.productName}</p>}
                    <p className="text-xs text-gray-400 mt-0.5 font-mono">#{tx.transactionId?.slice(-8).toUpperCase()}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <p className="font-bold text-green-600">Rs. {tx.amount}</p>
                  <p className="text-xs text-gray-400">{new Date(tx.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}