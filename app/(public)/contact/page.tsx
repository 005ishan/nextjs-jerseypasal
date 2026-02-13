"use client";

import { useState } from "react";
import { toast } from "react-toastify";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setLoading(true);

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.success) {
      toast.success("Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    } else {
      toast.error("Failed to send message");
    }
    setLoading(false);
  };
  return (
    <main className="min-h-screen bg-gray-950 text-white px-6 py-12">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold">Contact Us</h1>

        <p className="text-gray-400">
          Have questions or feedback? Send us a message and we will get back to
          you.
        </p>

        <form className="space-y-4 mt-6" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 text-sm">Name</label>
            <input
              type="text"
              className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 outline-none focus:border-blue-500"
              placeholder="Your name"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Email</label>
            <input
              type="email"
              className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 outline-none focus:border-blue-500"
              placeholder="you@example.com"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Message</label>
            <textarea
              rows={5}
              className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 outline-none focus:border-blue-500"
              placeholder="Write your message..."
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 transition px-6 py-2 rounded-lg font-medium flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading && (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            )}

            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </main>
  );
}
