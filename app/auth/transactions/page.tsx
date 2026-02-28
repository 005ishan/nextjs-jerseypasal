"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Transaction {
  _id: string;
  userId: string;
  amount: number;
  paymentMethod: string;
  productName?: string;
  transactionId: string;
  createdAt: string;
}

function SkeletonRow() {
  return (
    <div className="relative bg-gray-900 border border-gray-800 rounded-2xl p-6 overflow-hidden flex justify-between items-center gap-4">
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="space-y-3 flex-1">
        <div className="h-4 bg-gray-800 rounded-full w-1/4" />
        <div className="h-3 bg-gray-800 rounded-full w-1/2" />
        <div className="h-3 bg-gray-800 rounded-full w-1/3" />
      </div>
      <div className="h-6 bg-gray-800 rounded-full w-24" />
    </div>
  );
}

export default function Page() {
  const router = useRouter();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const user = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        if (!user) return;
        const parsed = JSON.parse(user);
        const res = await axios.get(
          `http://localhost:5050/api/transactions/${parsed._id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setTransactions(res.data || []);
      } catch (error) {
        console.error("Failed to fetch transactions");
        setTransactions([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  const total = transactions.reduce((sum, tx) => sum + tx.amount, 0);

  const methodIcon = (method: string) => {
    if (method.toLowerCase() === "esewa")
      return <img src="/icons/esewa.png" alt="eSewa" className="h-5 w-auto" />;
    if (method.toLowerCase() === "khalti")
      return (
        <img src="/icons/khalti.png" alt="Khalti" className="h-5 w-auto" />
      );
    return <span>💳</span>;
  };

  return (
    <div className="bg-gray-950 min-h-screen text-white py-14">
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-bold">Transaction History</h1>
            {!loading && transactions.length > 0 && (
              <p className="text-gray-500 text-sm mt-1">
                {transactions.length} transaction
                {transactions.length !== 1 ? "s" : ""}
              </p>
            )}
          </div>

          {/* Total summary badge */}
          {!loading && transactions.length > 0 && (
            <div className="bg-gray-900 border border-gray-800 rounded-2xl px-6 py-3 text-right">
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">
                Total Spent
              </p>
              <p className="text-2xl font-bold text-purple-400">Rs. {total}</p>
            </div>
          )}
        </div>

        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonRow key={i} />
            ))}
          </div>
        ) : transactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4 text-center">
            <div className="text-6xl">🧾</div>
            <p className="text-2xl font-bold text-gray-500">
              No transactions yet
            </p>
            <p className="text-gray-600 text-sm">
              Your payment history will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {transactions.map((tx, index) => (
              <div
                key={tx._id}
                className="bg-gray-900 border border-gray-800 hover:border-purple-800 p-6 rounded-2xl flex justify-between items-center transition duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.08)]"
              >
                {/* Left */}
                <div className="flex items-center gap-4">
                  {/* Index badge */}
                  <div className="w-9 h-9 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-xs text-gray-500 font-bold shrink-0">
                    {index + 1}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span>{methodIcon(tx.paymentMethod)}</span>
                      <p className="font-bold uppercase tracking-wide text-purple-400 text-sm">
                        {tx.paymentMethod}
                      </p>
                    </div>

                    {tx.productName && (
                      <p className="text-gray-300 text-sm mt-1">
                        {tx.productName}
                      </p>
                    )}

                    <div className="flex items-center gap-3 mt-2">
                      <p className="text-gray-600 text-xs">
                        {new Date(tx.createdAt).toLocaleString()}
                      </p>
                      <span className="text-gray-700 text-xs">•</span>
                      <p className="text-gray-600 text-xs font-mono">
                        #{tx.transactionId?.slice(-8).toUpperCase()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right */}
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <p className="text-xl font-bold text-green-400">
                    Rs. {tx.amount}
                  </p>
                  <span className="text-xs bg-green-500/10 border border-green-500/20 text-green-500 px-2 py-0.5 rounded-full">
                    Paid
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
