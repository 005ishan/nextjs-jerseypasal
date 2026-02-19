"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/api/axios";
import { Heart } from "lucide-react";

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

        // ⚠️ IMPORTANT: Adjust this depending on your axios baseURL
        const res = await axios.get(`/api/users/${user._id}/favourite`);

        setFavourites(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavourites();
  }, []);

  const removeFavourite = async (productId: string) => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      await axios.post(`/api/users/${user._id}/favourite`, {
        productId,
      });

      setFavourites((prev) =>
        prev.filter((item) => item.product._id !== productId)
      );
    } catch (error) {
      console.error(error);
    }
  };

  if (loading)
    return <p className="text-center mt-10 text-white">Loading favourites...</p>;

  return (
    <section className="bg-gray-950 min-h-screen text-white py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-10">My Favourites</h1>

        {favourites.length === 0 ? (
          <p className="text-center text-gray-400">
            You have no favourite jerseys yet.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {favourites.map((item) => {
              const product = item.product;

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
                  {/* Remove Favourite */}
                  <button
                    onClick={() => removeFavourite(product._id)}
                    className="absolute top-3 right-3"
                  >
                    <Heart className="w-6 h-6 fill-red-500 text-red-500" />
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
                    <p className="text-gray-300 text-sm text-center mt-1">
                      Sizes: {product.sizes.join(", ")}
                    </p>
                  )}

                  <p className="text-center mt-2 font-medium">
                    Rs. {product.price}
                  </p>

                  <button className="mt-4 w-full bg-purple-600 hover:bg-purple-800 py-2 rounded-md text-sm font-medium">
                    View Jerseys
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
