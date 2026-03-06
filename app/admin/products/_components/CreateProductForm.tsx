"use client";

import axios from "@/lib/api/axios";
import { useState, useRef } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Product {
  _id: string;
  name: string;
  price: number;
  imageUrl?: string;
  category: "club" | "country";
  sizes?: string[];
}

interface CreateProductFormProps {
  onProductCreated?: (product: Product) => void;
}

export default function CreateProductForm({ onProductCreated }: CreateProductFormProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [category, setCategory] = useState<"club" | "country">("club");
  const [sizes, setSizes] = useState<string[]>(["M"]);
  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle image selection & preview
  const handleImageChange = (file: File | null) => {
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  const handleDismissImage = () => {
    setImage(null);
    setPreviewImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Handle adding/removing sizes
  const handleSizeChange = (size: string) => {
    if (sizes.includes(size)) {
      setSizes(sizes.filter((s) => s !== size));
    } else {
      setSizes([...sizes, size]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) {
      toast.error("Name and price are required", { position: "top-right", autoClose: 3000 });
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price.toString());
      formData.append("category", category);

      sizes.forEach((size) => formData.append("sizes[]", size));

      if (image) {
        formData.append("image", image);
      }

      const res = await axios.post("/admin/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const createdProduct: Product = res.data.data;

      toast.success("Product created successfully!", { position: "top-right", autoClose: 3000 });

      // Reset form
      setName("");
      setPrice("");
      setCategory("club");
      setSizes(["M"]);
      handleDismissImage();

      if (onProductCreated) onProductCreated(createdProduct);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to create jersey", {
        position: "top-right",
        autoClose: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-4 border rounded-lg shadow">
      <h2 className="text-xl font-semibold">Create Jersey</h2>

      {/* Name */}
      <div className="space-y-1">
        <label className="text-sm font-medium">Name</label>
        <input
          type="text"
          className="w-full border rounded px-3 py-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      {/* Price */}
      <div className="space-y-1">
        <label className="text-sm font-medium">Price</label>
        <input
          type="number"
          className="w-full border rounded px-3 py-2"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          required
        />
      </div>

      {/* Category */}
      <div className="space-y-1">
        <label className="text-sm font-medium">Category</label>
        <select
          className="w-full border rounded px-3 py-2"
          value={category}
          onChange={(e) => setCategory(e.target.value as "club" | "country")}
        >
          <option value="club">Club</option>
          <option value="country">Country</option>
        </select>
      </div>

      {/* Sizes */}
      <div className="space-y-1">
        <label className="text-sm font-medium">Sizes</label>
        <div className="flex gap-2 flex-wrap">
          {["S", "M", "L", "XL"].map((size) => (
            <button
              key={size}
              type="button"
              className={`px-3 py-1 border rounded ${sizes.includes(size) ? "bg-purple-600 text-white" : ""}`}
              onClick={() => handleSizeChange(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Image Preview */}
      <div className="mb-4">
        {previewImage ? (
          <div className="relative w-full h-48">
            <img src={previewImage} alt="Product Preview" className="w-full h-48 object-cover rounded-md" />
            <button
              type="button"
              onClick={handleDismissImage}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm hover:bg-red-600"
            >
              ✕
            </button>
          </div>
        ) : (
          <div className="w-full h-48 bg-gray-200 rounded-md flex items-center justify-center">
            <span className="text-gray-600">No Image</span>
          </div>
        )}
      </div>

      {/* Image Input */}
      <div className="space-y-1">
        <label className="text-sm font-medium">Image</label>
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => handleImageChange(e.target.files?.[0] || null)}
          accept=".jpg,.jpeg,.png,.webp"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:opacity-90 disabled:opacity-60"
      >
        {loading ? "Creating..." : "Create Jersey"}
      </button>
    </form>
  );
}
