"use client";
// app/admin/orders/page.tsx

import { useEffect, useState } from "react";
import axios from "axios";

type OrderStatus = "pending" | "processing" | "shipped" | "delivered";

type Order = {
  _id: string;
  userId: { email: string } | string;
  transactionId: string;
  items: {
    productName: string;
    size: string;
    quantity: number;
    price: number;
    imageUrl?: string;
  }[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
};

const STATUS_FLOW: OrderStatus[] = ["pending", "processing", "shipped", "delivered"];

const STATUS_STYLES: Record<OrderStatus, { badge: string; dot: string; label: string }> = {
  pending:    { badge: "bg-amber-500/10 border-amber-500/20 text-amber-400",   dot: "bg-amber-400",   label: "Pending"    },
  processing: { badge: "bg-blue-500/10 border-blue-500/20 text-blue-400",      dot: "bg-blue-400",    label: "Processing" },
  shipped:    { badge: "bg-violet-500/10 border-violet-500/20 text-violet-400",dot: "bg-violet-400",  label: "Shipped"    },
  delivered:  { badge: "bg-green-500/10 border-green-500/20 text-green-400",   dot: "bg-green-400",   label: "Delivered"  },
};

function SkeletonRow() {
  return (
    <div className="relative bg-gray-900 border border-gray-800 rounded-2xl p-5 overflow-hidden">
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="flex justify-between items-center gap-4">
        <div className="space-y-2 flex-1">
          <div className="h-4 bg-gray-800 rounded-full w-1/3" />
          <div className="h-3 bg-gray-800 rounded-full w-1/2" />
        </div>
        <div className="h-8 bg-gray-800 rounded-lg w-28" />
      </div>
    </div>
  );
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [filter, setFilter] = useState<OrderStatus | "all">("all");

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5050/api/admin/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data);
    } catch (err) {
      console.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(orderId: string, newStatus: OrderStatus) {
    setUpdating(orderId);
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:5050/api/admin/orders/${orderId}/status`,
        { status: newStatus },
        { headers: { Authorization: token || "" } }
      );
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o))
      );
    } catch (err) {
      console.error("Failed to update status");
    } finally {
      setUpdating(null);
    }
  }

  const counts = STATUS_FLOW.reduce((acc, s) => {
    acc[s] = orders.filter((o) => o.status === s).length;
    return acc;
  }, {} as Record<OrderStatus, number>);

  const filtered = filter === "all" ? orders : orders.filter((o) => o.status === filter);

  return (
    <div className="bg-gray-950 min-h-screen text-white py-10 px-6">
      <style>{`@keyframes shimmer { 100% { transform: translateX(100%); } }`}</style>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Orders</h1>
        <p className="text-gray-500 text-sm mt-1">
          {!loading && `${orders.length} total order${orders.length !== 1 ? "s" : ""}`}
        </p>
      </div>

      {/* Status Filter Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {STATUS_FLOW.map((s) => {
          const style = STATUS_STYLES[s];
          const active = filter === s;
          return (
            <button
              key={s}
              onClick={() => setFilter(filter === s ? "all" : s)}
              className={`rounded-2xl p-4 border text-left transition-all ${
                active
                  ? "border-orange-500/40 bg-orange-500/10"
                  : "border-gray-800 bg-gray-900 hover:border-gray-700"
              }`}
            >
              <div className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-0.5 rounded-full border mb-2 ${style.badge}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
                {style.label}
              </div>
              <p className="text-2xl font-bold">{counts[s]}</p>
            </button>
          );
        })}
      </div>

      {/* Orders List */}
      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 gap-3 text-center">
          <div className="text-6xl">📦</div>
          <p className="text-2xl font-bold text-gray-500">No orders found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((order, index) => {
            const style = STATUS_STYLES[order.status];
            const currentIdx = STATUS_FLOW.indexOf(order.status);
            const nextStatus = STATUS_FLOW[currentIdx + 1] ?? null;
            const isUpdating = updating === order._id;
            const email =
              typeof order.userId === "object" ? order.userId.email : order.userId;

            return (
              <div
                key={order._id}
                className="bg-gray-900 border border-gray-800 hover:border-orange-800/50 rounded-2xl p-5 transition-all hover:shadow-[0_0_20px_rgba(249,115,22,0.06)]"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Left info */}
                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-xs text-gray-500 font-bold shrink-0">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-bold text-sm text-orange-400 uppercase tracking-wide">
                        {email}
                      </p>
                      <p className="text-gray-400 text-xs mt-0.5">
                        {order.items.map((i) => `${i.productName} (${i.size}) x${i.quantity}`).join(", ")}
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <p className="text-gray-600 text-xs">
                          {new Date(order.createdAt).toLocaleString()}
                        </p>
                        <span className="text-gray-700 text-xs">•</span>
                        <p className="text-gray-600 text-xs font-mono">
                          #{order.transactionId?.slice(-8).toUpperCase()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right: amount + status + actions */}
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-3 shrink-0">
                    <p className="text-lg font-bold text-green-400">
                      Rs. {order.totalAmount}
                    </p>

                    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${style.badge}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
                      {style.label}
                    </span>

                    {/* Advance to next status */}
                    {nextStatus && (
                      <button
                        disabled={isUpdating}
                        onClick={() => updateStatus(order._id, nextStatus)}
                        className="text-xs px-3 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-400 disabled:opacity-50 transition-colors font-semibold text-white"
                      >
                        {isUpdating ? "..." : `→ ${STATUS_STYLES[nextStatus].label}`}
                      </button>
                    )}

                    {/* Manual override dropdown */}
                    <select
                      value={order.status}
                      disabled={isUpdating}
                      onChange={(e) => updateStatus(order._id, e.target.value as OrderStatus)}
                      className="text-xs bg-gray-800 border border-gray-700 rounded-lg px-2 py-1.5 text-gray-300 disabled:opacity-50 cursor-pointer"
                    >
                      {STATUS_FLOW.map((s) => (
                        <option key={s} value={s} className="bg-gray-900">
                          {STATUS_STYLES[s].label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}