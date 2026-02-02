"use client";

import axios from "@/lib/api/axios";
import { AUTH } from "@/lib/api/endpoints";
import { useState } from "react";

export default function CreateUserForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const submit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("role", role);

    await axios.post(AUTH.CREATE_USER, formData);
    alert("User Created");
  };

  return (
    <form
      onSubmit={submit}
      className="bg-white p-6 rounded shadow max-w-md"
    >
      <h2 className="text-lg font-bold mb-4">Create User</h2>

      <input
        className="border p-2 w-full mb-3"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        className="border p-2 w-full mb-3"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <select
        className="border p-2 w-full mb-4"
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>

      <button className="bg-black text-white px-4 py-2 w-full rounded">
        Create
      </button>
    </form>
  );
}
