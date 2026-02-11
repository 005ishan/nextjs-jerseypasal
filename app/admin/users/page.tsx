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
  const size = (params.size as string) || "10";
  const search = (params.search as string) || "";

  const response = await handleGetAllUsers(page, size, search);

  if (!response.success) {
    throw new Error(response.message || "Failed to load users");
  }

  return (
    <div className="w-full px-4 md:px-8 py-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Users Management
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage platform users, roles and permissions.
          </p>
        </div>

        <Link
          href="/admin/users/create"
          className="
            inline-flex items-center justify-center
            rounded-xl
            bg-primary text-white
            px-5 py-2.5
            text-sm font-medium
            shadow-sm
            hover:opacity-90
            transition
          "
        >
          Create User
        </Link>
      </div>

      <div className="rounded-2xl border bg-background shadow-sm p-4 md:p-6">
        <UserTable
          users={response.data}
          pagination={response.pagination}
          search={search}
        />
      </div>
    </div>
  );
}
