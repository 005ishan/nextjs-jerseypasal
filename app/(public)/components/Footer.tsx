export default function Footer() {
  return (
    <footer className="w-full border-t bg-[#542383] dark:bg-neutral-900 dark:border-neutral-800">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          <div>
            <h3 className="text-lg font-semibold text-white">Jerseyपसल</h3>
            <p className="mt-2 text-sm text-[#F8D35B] dark:text-gray-300">
              Building awesome web experiences with Next.js 🚀
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-[#F8D35B]">Links</h4>
            <ul className="mt-2 space-y-1 text-sm text-white">
              <li>
                <a href="/" className="hover:underline focus:outline-none focus:underline">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="hover:underline focus:outline-none focus:underline">
                  About
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:underline focus:outline-none focus:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[#F8D35B]">Follow Us</h4>
            <ul className="mt-2 space-y-1 text-sm text-white">
              <li>
                <a href="#" className="hover:underline focus:outline-none focus:underline">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline focus:outline-none focus:underline">
                  GitHub
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline focus:outline-none focus:underline">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/20 dark:border-neutral-700 pt-6">
          <p className="text-center text-sm text-white/90 dark:text-gray-400">
            © {new Date().getFullYear()} Jerseyपसल — All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
