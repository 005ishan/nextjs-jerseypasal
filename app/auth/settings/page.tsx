"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SettingsPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      const parsed = JSON.parse(user);
      setEmail(parsed.email || "");
      setUserId(parsed._id);
    }
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password && password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5050/api/users/${userId}`,
        {
          email,
          password: password || undefined,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Settings updated successfully!");

    } catch (error) {
      console.error(error);
      toast.error("Update failed");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">

      <div className="max-w-2xl mx-auto flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold tracking-wide">
          Account Settings
        </h1>

        <Link
          href="/auth/transactions"
          className="bg-purple-600 hover:bg-purple-700 px-5 py-2 rounded-xl font-semibold transition shadow-md"
        >
          View Transaction History
        </Link>
      </div>

      <div className="max-w-2xl mx-auto">
        <form
          onSubmit={handleSave}
          className="bg-gray-900 border border-gray-800 rounded-2xl shadow-xl p-8 space-y-6"
        >

          <div>
            <label className="block mb-2 text-sm text-gray-400">
              Email Address
            </label>

            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 px-4 py-3 rounded-lg"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-400">
              New Password (optional)
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 px-4 py-3 rounded-lg"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-400">
              Confirm Password
            </label>

            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 px-4 py-3 rounded-lg"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold transition shadow-lg"
          >
            Update Settings
          </button>
        </form>
      </div>

      <ToastContainer position="top-right" />
    </div>
  );
}