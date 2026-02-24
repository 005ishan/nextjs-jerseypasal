"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/api/axios";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Product {
  _id: string;
  name: string;
  price: number;
  imageUrl?: string;
}

interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  addedAt: string;
}

export default function Page() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  const productNames = cart.map((item) => item.product.name).join(", ");

  const handleEsewaDemo = () => {
    localStorage.setItem("paymentMethod", "esewa");
    localStorage.setItem("paymentAmount", total.toString());
    localStorage.setItem("paymentProduct", productNames);
    window.open("https://esewa.com.np", "_blank");
    window.location.href = "/auth/payment-success";
  };

  const handleKhaltiDemo = () => {
    localStorage.setItem("paymentMethod", "khalti");
    localStorage.setItem("paymentAmount", total.toString());
    localStorage.setItem("paymentProduct", productNames);
    window.open("https://khalti.com", "_blank");
    window.location.href = "/auth/payment-success";
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUserId(parsed._id);
    }
  }, []);

  useEffect(() => {
    if (!userId) return;
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`/api/users/${userId}/cart`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCart(res.data);
      } catch (error) {
        console.error("Failed to fetch cart", error);
        toast.error("Failed to load cart");
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, [userId]);

  const removeItem = async (productId: string, size: string) => {
    if (!userId) return;
    try {
      await axios.delete(`/api/users/${userId}/cart`, {
        data: { productId, size },
      });
      setCart(cart.filter((item) => !(item.product._id === productId && item.size === size)));
      toast.success("Item removed from cart");
    } catch (error) {
      console.error("Failed to remove item", error);
      toast.error("Failed to remove item");
    }
  };

  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div className="bg-gray-950 min-h-screen text-white py-14">
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="dark"
        toastStyle={{
          backgroundColor: "#1f1f2e",
          color: "#fff",
          border: "1px solid #7c3aed",
          borderRadius: "12px",
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-4xl font-bold">My Cart</h1>
          {!loading && cart.length > 0 && (
            <span className="text-sm text-gray-500">{cart.length} item{cart.length !== 1 ? "s" : ""}</span>
          )}
        </div>

        {loading ? (
          // Skeleton
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="relative bg-gray-900 rounded-2xl p-5 overflow-hidden flex items-center gap-4">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                <div className="w-24 h-24 bg-gray-800 rounded-xl shrink-0" />
                <div className="flex-1 space-y-3">
                  <div className="h-4 bg-gray-800 rounded-full w-1/2" />
                  <div className="h-3 bg-gray-800 rounded-full w-1/4" />
                  <div className="h-3 bg-gray-800 rounded-full w-1/4" />
                </div>
                <div className="flex flex-col items-end gap-3">
                  <div className="h-5 bg-gray-800 rounded-full w-20" />
                  <div className="h-8 bg-gray-800 rounded-lg w-20" />
                </div>
              </div>
            ))}
          </div>

        ) : cart.length === 0 ? (
          // Empty state
          <div className="flex flex-col items-center justify-center py-32 gap-4 text-center">
            <div className="text-6xl">🛒</div>
            <p className="text-2xl font-bold text-gray-500">Your cart is empty</p>
            <p className="text-gray-600 text-sm">Add some jerseys to get started.</p>
          </div>

        ) : (
          <>
            {/* Cart Items */}
            <div className="space-y-4 mb-8">
              {cart.map((item) => (
                <div
                  key={`${item.product._id}-${item.size}`}
                  className="flex items-center justify-between bg-gray-900 border border-gray-800 hover:border-purple-800 p-5 rounded-2xl shadow transition duration-300"
                >
                  {/* Left */}
                  <div className="flex items-center gap-5">
                    <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-gray-800 shrink-0">
                      <Image
                        src={`http://localhost:5050${item.product.imageUrl}`}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold">{item.product.name}</h2>
                      <p className="text-gray-500 text-sm mt-1">Size: <span className="text-gray-300">{item.size}</span></p>
                      <p className="text-gray-500 text-sm">Qty: <span className="text-gray-300">{item.quantity}</span></p>
                    </div>
                  </div>

                  {/* Right */}
                  <div className="flex flex-col items-end gap-3">
                    <p className="text-xl font-bold text-purple-400">Rs. {item.product.price * item.quantity}</p>
                    <button
                      onClick={() => removeItem(item.product._id, item.size)}
                      className="text-sm bg-red-600/20 hover:bg-red-600 border border-red-600/40 hover:border-red-600 text-red-400 hover:text-white px-4 py-1.5 rounded-lg transition cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-300">Order Summary</h2>
              <div className="space-y-2 text-sm text-gray-400">
                {cart.map((item) => (
                  <div key={`${item.product._id}-${item.size}`} className="flex justify-between">
                    <span>{item.product.name} × {item.quantity}</span>
                    <span className="text-gray-300">Rs. {item.product.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-800 mt-4 pt-4 flex justify-between text-xl font-bold">
                <span>Total</span>
                <span className="text-purple-400">Rs. {total}</span>
              </div>
            </div>

            {/* Payment Buttons */}
            <div className="flex gap-4 justify-end">
              <button
                onClick={handleEsewaDemo}
                className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl flex items-center gap-2 cursor-pointer font-semibold transition"
              >
                Pay with
                <img src="/icons/esewa.png" alt="eSewa" className="h-6 w-auto" />
              </button>
              <button
                onClick={handleKhaltiDemo}
                className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl flex items-center gap-2 cursor-pointer font-semibold transition shadow-[0_0_15px_rgba(168,85,247,0.3)]"
              >
                Pay with
                <img src="/icons/khalti.png" alt="khalti" className="h-6 w-auto" />
              </button>
            </div>
          </>
        )}
      </div>

      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}