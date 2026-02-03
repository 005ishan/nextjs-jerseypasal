import Link from "next/link";

const USERS = [
  { id: "1", email: "admin@test.com", role: "admin" },
  { id: "2", email: "user@test.com", role: "user" },
];

export default function UsersPage() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">Users</h2>
        <Link
          href="/admin/users/create"
          className="px-4 py-2 bg-black text-white rounded"
        >
          Create User
        </Link>
      </div>

      <table className="w-full border">
        <thead className="bg-gray-50">
          <tr>
            <th className="border p-2 text-left">Email</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {USERS.map((u) => (
            <tr key={u.id}>
              <td className="border p-2">{u.email}</td>
              <td className="border p-2 text-center">{u.role}</td>
              <td className="border p-2 text-center">
                <Link href={`/admin/users/${u.id}`}>View</Link> |{" "}
                <Link href={`/admin/users/${u.id}/edit`}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
