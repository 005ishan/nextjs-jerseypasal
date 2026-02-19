"use client";

import { useFavourite } from "../context/FavouriteContext";

export default function Page() {
  const { favourites } = useFavourite();

  return (
    <section className="bg-gray-950 min-h-screen text-white py-14">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-10">❤️ My Favourites</h1>

        {favourites.length === 0 ? (
          <p>No favourites added yet.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {favourites.map((item) => (
              <div key={item.id} className="bg-gray-900 p-4 rounded-xl">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-60 w-full object-cover rounded-lg"
                />
                <p className="mt-4 text-center font-semibold">{item.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
