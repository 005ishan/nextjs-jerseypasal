export default function Header() {
  return (
    <header className="w-full py-8 bg-[#542383] border-b border-black/10">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <nav className="hidden sm:flex space-x-6 text-sm font-medium text-white">
          <a href="#">Adult</a>
          <a href="#">Kid</a>
          <a href="#">Cart</a>
          <a href="#">ABOUT</a>
        </nav>

        <h1 className="text-xl font-bold tracking-wide text-white">
          JERSEY<span className="font-extrabold">पसल</span>
        </h1>

        <div className="flex items-center space-x-4">
          <button className="hidden sm:block text-sm px-4 py-1 rounded-full bg-white shadow">
            <img src="/icons/nepal.svg" className="w-5 h-5" />
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
  );
}
