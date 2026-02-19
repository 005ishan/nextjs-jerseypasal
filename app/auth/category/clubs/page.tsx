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

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);
  const [favourites, setFavourites] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>(
    {},
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/admin/products/?category=club");
        setProducts(res.data.data);
      } catch (err: any) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const toggleFavourite = async (productId: string) => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      if (!user?._id) {
        toast.error("Please login first");
        return;
      }

      await axios.post(`/api/users/${user._id}/favourite`, {
        productId,
      });

      if (favourites.includes(productId)) {
        setFavourites(favourites.filter((id) => id !== productId));
        toast.success("Removed from favourites");
      } else {
        setFavourites([...favourites, productId]);
        toast.success("Added to favourites");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  const addToCart = async (productId: string) => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      if (!user?._id) {
        toast.error("Please login first");
        return;
      }

      const selectedSize = selectedSizes[productId];

      if (!selectedSize) {
        toast.error("Please select a size");
        return;
      }

      await axios.post(`/api/users/${user._id}/cart`, {
        productId,
        quantity: 1,
        size: selectedSize,
      });

      toast.success("Added to cart 🛒");
    } catch (error: any) {
      console.error(error);
      toast.error("Failed to add to cart");
    }
  };

  if (loading)
    return <p className="text-center mt-10 text-white">Loading jerseys...</p>;

  return (
    <section className="bg-gray-950 min-h-screen text-white py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-10">Club Jerseys</h1>
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
                {/* Favourite */}
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

                {/* Size Selector */}
                {product.sizes && product.sizes.length > 0 && (
                  <select
                    className="mt-3 w-full bg-gray-800 p-2 rounded text-sm"
                    onChange={(e) =>
                      setSelectedSizes({
                        ...selectedSizes,
                        [product._id]: e.target.value,
                      })
                    }
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select Size
                    </option>
                    {product.sizes.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                )}

                <p className="text-center mt-3 font-medium">
                  Rs. {product.price}
                </p>

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
