import Link from "next/link";
import { handleGetAllUsers } from "@/lib/actions/admin/user-actions";
import UserTable from "./_components/UserTable";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const page = (params.page as string) || "1";
  const size = (params.size as string) || "5";
  const search = (params.search as string) || "";

  let response: any = { success: false, data: [], pagination: {} };

  try {
    // Timeout after 5 seconds
    const timeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Request timed out")), 5000)
    );
    response = await Promise.race([handleGetAllUsers(page, size, search), timeout]);
  } catch (err) {
    console.error("Failed to load users:", err);
  }

  const totalUsers = response.pagination?.total || response.data?.length || 0;
  const totalPages = response.pagination?.totalPages || response.pagination?.pages || 1;

  return (
    <div className="w-full px-4 md:px-8 py-8 space-y-8">

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Users Management</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage platform users, roles and permissions.</p>
        </div>
        <Link
          href="/admin/users/create"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary text-white px-6 py-3 text-sm font-semibold shadow-md hover:opacity-90 transition"
        >
          <span className="text-lg leading-none">+</span>
          Create User
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-background border-l-4 border-l-purple-400 border rounded-2xl p-5 shadow-sm">
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Total Users</p>
          <p className="text-3xl font-bold text-primary">{totalUsers}</p>
        </div>
        <div className="bg-background border-l-4 border-l-blue-400 border rounded-2xl p-5 shadow-sm">
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Current Page</p>
          <p className="text-3xl font-bold text-blue-600">{page}</p>
        </div>
        <div className="bg-background border-l-4 border-l-green-400 border rounded-2xl p-5 shadow-sm">
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Total Pages</p>
          <p className="text-3xl font-bold text-green-600">{totalPages}</p>
        </div>
        <div className="bg-background border-l-4 border-l-orange-400 border rounded-2xl p-5 shadow-sm">
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Per Page</p>
          <p className="text-3xl font-bold text-orange-500">{size}</p>
        </div>
      </div>

      {search && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 border rounded-xl px-4 py-3">
          <span>🔍</span>
          Showing results for <span className="font-semibold text-foreground">"{search}"</span>
        </div>
      )}

      {!response.success && (
        <div className="flex items-center gap-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          <span>⚠️</span>
          Could not connect to the server. Make sure your backend is running and try refreshing.
        </div>
      )}

      <div className="rounded-2xl border bg-background shadow-sm p-4 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-foreground">All Users</h2>
          <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">
            {response.data?.length || 0} shown
          </span>
        </div>
        <UserTable
          users={response.data || []}
          pagination={response.pagination || {}}
          search={search}
        />
      </div>

    </div>
  );
}