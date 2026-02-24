"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "@/lib/api/axios";
import { Product } from "@/types/product.type";
import { toast } from "react-toastify";
import DeleteModal from "./DeleteModal";
import SkeletonRow from "./SkeletonRow";
import { useSearchParams, useRouter } from "next/navigation";
import { 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  Plus, 
  Package, 
  Shirt, 
  Globe, 
  Grid3x3,
  Eye,
  Pencil,
  Trash2
} from "lucide-react";

export default function ProductTable() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const size = 5;

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/admin/products");
      setAllProducts(res.data.data);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const totalProducts = allProducts.length;
  const totalPages = Math.ceil(totalProducts / size);
  
  const startIndex = (page - 1) * size;
  const endIndex = startIndex + size;
  const currentProducts = allProducts.slice(startIndex, endIndex);

  const filtered = currentProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()),
  );

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
      setAllProducts(allProducts.filter((p) => p._id !== selectedProduct._id));
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete product");
    } finally {
      closeDeleteModal();
      setDeletingId(null);
    }
  };

  const goToPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`?${params.toString()}`);
  };

  const clubCount = currentProducts.filter(p => p.category === "club").length;
  const countryCount = currentProducts.filter(p => p.category === "country").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 md:p-8">
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
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        
        .card-hover {
          transition: all 0.2s ease;
        }
        
        .card-hover:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 24px -8px rgba(0, 0, 0, 0.15);
        }
      `}</style>

      <DeleteModal
        isOpen={isModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        productName={selectedProduct?.name || ""}
      />

      {/* Header Section with Glassmorphism */}
      <div className="mb-8 animate-fadeIn">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Jersey Collection
                </h1>
                <p className="text-gray-500 text-sm mt-1 flex items-center gap-2">
                  <span className="w-1 h-1 bg-green-500 rounded-full"></span>
                  Manage your premium jersey inventory
                </p>
              </div>
            </div>
            <Link
              href="/admin/products/create"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl card-hover"
            >
              <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200" />
              Create New Jersey
            </Link>
          </div>

          {/* Stats Cards */}
          {!loading && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 card-hover">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Total Inventory</p>
                    <p className="text-2xl font-bold text-gray-800 mt-1">{totalProducts}</p>
                  </div>
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Package className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 card-hover">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Current Page</p>
                    <p className="text-2xl font-bold text-gray-800 mt-1">{page}</p>
                  </div>
                  <div className="p-2 bg-purple-50 rounded-lg">
                    <Grid3x3 className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 card-hover">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Club Jerseys</p>
                    <p className="text-2xl font-bold text-gray-800 mt-1">{clubCount}</p>
                  </div>
                  <div className="p-2 bg-green-50 rounded-lg">
                    <Shirt className="w-5 h-5 text-green-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 card-hover">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Country Jerseys</p>
                    <p className="text-2xl font-bold text-gray-800 mt-1">{countryCount}</p>
                  </div>
                  <div className="p-2 bg-orange-50 rounded-lg">
                    <Globe className="w-5 h-5 text-orange-600" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Search Section */}
      <div className="mb-6 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by jersey name or category..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition bg-white"
            />
          </div>
          <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              {filtered.length} items on current page
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              {totalProducts} total in collection
            </span>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="animate-fadeIn" style={{ animationDelay: '0.2s' }}>
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">#</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Image</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Sizes</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  Array.from({ length: size }).map((_, i) => <SkeletonRow key={i} />)
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="p-4 bg-gray-100 rounded-full">
                          <Package className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-gray-500 font-medium">No jerseys found</p>
                        <p className="text-sm text-gray-400">Try adjusting your search or add a new jersey</p>
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
                        className={`hover:bg-gray-50 transition-all duration-150 ${
                          deletingId === product._id ? "opacity-40 bg-gray-50" : ""
                        }`}
                      >
                        <td className="px-6 py-4 text-sm font-mono text-gray-500">
                          #{String(startIndex + index + 1).padStart(2, '0')}
                        </td>
                        <td className="px-6 py-4">
                          {imageUrl ? (
                            <div className="relative group">
                              <img
                                src={imageUrl}
                                alt={product.name}
                                className="w-14 h-14 rounded-xl object-cover border-2 border-gray-100 group-hover:border-blue-200 transition-all duration-200"
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 rounded-xl transition-all duration-200"></div>
                            </div>
                          ) : (
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                              <Package className="w-6 h-6 text-gray-400" />
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-semibold text-gray-800">{product.name}</p>
                            <p className="text-xs text-gray-400 mt-0.5">ID: {product._id.slice(-6)}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-bold text-lg text-gray-800">₹{product.price}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                              product.category === "club"
                                ? "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border border-blue-200"
                                : "bg-gradient-to-r from-green-50 to-green-100 text-green-700 border border-green-200"
                            }`}
                          >
                            {product.category === "club" ? <Shirt className="w-3 h-3 mr-1" /> : <Globe className="w-3 h-3 mr-1" />}
                            {product.category}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {product.sizes && product.sizes.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                              {product.sizes.map((size, i) => (
                                <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md border border-gray-200">
                                  {size}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <span className="text-gray-300 text-sm">—</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Link
                              href={`/admin/products/${product._id}`}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200 group relative"
                              title="View details"
                            >
                              <Eye className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            </Link>
                            <Link
                              href={`/admin/products/${product._id}/edit`}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 group relative"
                              title="Edit product"
                            >
                              <Pencil className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            </Link>
                            <button
                              onClick={() => openDeleteModal(product)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 group relative"
                              title="Delete product"
                            >
                              <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
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

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="border-t border-gray-100 px-6 py-4 bg-gradient-to-r from-gray-50 to-white">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="text-sm text-gray-500">
                  Showing <span className="font-semibold text-gray-700">{currentProducts.length}</span> of{' '}
                  <span className="font-semibold text-gray-700">{totalProducts}</span> products
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => goToPage(page - 1)}
                    disabled={page <= 1}
                    className="flex items-center gap-1 px-4 py-2 text-sm border border-gray-200 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white hover:shadow-md transition-all duration-200 bg-white"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </button>
                  
                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum = page;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (page <= 3) {
                        pageNum = i + 1;
                      } else if (page >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = page - 2 + i;
                      }
                      
                      return (
                        <button
                          key={pageNum}
                          onClick={() => goToPage(pageNum)}
                          className={`min-w-[40px] h-10 text-sm rounded-lg transition-all duration-200 ${
                            page === pageNum
                              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md hover:shadow-lg"
                              : "hover:bg-white border border-gray-200 bg-white hover:shadow-md"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => goToPage(page + 1)}
                    disabled={page >= totalPages}
                    className="flex items-center gap-1 px-4 py-2 text-sm border border-gray-200 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white hover:shadow-md transition-all duration-200 bg-white"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Single page info */}
          {!loading && totalPages <= 1 && totalProducts > 0 && (
            <div className="border-t border-gray-100 px-6 py-4 bg-gradient-to-r from-gray-50 to-white">
              <div className="text-sm text-gray-500 text-center">
                Showing all <span className="font-semibold text-gray-700">{totalProducts}</span> products
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}