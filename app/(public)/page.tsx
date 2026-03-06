"use client";

import { useState } from "react";

const COLLECTION = [
  { id: 1, name: "Arsenal Home Kit", img: "/images/arsenal.png", price: "Rs 2000", tag: "Best Seller" },
  { id: 2, name: "Barcelona Home Kit", img: "/images/barcelona.png", price: "Rs 1999", tag: "New" },
  { id: 3, name: "Argentina World Cup", img: "/images/argentina.png", price: "Rs 1000", tag: "Limited" },
  { id: 4, name: "Germany Classic", img: "/images/germany.png", price: "Rs 1650", tag: "Popular" },
  { id: 5, name: "Arsenal Third Kit", img: "/images/arsenalthirdkit.png", price: "Rs 2000" },
  { id: 6, name: "Barcelona Special", img: "/images/barcelonaspecial.png", price: "Rs 1999", tag: "Premium" },
];

const STYLES = [
  { id: 1, name: "Court Edition", img: "/images/germany.png", desc: "Designed for high-intensity play with moisture-wicking fabric and ergonomic fit.", price: "Rs 1800" },
  { id: 2, name: "Street Edition", img: "/images/argentina.png", desc: "Casual streetwear energy with premium jersey construction for everyday wear.", price: "Rs 1000" },
  { id: 3, name: "Pro Edition", img: "/images/germany.png", desc: "Match-day quality with full breathability and tailored athletic silhouette.", price: "Rs 1800" },
];

