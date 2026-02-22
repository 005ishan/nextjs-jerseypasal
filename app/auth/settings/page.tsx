"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log({
      email,
      password,
    });

    alert("Settings updated successfully!");
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-10 text-white">
      <h1 className="text-3xl font-bold mb-8">Account Settings</h1>

      <form
        onSubmit={handleSave}
        className="bg-gray-900 p-8 rounded-xl shadow-lg space-y-6"
      >
        {/* Email */}
        <div>
          <label className="block mb-2 text-sm text-gray-400">
            Email Address
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Enter your email"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block mb-2 text-sm text-gray-400">
            New Password
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Enter new password"
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block mb-2 text-sm text-gray-400">
            Confirm Password
          </label>
          <input
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 px-4 py-3 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Confirm new password"
          />
        </div>

        {/* Save Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-lg font-semibold"
        >
          Update Settings
        </button>
      </form>
    </div>
  );
}