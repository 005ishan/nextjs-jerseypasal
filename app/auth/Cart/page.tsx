"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/api/axios";
import Image from "next/image";
import { toast } from "react-toastify";

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

  // Get user ID from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUserId(parsed._id);
    }
  }, []);

  // Fetch cart items
  useEffect(() => {
    if (!userId) return;

    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`/api/users/${userId}/cart`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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

  // Remove item from cart
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

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  if (loading) return <p className="p-6">Loading cart...</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-8">My Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={`${item.product._id}-${item.size}`}
              className="flex items-center justify-between bg-gray-900 border border-gray-700 p-5 mb-4 rounded-lg shadow"
            >
              {/* LEFT SIDE - IMAGE + INFO */}
              <div className="flex items-center gap-4">
                <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-800">
                  <Image
                    src={`http://localhost:5050${item.product.imageUrl}`}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-white">
                    {item.product.name}
                  </h2>
                  <p className="text-gray-400">Size: {item.size}</p>
                  <p className="text-gray-400">Qty: {item.quantity}</p>
                </div>
              </div>

              {/* RIGHT SIDE - PRICE + REMOVE */}
              <div className="flex flex-col items-end gap-2">
                <div className="text-lg font-bold text-purple-400">
                  Rs. {item.product.price * item.quantity}
                </div>
                <button
                  onClick={() => removeItem(item.product._id, item.size)}
                  className="text-sm bg-red-600 hover:bg-red-800 px-3 py-1 rounded-md"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="text-right font-bold text-2xl mt-6 text-purple-500">
            Total: Rs. {total}
          </div>
        </>
      )}
    </div>
  );
}