export default function Home() {
  const [modal, setModal] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const openProduct = (p: any) => { setSelectedProduct(p); setModal("product"); };
  const closeModal = () => setModal(null);

  return (
    <main className="w-full min-h-screen text-white overflow-hidden">

      {/* Hero */}
      <section className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#542383] via-[#6b2ca6] to-[#3a165e]" />
        <div className="absolute -top-32 -left-32 w-[420px] h-[420px] bg-[#f8d35b]/20 blur-[160px] rounded-full" />
        <div className="absolute top-20 right-0 w-[300px] h-[300px] bg-white/10 blur-[140px] rounded-full" />

        <div className="relative max-w-7xl mx-auto px-5 py-20 grid lg:grid-cols-2 gap-14 items-center">
          <div className="space-y-7 text-center lg:text-left">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
              Move Different.<br />
              <span className="text-[#f8d35b]">Wear Confidence.</span>
            </h1>
            <p className="text-lg text-white/80 max-w-xl mx-auto lg:mx-0">
              Modern athletic wear crafted with premium fabric, clean design and bold energy. Built for everyday motion — on court or off duty.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2">
              <button onClick={() => setModal("collection")} className="bg-[#f8d35b] text-black font-semibold px-8 py-3 rounded-full shadow-xl hover:scale-105 transition">
                Explore Collection
              </button>
              <button onClick={() => setModal("styles")} className="px-8 py-3 rounded-full border border-white/40 hover:bg-white hover:text-[#542383] transition">
                Discover Style
              </button>
            </div>
          </div>

          <div className="relative flex justify-center items-center">
            <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-[32px] p-6 shadow-2xl">
              <div className="flex gap-6">
                <img src="/images/arsenal.png" alt="Jersey" onClick={() => openProduct(COLLECTION[0])} className="w-[140px] sm:w-[180px] md:w-[220px] object-contain drop-shadow-2xl hover:-translate-y-2 transition duration-500 cursor-pointer" />
                <img src="/images/barcelona.png" alt="Jersey" onClick={() => openProduct(COLLECTION[1])} className="w-[140px] sm:w-[180px] md:w-[220px] object-contain drop-shadow-2xl hover:translate-y-2 transition duration-500 cursor-pointer" />
              </div>
              <p className="text-center text-white/50 text-xs mt-3">Click a jersey to view details</p>
            </div>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="bg-[#faf7ff] text-black py-20">
        <div className="max-w-7xl mx-auto px-5">
          <h2 className="text-3xl md:text-5xl font-bold text-center text-[#542383] mb-14">Designed for Movement</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {STYLES.map((style) => (
              <div key={style.id} className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition duration-300 hover:-translate-y-3">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-[#f8d35b]/20 to-transparent rounded-3xl transition" />
                <div className="relative flex justify-center mb-6">
                  <img src={style.img} alt={style.name} className="h-56 object-contain group-hover:scale-105 transition duration-300" />
                </div>
                <div className="relative text-center space-y-3">
                  <h3 className="text-xl font-semibold text-[#542383]">Premium Fit</h3>
                  <p className="text-sm text-gray-600">Clean silhouettes, breathable material and modern athletic styling made for daily wear.</p>
                  <button onClick={() => openProduct(style)} className="mt-2 bg-[#542383] text-white px-6 py-2 rounded-full hover:bg-[#3d1763] transition">
                    View Style
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeModal} />
          <div className="relative bg-white text-black rounded-3xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between px-8 py-5 border-b border-gray-100 sticky top-0 bg-white rounded-t-3xl z-10">
              <h2 className="text-xl font-bold text-[#542383]">
                {modal === "collection" && "Our Collection"}
                {modal === "styles" && "Discover Your Style"}
                {modal === "product" && selectedProduct?.name}
                {modal === "login" && "Login Required"}
              </h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-black text-2xl leading-none">×</button>
            </div>

            <div className="px-8 py-6">

              {/* Collection */}
              {modal === "collection" && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
                  {COLLECTION.map((item) => (
                    <div key={item.id} onClick={() => openProduct(item)} className="cursor-pointer bg-gray-50 rounded-2xl p-4 hover:shadow-lg hover:-translate-y-1 transition text-center">
                      {item.tag && <span className="text-xs bg-[#f8d35b] text-black font-bold px-2 py-0.5 rounded-full">{item.tag}</span>}
                      <img src={item.img} alt={item.name} className="h-28 object-contain mx-auto my-3" />
                      <p className="text-sm font-semibold text-[#542383]">{item.name}</p>
                      <p className="text-sm text-gray-500">{item.price}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Styles */}
              {modal === "styles" && (
                <div className="space-y-5">
                  {STYLES.map((style) => (
                    <div key={style.id} onClick={() => openProduct(style)} className="flex items-center gap-5 p-4 bg-gray-50 rounded-2xl cursor-pointer hover:shadow-md transition">
                      <img src={style.img} alt={style.name} className="h-20 w-20 object-contain" />
                      <div>
                        <p className="font-bold text-[#542383]">{style.name}</p>
                        <p className="text-sm text-gray-500">{style.desc}</p>
                        <p className="text-sm font-semibold mt-1">{style.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Product */}
              {modal === "product" && selectedProduct && (
                <div className="flex flex-col sm:flex-row gap-8 items-center">
                  <img src={selectedProduct.img} alt={selectedProduct.name} className="h-48 object-contain" />
                  <div className="space-y-4 flex-1">
                    {selectedProduct.tag && <span className="bg-[#f8d35b] text-black text-xs font-bold px-3 py-1 rounded-full">{selectedProduct.tag}</span>}
                    <p className="text-3xl font-bold text-[#542383]">{selectedProduct.price}</p>
                    <p className="text-gray-600">{selectedProduct.desc || "Clean silhouettes, breathable material and modern athletic styling made for daily wear."}</p>
                    <button
                      onClick={() => setModal("login")}
                      className="w-full py-3 rounded-full font-semibold bg-[#542383] text-white hover:bg-[#3d1763] transition"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              )}

              {/* Login Required */}
              {modal === "login" && (
                <div className="flex flex-col items-center text-center py-6 gap-5">
                  <div className="w-16 h-16 rounded-full bg-[#f8d35b]/20 flex items-center justify-center text-3xl">
                    🔒
                  </div>
                  <div>
                    <p className="text-xl font-bold text-[#542383]">Login Required</p>
                    <p className="text-gray-500 mt-2 text-sm">You need to be logged in to add items to your cart and make purchases.</p>
                  </div>
                  <div className="flex gap-3 w-full pt-2">
                    <a href="/login" className="flex-1 bg-[#542383] text-white font-semibold py-3 rounded-full hover:bg-[#3d1763] transition text-center">
                      Log In
                    </a>
                    <a href="/register" className="flex-1 border border-[#542383] text-[#542383] font-semibold py-3 rounded-full hover:bg-[#542383] hover:text-white transition text-center">
                      Sign Up
                    </a>
                  </div>
                  <button onClick={closeModal} className="text-sm text-gray-400 hover:text-gray-600 transition">
                    Continue Browsing
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </main>
  );
}