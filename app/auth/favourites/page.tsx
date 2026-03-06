"use client";

import { useEffect, useState } from "react";
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

interface FavouriteItem {
  product: Product;
  addedAt: string;
}

function SkeletonCard() {
  return (
    <div className="relative bg-gray-900 rounded-xl p-4 overflow-hidden">
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="h-60 w-full bg-gray-800 rounded-lg mb-4" />
      <div className="h-4 bg-gray-800 rounded-full w-3/4 mx-auto mb-3" />
      <div className="h-3 bg-gray-800 rounded-full w-1/2 mx-auto mb-3" />
      <div className="h-4 bg-gray-800 rounded-full w-1/3 mx-auto" />
    </div>
  );
}

export default function FavouritePage() {
  const [favourites, setFavourites] = useState<FavouriteItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        if (!user?._id) {
          setLoading(false);
          return;
        }
        const res = await axios.get(`/api/users/${user._id}/favourite`);
        // Filter out orphaned favourites where the product has been deleted
        setFavourites(
          res.data.filter((item: FavouriteItem) => item.product != null)
        );
      } catch (error) {
        console.error(error);
        toast.error("Failed to load favourites");
      } finally {
        setLoading(false);
      }
    };
    fetchFavourites();
  }, []);

  const removeFavourite = async (productId: string) => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      await axios.post(`/api/users/${user._id}/favourite`, { productId });
      setFavourites((prev) =>
        prev.filter((item) => item.product?._id !== productId)
      );
      toast.success("Removed from favourites");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <section className="bg-gray-950 min-h-screen text-white py-14">
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>

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
          <h1 className="text-4xl font-bold">My Favourites</h1>
          {!loading && favourites.length > 0 && (
            <span className="text-sm text-gray-500">
              {favourites.length} item{favourites.length !== 1 ? "s" : ""}
            </span>
          )}
          {loading && (
            <span className="flex items-center gap-2 text-sm text-purple-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse inline-block" />
              Loading favourites...
            </span>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : favourites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4 text-center">
            <Heart className="w-16 h-16 text-gray-700" />
            <p className="text-2xl font-bold text-gray-500">
              No favourites yet
            </p>
            <p className="text-gray-600 text-sm">
              Browse our jerseys and heart the ones you love.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {favourites.map((item) => {
              const product = item.product;
              if (!product) return null;
              const imageUrl = product.imageUrl
                ? product.imageUrl.startsWith("http")
                  ? product.imageUrl
                  : `${process.env.NEXT_PUBLIC_API_URL}${product.imageUrl}`
                : "/images/no-image.png";

              return (
                <div
                  key={product._id}
                  className="relative bg-gray-900 rounded-xl p-4 hover:scale-105 transition duration-300"
                >
                  {/* Remove favourite */}
                  <button
                    onClick={() => removeFavourite(product._id)}
                    className="absolute top-3 right-3 cursor-pointer group"
                    title="Remove from favourites"
                  >
                    <Heart className="w-6 h-6 fill-red-500 text-red-500 group-hover:fill-red-300 group-hover:text-red-300 transition" />
                  </button>

                  <img
                    src={imageUrl}
                    alt={product.name}
                    className="h-60 w-full object-cover rounded-lg"
                  />  

                  <p className="mt-4 font-semibold text-center">
                    {product.name}
                  </p>

                  {product.sizes && product.sizes.length > 0 && (
                    <p className="text-gray-400 text-sm text-center mt-1">
                      Sizes: {product.sizes.join(", ")}
                    </p>
                  )}

                  <p className="text-center mt-2 font-medium text-purple-400">
                    Rs. {product.price}
                  </p>

                  <p className="text-center text-xs text-gray-600 mt-2 capitalize">
                    {product.category} jersey
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}