"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/api/axios";
import { useParams } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params?.id;

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string>("");

  // Fetch Product
  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/admin/products/${productId}`);
        setProduct(res.data.data);
      } catch (error) {
        console.error(error);
        toast.error("Product loading failed");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  // Add To Cart
  const addToCart = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "null");

      if (!user?._id) {
        toast.error("Please login first");
        return;
      }

      if (!selectedSize) {
        toast.error("Please select size");
        return;
      }

      if (!product?._id) {
        toast.error("Product not loaded");
        return;
      }

      const token = localStorage.getItem("token");

      await axios.post(
        `/api/users/${user._id}/cart`,
        {
          productId: product._id,
          quantity: 1,
          size: selectedSize,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Added to cart");

    } catch (error) {
      console.error(error);
      toast.error("Add to cart failed");
    }
  };

  // Loading State
  if (loading)
    return (
      <div className="text-white text-center p-20">
        Loading product...
      </div>
    );

  if (!product)
    return (
      <div className="text-white text-center p-20">
        Product not found
      </div>
    );

  // Image Safe Loader
  const getImageUrl = (imageUrl?: string) => {
    if (!imageUrl) return "/images/no-image.png";

    if (imageUrl.startsWith("http")) return imageUrl;

    const base = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");

    return `${base}${imageUrl}`;
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 text-white">

      <div className="grid md:grid-cols-2 gap-10 bg-gray-900 p-8 rounded-2xl shadow-xl">

        {/* Product Image */}
        <div className="relative w-full h-[400px]">
          <img
            src={getImageUrl(product.imageUrl)}
            alt={product.name}
            className="w-full h-full object-contain rounded-xl"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold">{product.name}</h1>

          <p className="text-purple-400 text-2xl font-semibold">
            Rs {product.price}
          </p>

          <div className="text-gray-400 capitalize">
            Category : {product.category}
          </div>

          {/* Size Selector */}
          {product.sizes?.length > 0 && (
            <div>
              <h3 className="mb-3 text-lg font-medium">Select Size</h3>

              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size: string) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-lg text-sm transition cursor-pointer ${
                      selectedSize === size
                        ? "bg-purple-600 text-white"
                        : "bg-gray-800 hover:bg-gray-700"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add Cart Button */}
          <button
            onClick={addToCart}
            className="w-full bg-purple-600 hover:bg-purple-700 transition py-3 rounded-xl font-semibold cursor-pointer"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={2000} />

    </div>
  );
}