import Link from "next/link";

export default function Page() {
  return (
    <section className="bg-gray-950 text-white">
      {/* HERO SECTION */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            Keep Calm <br />
            <span className="text-purple-500">And Love Jersey.</span>
          </h1>

          <p className="mt-6 text-gray-400 max-w-md">
            Discover premium football and basketball jerseys from top clubs and
            countries around the world.
          </p>

          <div className="mt-8 flex gap-4">
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

        {/* Right Image */}
        <div className="flex justify-center">
          <img
            src="/images/clienthome.png"
            alt="Featured Jersey"
            className="w-166 rounded-3xl shadow-2xl"
          />
        </div>
      </div>

      {/* TOP PICKS SECTION */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
        <h2 className="text-2xl font-bold mb-8">🔥 Top Picks</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-gray-900 rounded-xl p-4 hover:scale-105 transition">
            <img
              src="/images/psg.png"
              className="h-60 w-full object-cover rounded-lg"
              alt="PSG"
            />
            <p className="mt-3 font-semibold">PSG Home Kit</p>
            <p className="text-purple-500 font-bold">$49.99</p>
          </div>

          <div className="bg-gray-900 rounded-xl p-4 hover:scale-105 transition">
            <img
              src="/images/arsenal.png"
              className="h-60 w-full object-cover rounded-lg"
              alt="Arsenal"
            />
            <p className="mt-3 font-semibold">Arsenal Jersey</p>
            <p className="text-purple-500 font-bold">$44.99</p>
          </div>

          <div className="bg-gray-900 rounded-xl p-4 hover:scale-105 transition">
            <img
              src="/images/barcelona.png"
              className="h-60 w-full object-cover rounded-lg"
              alt="Barcelona"
            />
            <p className="mt-3 font-semibold">Barcelona Kit</p>
            <p className="text-purple-500 font-bold">$54.99</p>
          </div>

          <div className="bg-gray-900 rounded-xl p-4 hover:scale-105 transition">
            <img
              src="/images/lakers.png"
              className="h-60 w-full object-cover rounded-lg"
              alt="Lakers"
            />
            <p className="mt-3 font-semibold">Lakers Jersey</p>
            <p className="text-purple-500 font-bold">$59.99</p>
          </div>
        </div>
      </div>
    </section>
  );
}
