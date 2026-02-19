"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "@/lib/api/axios";
import { Product } from "@/types/product.type";
import { toast } from "react-toastify";

function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  productName,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  productName: string;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96 shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Delete Product</h3>
        <p className="mb-6">
          Are you sure you want to delete <strong>{productName}</strong>?
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProductTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("/admin/products");
      setProducts(res.data.data);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const openDeleteModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  const confirmDelete = async () => {
    if (!selectedProduct) return;

    try {
      await axios.delete(`/admin/products/${selectedProduct._id}`);
      toast.success("Product deleted successfully");
      setProducts(products.filter((p) => p._id !== selectedProduct._id));
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete product");
    } finally {
      closeDeleteModal();
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading products...</p>;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Jersey Management
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Add, Delete, or Edit Jerseys available in the store.
          </p>
        </div>
        <Link
          href="/admin/products/create"
          className="px-4 py-2 bg-primary text-white rounded hover:bg-gray-700"
        >
          Create Jersey
        </Link>
      </div>

      {/* Products Grid */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => {
          const imageUrl = product.imageUrl
            ? product.imageUrl.startsWith("http")
              ? product.imageUrl
              : `${process.env.NEXT_PUBLIC_API_URL}${product.imageUrl}`
            : null;

          return (
            <div
              key={product._id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col"
            >
              {/* Product Image */}
              <div className="w-full h-48 mb-4 bg-gray-100 rounded overflow-hidden">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
              </div>

              {/* Product Info */}
              <h2 className="font-semibold text-lg mb-1">{product.name}</h2>
              <p className="text-gray-700 mb-1">Rs. {product.price}</p>
              <p className="text-gray-500 mb-1 text-sm">
                Category: {product.category}
              </p>
              {product.sizes && product.sizes.length > 0 && (
                <p className="text-gray-500 mb-2 text-sm">
                  Sizes: {product.sizes.join(", ")}
                </p>
              )}

              {/* Action Buttons */}
              <div className="mt-auto flex gap-2">
                <Link
                  href={`/admin/products/${product._id}`}
                  className="flex-1 px-3 py-1 bg-blue-900 text-white rounded hover:bg-blue-600 text-center"
                >
                  View
                </Link>
                <Link
                  href={`/admin/products/${product._id}/edit`}
                  className="flex-1 px-3 py-1 bg-gray-800 text-white rounded hover:bg-green-600 text-center"
                >
                  Edit
                </Link>
                <button
                  onClick={() => openDeleteModal(product)}
                  className="flex-1 px-3 py-1 bg-red-800 text-white rounded hover:bg-red-600 text-center"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Delete Modal */}
      <DeleteModal
        isOpen={isModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        productName={selectedProduct?.name || ""}
      />
    </div>
  );
}
