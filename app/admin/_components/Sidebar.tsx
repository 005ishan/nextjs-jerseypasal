import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-black text-white hidden md:block">
      <div className="p-6 text-xl font-bold">Jersey Admin</div>
      <nav className="px-4 space-y-2">
        <Link href="/admin" className="block p-2 hover:bg-gray-800 rounded">
          Dashboard
        </Link>
        <Link
          href="/admin/users"
          className="block p-2 hover:bg-gray-800 rounded"
        >
          Users
        </Link>
      </nav>
    </aside>
  );
}
