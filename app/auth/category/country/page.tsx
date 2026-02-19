"use client";

import { useState, useEffect } from "react";
import axios from "@/lib/api/axios";
import { Heart } from "lucide-react";
import { toast } from "react-toastify";

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

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);
  const [favourites, setFavourites] = useState<string[]>([]);
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
    if (!user?._id) {
      toast.error("Please login first");
      return;
    }

    try {
      await axios.post(`/api/users/${user._id}/favourite`, { productId });

      if (favourites.includes(productId)) {
        setFavourites(favourites.filter((id) => id !== productId));
        toast.success("Removed from favourites");
      } else {
        setFavourites([...favourites, productId]);
        toast.success("Added to favourites");
      }
    } catch (error) {
      console.error("Failed to update favourite:", error);
      toast.error("Something went wrong!");
    }
  };

  if (loading)
    return <p className="text-center mt-10 text-white">Loading jerseys...</p>;

  return (
    <section className="bg-gray-950 min-h-screen text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <h1 className="text-4xl font-bold mb-10">Country Jerseys</h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {products.map((product) => {
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
                {/* Favourite Icon */}
                <button
                  onClick={() => toggleFavourite(product._id)}
                  className="absolute top-3 right-3"
                >
                  <Heart
                    className={`w-6 h-6 transition cursor-pointer ${
                      isFav
                        ? "fill-red-500 text-red-500"
                        : "text-gray-400 hover:text-red-400"
                    }`}
                  />
                </button>

                <img
                  src={imageUrl}
                  alt={product.name}
                  className="h-60 w-full object-cover rounded-lg"
                />

                <p className="mt-4 font-semibold text-center">{product.name}</p>

                {product.sizes && product.sizes.length > 0 && (
                  <p className="text-gray-300 text-sm text-center mt-1">
                    Sizes: {product.sizes.join(", ")}
                  </p>
                )}

                <p className="text-center mt-2 font-medium">
                  Rs. {product.price}
                </p>

                <button className="mt-4 w-full bg-purple-600 hover:bg-purple-800 py-2 rounded-md text-sm font-medium cursor-pointer">
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
