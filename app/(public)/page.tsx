"use client";

import { useEffect, useState } from "react";
import api from "../services/api";

export default function Home() {
  const [status, setStatus] = useState("");

  useEffect(() => {
    api.get("/").then((res) => {
      setStatus(res.data.status);
    });
  }, []);

  return (
    <main className="w-full min-h-screen text-white overflow-hidden">
      <section className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#542383] via-[#6b2ca6] to-[#3a165e]" />

        <div className="absolute -top-32 -left-32 w-[420px] h-[420px] bg-[#f8d35b]/20 blur-[160px] rounded-full" />
        <div className="absolute top-20 right-0 w-[300px] h-[300px] bg-white/10 blur-[140px] rounded-full" />

        <div className="relative max-w-7xl mx-auto px-5 py-20 grid lg:grid-cols-2 gap-14 items-center">
          <div className="space-y-7 text-center lg:text-left">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
              Move Different.
              <br />
              <span className="text-[#f8d35b]">Wear Confidence.</span>
            </h1>

            <p className="text-lg text-white/80 max-w-xl mx-auto lg:mx-0">
              Modern athletic wear crafted with premium fabric, clean design and
              bold energy. Built for everyday motion — on court or off duty.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2">
              <button className="bg-[#f8d35b] text-black font-semibold px-8 py-3 rounded-full shadow-xl hover:scale-105 transition">
                Explore Collection
              </button>

              <button className="px-8 py-3 rounded-full border border-white/40 hover:bg-white hover:text-[#542383] transition">
                Discover Style
              </button>
            </div>
          </div>

          <div className="relative flex justify-center items-center">
            <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-[32px] p-6 shadow-2xl">
              <div className="flex gap-6">
                <img
                  src="/images/arsenal.png"
                  alt="Jersey"
                  className="w-[140px] sm:w-[180px] md:w-[220px] object-contain drop-shadow-2xl hover:-translate-y-2 transition duration-500"
                />
                <img
                  src="/images/barcelona.png"
                  alt="Jersey"
                  className="w-[140px] sm:w-[180px] md:w-[220px] object-contain drop-shadow-2xl hover:translate-y-2 transition duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#faf7ff] text-black py-20">
        <div className="max-w-7xl mx-auto px-5">
          <h2 className="text-3xl md:text-5xl font-bold text-center text-[#542383] mb-14">
            Designed for Movement
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition duration-300 hover:-translate-y-3"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-[#f8d35b]/20 to-transparent rounded-3xl transition" />

                <div className="relative flex justify-center mb-6">
                  <img
                    src={
                      i % 2 === 0
                        ? "/images/argentina.png"
                        : "/images/germany.png"
                    }
                    alt="Premium Jersey"
                    className="h-56 object-contain group-hover:scale-105 transition duration-300"
                  />
                </div>

                <div className="relative text-center space-y-3">
                  <h3 className="text-xl font-semibold text-[#542383]">
                    Premium Fit
                  </h3>
                  <p className="text-sm text-gray-600">
                    Clean silhouettes, breathable material and modern athletic
                    styling made for daily wear.
                  </p>
                  <button className="mt-2 bg-[#542383] text-white px-6 py-2 rounded-full hover:bg-[#3d1763] transition">
                    View Style
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
