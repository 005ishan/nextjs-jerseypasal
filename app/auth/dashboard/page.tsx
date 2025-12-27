export default function Page() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
      <div>
        <h2 className="text-5xl md:text-6xl font-extrabold text-[#2D197A]">
          Keep Calm
        </h2>

        <h3 className="mt-2 text-3xl md:text-4xl font-bold text-[#2D197A]">
          And Love <br /> Jersey.
        </h3>

        <div className="mt-6 flex items-center gap-4">
          <button className="px-8 py-2 bg-[#F25019] hover:bg-[#ff7f59] text-white font-semibold rounded-md shadow">
            Add to cart
          </button>

          <button className="font-semibold">New Collection</button>
        </div>

        <div className="mt-10">
          <span className="inline-block bg-black text-white px-10 py-2 rounded">
            Top picks
          </span>

          <div className="mt-4 flex gap-4 overflow-x-auto">
            <img
              src="/images/psg.png"
              className="h-55 w-40 rounded-2xl object-cover"
              alt="Top pick"
            />
            <img
              src="/images/arsenal.png"
              className="h-55 w-40 rounded-2xl object-cover"
              alt="Top pick"
            />
            <img
              src="/images/barcelona.png"
              className="h-55 w-40 rounded-2xl object-cover"
              alt="Top pick"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center">

      </div>
    </section>
  );
}
