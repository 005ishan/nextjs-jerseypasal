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
    
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded p-6 w-80 shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Delete Product</h3>
        <p className="mb-6">
          Are you sure you want to delete <strong>{productName}</strong>?
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
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

  if (loading) return <p>Loading...</p>;

  return (
    <div className="overflow-x-auto px-6">
      <table className="min-w-full border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left">Image</th>
            <th className="px-6 py-3 text-left">Name</th>
            <th className="px-6 py-3 text-left">Price</th>
            <th className="px-6 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            const imageUrl = product.imageUrl
              ? product.imageUrl.startsWith("http")
                ? product.imageUrl
                : `${process.env.NEXT_PUBLIC_API_URL}${product.imageUrl}`
              : null;

            return (
              <tr key={product._id} className="border-t border-gray-200">
                <td className="px-6 py-4">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={product.name}
                      className="w-24 h-24 object-cover rounded"
                    />
                  ) : (
                    <div className="w-24 h-24 bg-gray-300 flex items-center justify-center rounded text-xs text-gray-600">
                      No Image
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">{product.name}</td>
                <td className="px-6 py-4">Rs. {product.price}</td>
                <td className="px-6 py-4 space-x-2">
                  <Link
                    href={`/admin/products/${product._id}`}
                    className="text-blue-500 hover:underline"
                  >
                    View
                  </Link>
                  <Link
                    href={`/admin/products/${product._id}/edit`}
                    className="text-green-500 hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => openDeleteModal(product)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <DeleteModal
        isOpen={isModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        productName={selectedProduct?.name || ""}
      />
    </div>
  );
}
