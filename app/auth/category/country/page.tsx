"use client";

import { useState, useEffect } from "react";
import axios from "@/lib/api/axios";
import { Heart } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Product {
  _id: string;
  name: string;
  price: number;
  category: "club" | "country";
  sizes?: string[];
  imageUrl?: string;
}

interface User {
  _id: string;
}

function SkeletonCard() {
  return (
    <div className="relative bg-gray-900 rounded-xl p-4 overflow-hidden">
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="h-60 w-full bg-gray-800 rounded-lg mb-4" />
      <div className="h-4 bg-gray-800 rounded-full w-3/4 mx-auto mb-3" />
      <div className="h-8 bg-gray-800 rounded w-full mb-3" />
      <div className="h-4 bg-gray-800 rounded-full w-1/3 mx-auto mb-4" />
      <div className="h-9 bg-gray-800 rounded-md w-full" />
    </div>
  );
}

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);
  const [favourites, setFavourites] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  const user: User | null =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "null")
      : null;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/admin/products?category=country");
        setProducts(res.data.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch products");
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchFavourites = async () => {
      if (!user?._id) return;
      try {
        const res = await axios.get(`/api/users/${user._id}/favourite`);
        setFavourites(res.data.favourites || []);
      } catch (error) {
        console.error("Failed to fetch favourites:", error);
        toast.error("Failed to fetch favourites");
      } finally {
        setLoading(false);
      }
    };
    fetchFavourites();
  }, [user?._id]);

  const toggleFavourite = async (productId: string) => {
    if (!user?._id) { toast.error("Please login first"); return; }
    try {
      await axios.post(`/api/users/${user._id}/favourite`, { productId });
      if (favourites.includes(productId)) {
        setFavourites(favourites.filter((id) => id !== productId));
        toast.success("Removed from favourites");
      } else {
        setFavourites([...favourites, productId]);
        toast.success("Added to favourites ❤️");
      }
    } catch (error) {
      console.error("Failed to update favourite:", error);
      toast.error("Something went wrong!");
    }
  };

  const addToCart = async (productId: string) => {
    if (!user?._id) { toast.error("Please login first"); return; }
    const size = selectedSizes[productId];
    if (!size) { toast.error("Please select a size"); return; }
    try {
      await axios.post(`/api/users/${user._id}/cart`, { productId, quantity: 1, size });
      toast.success("Added to cart 🛒");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add to cart");
    }
  };

  return (
    <section className="bg-gray-950 min-h-screen text-white py-14">
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>

      {/* Toaster */}
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

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-center gap-4">
          <h1 className="text-4xl font-bold">Country Jerseys</h1>
          {loading && (
            <span className="flex items-center gap-2 text-sm text-purple-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse inline-block" />
              Loading kits...
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
            : products.map((product) => {
                const imageUrl = product.imageUrl
                  ? product.imageUrl.startsWith("http")
                    ? product.imageUrl
                    : `${process.env.NEXT_PUBLIC_API_URL}${product.imageUrl}`
                  : "/images/no-image.png";

                const isFav = favourites.includes(product._id);

                return (
                  <div
                    key={product._id}
                    className="relative bg-gray-900 rounded-xl p-4 hover:scale-105 transition duration-300"
                  >
                    <button onClick={() => toggleFavourite(product._id)} className="absolute top-3 right-3">
                      <Heart className={`w-6 h-6 transition cursor-pointer ${isFav ? "fill-red-500 text-red-500" : "text-gray-400 hover:text-red-400"}`} />
                    </button>

                    <img src={imageUrl} alt={product.name} className="h-60 w-full object-cover rounded-lg" />

                    <p className="mt-4 font-semibold text-center">{product.name}</p>

                    {product.sizes && product.sizes.length > 0 && (
                      <select
                        className="mt-3 w-full bg-gray-800 p-2 rounded text-sm"
                        onChange={(e) => setSelectedSizes({ ...selectedSizes, [product._id]: e.target.value })}
                        defaultValue=""
                      >
                        <option value="" disabled>Select Size</option>
                        {product.sizes.map((size) => (
                          <option key={size} value={size}>{size}</option>
                        ))}
                      </select>
                    )}

                    <p className="text-center mt-2 font-medium">Rs. {product.price}</p>

                    <button
                      onClick={() => addToCart(product._id)}
                      className="mt-4 w-full bg-purple-600 hover:bg-purple-800 py-2 rounded-md text-sm font-medium"
                    >
                      Add to Cart
                    </button>
                  </div>
                );
              })}
        </div>
      </div>
    </section>
  );
}