"use client";

import { useState } from "react";
import { Heart } from "lucide-react";

export default function Page() {
  const countries = [
    { id: 1, name: "Brazil", image: "/images/brazil.png" },
    { id: 2, name: "Argentina", image: "/images/argentina.png" },
    { id: 3, name: "France", image: "/images/france.png" },
    { id: 4, name: "Germany", image: "/images/germany.png" },
  ];

  const [favourites, setFavourites] = useState<number[]>([]);

  const toggleFavourite = (id: number) => {
    if (favourites.includes(id)) {
      setFavourites(favourites.filter((item) => item !== id));
    } else {
      setFavourites([...favourites, id]);
    }
  };

  return (
    <section className="bg-gray-950 min-h-screen text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <h1 className="text-4xl font-bold mb-10">🌍 Country Jerseys</h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {countries.map((country) => {
            const isFav = favourites.includes(country.id);

            return (
              <div
                key={country.id}
                className="relative bg-gray-900 rounded-xl p-4 hover:scale-105 transition duration-300"
              >
                {/* Favourite Icon */}
                <button
                  onClick={() => toggleFavourite(country.id)}
                  className="absolute top-3 right-3"
                >
                  <Heart
                    className={`w-6 h-6 transition ${
                      isFav
                        ? "fill-red-500 text-red-500"
                        : "text-gray-400 hover:text-red-400"
                    }`}
                  />
                </button>

                <img
                  src={country.image}
                  alt={country.name}
                  className="h-60 w-full object-cover rounded-lg"
                />

                <p className="mt-4 font-semibold text-center">{country.name}</p>

                <button className="mt-4 w-full bg-purple-600 hover:bg-purple-800 py-2 rounded-md text-sm font-medium">
                  View Jerseys
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
