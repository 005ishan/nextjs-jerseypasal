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

        {/* Hero Image */}
        <div className="flex justify-center">
          <img
            src="/images/clienthome.png"
            alt="Featured Jersey"
            className="max-w-md rounded-3xl shadow-2xl"
          />
        </div>
      </div>

      {/* TOP PICKS */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
        <h2 className="text-2xl font-bold mb-8">Top Picks</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          {[
            { img: "/images/psg.png", name: "PSG Home Kit", price: "" },
            { img: "/images/arsenal.png", name: "Arsenal Jersey", price: "" },
            { img: "/images/barcelona.png", name: "Barcelona Kit", price: "" },
            { img: "/images/spain.png", name: "Spain National Kit", price: "" },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-gray-900 rounded-xl p-4 hover:scale-105 transition shadow-lg"
            >
              <img
                src={item.img}
                className="h-60 w-full object-cover rounded-lg"
                alt={item.name}
              />
              <p className="mt-3 font-semibold">{item.name}</p>
              <p className="text-purple-500 font-bold">{item.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURED CATEGORIES */}
      <div className="py-20 px-6 bg-black/40">
        <h2 className="text-3xl font-bold text-center mb-12">
          Explore Categories
        </h2>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">

          <Link
            href="/auth/category/clubs"
            className="relative group overflow-hidden rounded-2xl"
          >
            <img
              src="/images/barcelona.png"
              className="w-full h-72 object-cover group-hover:scale-105 transition"
            />

            <div className="absolute bottom-6 left-6 text-2xl font-bold">
              Club Jerseys
            </div>
          </Link>

          <Link
            href="/auth/category/country"
            className="relative group overflow-hidden rounded-2xl"
          >
            <img
              src="/images/japan.png"
              className="w-full h-72 object-cover group-hover:scale-105 transition"
            />

            <div className="absolute bottom-6 left-6 text-2xl font-bold">
              Country Jerseys
            </div>
          </Link>

        </div>
      </div>

      {/* TRUST FEATURES */}
      <div className="py-20 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Shop With Us?
        </h2>

        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 text-center">

          <div className="bg-gray-900 p-8 rounded-xl hover:scale-105 transition">
            <h3 className="text-xl font-semibold mb-3">🛒 Easy Shopping</h3>
            <p className="text-gray-400">
              Simple and fast jersey buying experience.
            </p>
          </div>

          <div className="bg-gray-900 p-8 rounded-xl hover:scale-105 transition">
            <h3 className="text-xl font-semibold mb-3">🚀 Fast Delivery</h3>
            <p className="text-gray-400">
              Get your favourite jerseys delivered quickly.
            </p>
          </div>

          <div className="bg-gray-900 p-8 rounded-xl hover:scale-105 transition">
            <h3 className="text-xl font-semibold mb-3">⭐ Premium Quality</h3>
            <p className="text-gray-400">
              Best quality sports jerseys guaranteed.
            </p>
          </div>

        </div>
      </div>

    </section>
  );
}