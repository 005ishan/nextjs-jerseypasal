"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditUser({ params }: { params: { id: string } }) {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${params.id}`)
      .then((r) => r.json())
      .then((data) => {
        setEmail(data.email);
        setRole(data.role);
      });
  }, [params.id]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${params.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, role }),
    });

    router.push("/admin/users");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow p-6 max-w-xl space-y-4"
    >
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border p-2 rounded"
      />

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="w-full border p-2 rounded"
      >
        <option value="admin">Admin</option>
        <option value="user">User</option>
      </select>

      <button className="bg-black text-white px-4 py-2 rounded">Save</button>
    </form>
  );
}
