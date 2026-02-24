"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { handleDeleteUser } from "@/lib/actions/admin/user-actions";
import DeleteModal from "@/app/_components/DeleteModal";

const UserTable = ({
  users,
  pagination,
  search,
}: {
  users: any[];
  pagination: any;
  search?: string;
}) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(search || "");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleSearchChange = () => {
    router.push(
      `/admin/users?page=1&size=5` +
        (searchTerm ? `&search=${encodeURIComponent(searchTerm)}` : "")
    );
  };

  const onDelete = async () => {
    try {
      setDeletingId(deleteId);
      await handleDeleteUser(deleteId!);
      toast.success("User deleted successfully");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "Failed to delete user");
    } finally {
      setDeleteId(null);
      setDeletingId(null);
    }
  };

  const makePagination = (): React.ReactElement[] => {
    const pages: React.ReactElement[] = [];
    const currentPage = pagination.page;
    const totalPages = pagination.totalPages;
    const delta = 2;

    const buildHref = (p: number) =>
      `/admin/users?page=${p}&size=5` +
      (searchTerm ? `&search=${encodeURIComponent(searchTerm)}` : "");

    // Prev
    pages.push(
      <Link
        key="prev"
        href={currentPage === 1 ? "#" : buildHref(currentPage - 1)}
        className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition ${
          currentPage === 1
            ? "bg-gray-100 text-gray-400 cursor-not-allowed pointer-events-none border-gray-200"
            : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
        }`}
      >
        ← Prev
      </Link>
    );

    let startPage = Math.max(1, currentPage - delta);
    let endPage = Math.min(totalPages, currentPage + delta);

    if (startPage > 1) {
      pages.push(
        <Link key={1} href={buildHref(1)} className="px-3 py-1.5 rounded-lg text-sm border bg-white text-gray-700 hover:bg-gray-50 border-gray-300 transition">1</Link>
      );
      if (startPage > 2) pages.push(<span key="e1" className="px-1 text-gray-400 text-sm">...</span>);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Link
          key={i}
          href={buildHref(i)}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition ${
            i === currentPage
              ? "bg-primary text-white border-primary shadow-sm"
              : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
          }`}
        >
          {i}
        </Link>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pages.push(<span key="e2" className="px-1 text-gray-400 text-sm">...</span>);
      pages.push(
        <Link key={totalPages} href={buildHref(totalPages)} className="px-3 py-1.5 rounded-lg text-sm border bg-white text-gray-700 hover:bg-gray-50 border-gray-300 transition">{totalPages}</Link>
      );
    }

    // Next
    pages.push(
      <Link
        key="next"
        href={currentPage === totalPages ? "#" : buildHref(currentPage + 1)}
        className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition ${
          currentPage === totalPages
            ? "bg-gray-100 text-gray-400 cursor-not-allowed pointer-events-none border-gray-200"
            : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
        }`}
      >
        Next →
      </Link>
    );

    return pages;
  };

  return (
    <div className="space-y-4">
      <DeleteModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={onDelete}
        title="Delete User"
        description="Are you sure you want to delete this user? This action cannot be undone."
      />

      {/* Search bar */}
      <div className="flex gap-2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearchChange()}
          placeholder="Search by email or name..."
          className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition bg-background"
        />
        <button
          onClick={handleSearchChange}
          className="px-5 py-2.5 bg-primary text-white text-sm font-medium rounded-xl hover:opacity-90 transition"
        >
          Search
        </button>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">#</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">User ID</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-background">
            {users.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-5 py-16 text-center text-sm text-muted-foreground">
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-3xl">👤</span>
                    <p>No users found.</p>
                  </div>
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr
                  key={user._id}
                  className={`hover:bg-gray-50 transition ${deletingId === user._id ? "opacity-40" : ""}`}
                >
                  {/* Row number */}
                  <td className="px-5 py-3.5 text-sm text-muted-foreground">
                    {(pagination.page - 1) * 5 + index + 1}
                  </td>

                  {/* ID */}
                  <td className="px-5 py-3.5">
                    <span className="text-xs font-mono bg-gray-100 text-gray-600 px-2 py-1 rounded-md">
                      {user._id?.slice(-8).toUpperCase()}
                    </span>
                  </td>

                  {/* Email */}
                  <td className="px-5 py-3.5 text-sm text-gray-700">{user.email}</td>

                  {/* Role */}
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${
                      user.role === "admin"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-blue-100 text-blue-700"
                    }`}>
                      {user.role}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/users/${user._id}`}
                        className="px-3 py-1.5 text-xs font-medium rounded-lg bg-green-50 text-green-700 hover:bg-green-100 border border-green-200 transition"
                      >
                        View
                      </Link>
                      <Link
                        href={`/admin/users/${user._id}/edit`}
                        className="px-3 py-1.5 text-xs font-medium rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => setDeleteId(user._id)}
                        className="px-3 py-1.5 text-xs font-medium rounded-lg bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 transition cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between pt-1">
        <p className="text-xs text-muted-foreground">
          Page <span className="font-semibold text-foreground">{pagination.page}</span> of{" "}
          <span className="font-semibold text-foreground">{pagination.totalPages}</span>
          {" · "}
          <span className="font-semibold text-foreground">{pagination.total}</span> total users
        </p>
        <div className="flex items-center gap-1.5">{makePagination()}</div>
      </div>
    </div>
  );
};

export default UserTable;