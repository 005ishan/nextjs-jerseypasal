export default function Page() {
  return (
    <section className="w-full">

      {/* ===== HERO STRIP ===== */}
      <div className="w-full bg-gradient-to-br from-[#542383] via-[#6b2ca6] to-[#3a165e] text-white">
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold">
            About Our Brand
          </h1>

          <p className="mt-6 text-white/80 max-w-2xl mx-auto text-lg">
            We design modern athletic wear focused on movement, comfort and
            confidence — built for everyday athletes and street style.
          </p>
        </div>
      </div>

      {/* ===== STORY SECTION ===== */}
      <div className="max-w-7xl mx-auto px-4 py-20 grid lg:grid-cols-2 gap-14 items-center">

        {/* IMAGE SIDE */}
        <div className="relative flex justify-center">
          <div className="absolute w-[300px] h-[300px] bg-[#f8d35b]/20 blur-[120px] rounded-full" />
          <img
            src="/images/spain.png"
            alt="Premium Sportswear"
            className="relative z-10 w-[220px] md:w-[320px] object-contain drop-shadow-2xl"
          />
        </div>

        {/* TEXT SIDE */}
        <div className="space-y-6 text-center lg:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-[#542383]">
            Designed for Movement
          </h2>

          <p className="text-gray-600 text-lg">
            Our mission is simple — create premium sportswear that blends
            performance with modern aesthetics. Every piece is crafted with
            breathable materials, clean silhouettes and bold identity.
          </p>

          <p className="text-gray-600">
            We believe style and performance should live together. Whether
            you're active or off-duty, our designs adapt to your lifestyle.
          </p>
        </div>
      </div>

      {/* ===== VALUES SECTION ===== */}
      <div className="bg-[#faf7ff] py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center text-[#542383] mb-14">
            What We Stand For
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {["Quality", "Comfort", "Confidence"].map((item) => (
              <div
                key={item}
                className="bg-white rounded-3xl p-8 text-center shadow-lg hover:-translate-y-2 transition"
              >
                <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-[#f8d35b]/30 flex items-center justify-center">
                  <div className="w-6 h-6 bg-[#542383] rounded-full" />
                </div>

                <h3 className="text-xl font-semibold text-[#542383] mb-3">
                  {item}
                </h3>

                <p className="text-gray-600">
                  Premium materials and modern athletic design focused on real
                  everyday performance.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
