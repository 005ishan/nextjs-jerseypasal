"use client";

import Link from "next/link";

export default function Page() {
  return (
    <section className="bg-gray-950 text-white">

      {/* HERO SECTION */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            Keep Calm <br />
            <span className="text-purple-500">And Love Jersey.</span>
          </h1>
          <p className="mt-6 text-gray-400 max-w-md">
            Discover premium football and basketball jerseys from top clubs and
            countries around the world.
          </p>
          <div className="mt-8 flex gap-4 flex-wrap">
            <Link
              href="/auth/category/country"
              className="px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-md font-semibold transition"
            >
              Shop Country Jerseys
            </Link>
            <Link
              href="/auth/category/clubs"
              className="px-8 py-3 border border-gray-600 hover:border-purple-500 rounded-md font-semibold transition"
            >
              Shop Clubs Jerseys
            </Link>
          </div>
        </div>

        <div className="flex justify-center">
          <img
            src="/images/clienthome.png"
            alt="Featured Jersey"
            className="max-w-md rounded-3xl shadow-2xl"
          />
        </div>
      </div>

      {/* BOLD DART BANNER */}
      <div className="relative overflow-hidden bg-gray-950 border-y border-gray-800">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-purple-900/30 pointer-events-none" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full border border-purple-800/25 pointer-events-none" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-purple-700/20 pointer-events-none" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[150px] h-[150px] rounded-full border border-purple-600/20 pointer-events-none" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-purple-700/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 top-0 w-72 h-full bg-purple-900/10 blur-3xl pointer-events-none" />
        <div className="absolute -right-20 top-0 w-72 h-full bg-purple-900/10 blur-3xl pointer-events-none" />
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10" xmlns="http://www.w3.org/2000/svg">
          <line x1="0" y1="0" x2="50%" y2="50%" stroke="#a855f7" strokeWidth="1" />
          <line x1="100%" y1="0" x2="50%" y2="50%" stroke="#a855f7" strokeWidth="1" />
          <line x1="0" y1="100%" x2="50%" y2="50%" stroke="#a855f7" strokeWidth="1" />
          <line x1="100%" y1="100%" x2="50%" y2="50%" stroke="#a855f7" strokeWidth="1" />
          <line x1="50%" y1="0" x2="50%" y2="50%" stroke="#a855f7" strokeWidth="1" />
          <line x1="0" y1="50%" x2="50%" y2="50%" stroke="#a855f7" strokeWidth="1" />
          <line x1="100%" y1="50%" x2="50%" y2="50%" stroke="#a855f7" strokeWidth="1" />
          <line x1="50%" y1="100%" x2="50%" y2="50%" stroke="#a855f7" strokeWidth="1" />
        </svg>

        <div className="relative max-w-7xl mx-auto px-6 py-24 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="text-center md:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-purple-900/40 border border-purple-700/50 text-purple-300 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse inline-block" />
              New Season Drop
            </div>
            <h2 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Aim for the <br />
              <span className="text-purple-400">Bullseye.</span>
            </h2>
            <p className="mt-5 text-gray-400 text-lg max-w-lg">
              Hit the mark with precision-crafted jerseys built for those who play with purpose. Your kit. Your target. Your game.
            </p>
          </div>

          <div className="flex flex-col gap-4 shrink-0">
            <Link
              href="/auth/category/clubs"
              className="px-10 py-4 bg-purple-600 hover:bg-purple-500 text-white font-extrabold rounded-full hover:scale-105 transition shadow-[0_0_20px_rgba(168,85,247,0.4)] text-center"
            >
              Club Jerseys
            </Link>
            <Link
              href="/auth/category/country"
              className="px-10 py-4 border border-gray-600 hover:border-purple-500 text-gray-300 hover:text-white font-semibold rounded-full transition text-center"
            >
              Country Jerseys
            </Link>
          </div>
        </div>
      </div>

      {/* FEATURED CATEGORIES */}
      <div className="py-20 px-6 bg-black/40">
        <h2 className="text-3xl font-bold text-center mb-12">Explore Categories</h2>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
          <Link href="/auth/category/clubs" className="relative group overflow-hidden rounded-2xl">
            <img src="/images/barcelona.png" className="w-full h-72 object-cover group-hover:scale-105 transition" />
            <div className="absolute bottom-6 left-6 text-2xl font-bold">Club Jerseys</div>
          </Link>
          <Link href="/auth/category/country" className="relative group overflow-hidden rounded-2xl">
            <img src="/images/japan.png" className="w-full h-72 object-cover group-hover:scale-105 transition" />
            <div className="absolute bottom-6 left-6 text-2xl font-bold">Country Jerseys</div>
          </Link>
        </div>
      </div>

      {/* TRUST FEATURES */}
      <div className="py-20 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Why Shop With Us?</h2>
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-gray-900 p-8 rounded-xl hover:scale-105 transition">
            <h3 className="text-xl font-semibold mb-3">🛒 Easy Shopping</h3>
            <p className="text-gray-400">Simple and fast jersey buying experience.</p>
          </div>
          <div className="bg-gray-900 p-8 rounded-xl hover:scale-105 transition">
            <h3 className="text-xl font-semibold mb-3">🚀 Fast Delivery</h3>
            <p className="text-gray-400">Get your favourite jerseys delivered quickly.</p>
          </div>
          <div className="bg-gray-900 p-8 rounded-xl hover:scale-105 transition">
            <h3 className="text-xl font-semibold mb-3">⭐ Premium Quality</h3>
            <p className="text-gray-400">Best quality sports jerseys guaranteed.</p>
          </div>
        </div>
      </div>

    </section>
  );
}