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
          {
            headers: {
              Authorization: token || "",
            },
          }
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-gray-400">
        Loading transactions...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">

      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="mb-8 flex items-center gap-2 text-gray-400 hover:text-white transition cursor-pointer"
      >
        ← Back
      </button>

      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold mb-10 text-white">
          Transaction History
        </h1>

        {transactions.length === 0 ? (
          <p className="text-gray-500">No transactions found.</p>
        ) : (
          <div className="space-y-5">
            {transactions.map((tx) => (
              <div
                key={tx._id}
                className="bg-gray-900 border border-gray-800 p-6 rounded-xl flex justify-between items-center transition hover:scale-[1.02]"
              >
                <div>
                  <p className="font-semibold uppercase text-purple-400">
                    {tx.paymentMethod}
                  </p>

                  {tx.productName && (
                    <p className="text-gray-300 text-sm mt-1">
                      {tx.productName}
                    </p>
                  )}

                  <p className="text-gray-500 text-xs mt-2">
                    {new Date(tx.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="text-xl font-bold text-green-400">
                  Rs. {tx.amount}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}