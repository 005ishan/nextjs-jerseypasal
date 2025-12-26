export default function Page() {
  return (
    <div className="min-h-screen bg-[#9795FF]">
      {/* NAVBAR */}
      <header className="w-full py-8 bg-[#542383] border-b border-black/10">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Left nav */}
          <nav className="hidden sm:flex space-x-6 text-sm font-medium text-white">
            <a href="#">Adult</a>
            <a href="#">Kid</a>
            <a href="#">Cart</a>
            <a href="#">ABOUT</a>
          </nav>

          {/* Logo */}
          <h1 className="text-xl font-bold tracking-wide text-white">
            JERSEY<span className="font-extrabold">पसल</span>
          </h1>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            <button className="hidden sm:block text-sm px-4 py-1 rounded-full bg-white shadow">
              <img src="/icons/nepal.svg" className="w-5 h-5"/>
            </button>

            <input
              placeholder="🔍Search..."
              className="hidden sm:block rounded-full px-4 py-1 text-sm outline-none shadow bg-white"
            />

            <div className="relative">
              <span className="text-xl">🛒</span>
              <span className="absolute -top-2 -right-2 text-xs bg-black text-white rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Left */}
        <div>
          <h2 className="text-5xl md:text-6xl font-extrabold text-[#2D197A]">
            Keep Calm
          </h2>

          <h3 className="mt-2 text-3xl md:text-4xl font-bold text-[#2D197A]">
            And Love <br /> Jersey.
          </h3>

          <div className="mt-6 flex items-center gap-4">
            <button className="px-8 py-2 bg-[#F25019] hover:bg-[#ff7f59] text-white font-semibold rounded-md shadow"    >
              Add to cart
            </button>

            <button className="font-semibold">
              New Collection
            </button>
          </div>

          {/* Top Picks */}
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

        {/* Right — Main Product Image */}
        <div className="flex justify-center">
          
        </div>
      </section>
    </div>
  );
}
