"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "@/lib/api/axios";
import { Product } from "@/types/product.type";
import { toast } from "react-toastify";
import DeleteModal from "./DeleteModal";
import SkeletonRow from "./SkeletonRow";

export default function ProductTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

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
      setDeletingId(selectedProduct._id);
      await axios.delete(`/admin/products/${selectedProduct._id}`);
      toast.success("Product deleted successfully");
      setProducts(products.filter((p) => p._id !== selectedProduct._id));
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete product");
    } finally {
      closeDeleteModal();
      setDeletingId(null);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="p-6 space-y-6">
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(200%); }
        }
        .shimmer::after {
          content: '';
          position: absolute;
          inset: 0;
          transform: translateX(-100%);
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
          animation: shimmer 1.6s infinite;
        }
      `}</style>

      <DeleteModal
        isOpen={isModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        productName={selectedProduct?.name || ""}
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Jersey Management
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Add, edit or delete jerseys available in the store.
          </p>
        </div>
        <Link
          href="/admin/products/create"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:opacity-90 shadow-md transition"
        >
          <span className="text-lg leading-none">+</span>
          Create Jersey
        </Link>
      </div>

      {/* Stat bar */}
      {!loading && (
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <span>
            <span className="font-bold text-foreground">{products.length}</span>{" "}
            total jerseys
          </span>
          <span>
            <span className="font-bold text-foreground">
              {products.filter((p) => p.category === "club").length}
            </span>{" "}
            club
          </span>
          <span>
            <span className="font-bold text-foreground">
              {products.filter((p) => p.category === "country").length}
            </span>{" "}
            country
          </span>
        </div>
      )}

      {/* Search */}
      <div className="flex gap-2">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or category..."
          className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition bg-background"
        />
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                #
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Image
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Sizes
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-background">
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => <SkeletonRow key={i} />)
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-5 py-16 text-center">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <span className="text-4xl">👕</span>
                    <p className="text-sm">No jerseys found.</p>
                  </div>
                </td>
              </tr>
            ) : (
              filtered.map((product, index) => {
                const imageUrl = product.imageUrl
                  ? product.imageUrl.startsWith("http")
                    ? product.imageUrl
                    : `${process.env.NEXT_PUBLIC_API_URL}${product.imageUrl}`
                  : null;

                return (
                  <tr
                    key={product._id}
                    className={`hover:bg-gray-50 transition ${
                      deletingId === product._id ? "opacity-40" : ""
                    }`}
                  >
                    {/* # */}
                    <td className="px-5 py-3.5 text-sm text-muted-foreground">
                      {index + 1}
                    </td>

                    {/* Image */}
                    <td className="px-5 py-3.5">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={product.name}
                          className="w-12 h-12 rounded-xl object-cover border border-gray-100"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-xs text-gray-400">
                          N/A
                        </div>
                      )}
                    </td>

                    {/* Name */}
                    <td className="px-5 py-3.5 text-sm font-medium text-gray-800">
                      {product.name}
                    </td>

                    {/* Price */}
                    <td className="px-5 py-3.5 text-sm font-semibold text-primary">
                      Rs. {product.price}
                    </td>

                    {/* Category */}
                    <td className="px-5 py-3.5">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${
                          product.category === "club"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {product.category}
                      </span>
                    </td>

                    {/* Sizes */}
                    <td className="px-5 py-3.5 text-sm text-gray-500">
                      {product.sizes && product.sizes.length > 0 ? (
                        product.sizes.join(", ")
                      ) : (
                        <span className="text-gray-300">—</span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/products/${product._id}`}
                          className="px-3 py-1.5 text-xs font-medium rounded-lg bg-green-50 text-green-700 hover:bg-green-100 border border-green-200 transition"
                        >
                          View
                        </Link>
                        <Link
                          href={`/admin/products/${product._id}/edit`}
                          className="px-3 py-1.5 text-xs font-medium rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => openDeleteModal(product)}
                          className="px-3 py-1.5 text-xs font-medium rounded-lg bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 transition cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
