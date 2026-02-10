import Link from "next/link";

async function getUsers(page: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users?page=${page}&limit=5`,
    {
      cache: "no-store", // always fresh data
    },
  );

  if (!res.ok) throw new Error("Failed to fetch users");

  return res.json();
}

export default async function UsersPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = Number(searchParams.page || 1);

  const result = await getUsers(page);

  const users = result.data;
  const totalPages = result.totalPages;

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">Users</h2>

        <Link
          href="/admin/users/create"
          className="px-4 py-2 bg-black text-white rounded-lg"
        >
          Create User
        </Link>
      </div>

      {/* Table */}
      <table className="w-full border rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th className="border p-2 text-left">Email</th>
            <th className="border p-2 text-center">Role</th>
            <th className="border p-2 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u: any) => (
            <tr key={u._id} className="hover:bg-gray-50">
              <td className="border p-2">{u.email}</td>
              <td className="border p-2 text-center">{u.role}</td>
              <td className="border p-2 text-center space-x-2">
                <Link href={`/admin/users/${u._id}`}>View</Link>
                <Link href={`/admin/users/${u._id}/edit`}>Edit</Link>
                <DeleteUserButton id={u._id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination from backend */}
      <div className="flex justify-end gap-2 mt-6">
        {Array.from({ length: totalPages }).map((_, i) => (
          <Link
            key={i}
            href={`/admin/users?page=${i + 1}`}
            className={`px-3 py-1 border rounded ${
              page === i + 1 ? "bg-black text-white" : ""
            }`}
          >
            {i + 1}
          </Link>
        ))}
      </div>
    </div>
  );
}
