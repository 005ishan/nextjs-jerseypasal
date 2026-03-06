"use client";

import { Heart } from "lucide-react";
import { useFavourite } from "../context/FavouriteContext";

type Props = {
  id: number;
  name: string;
  image: string;
  type: "club" | "country";
};

export default function JerseyCard({ id, name, image, type }: Props) {
  const { toggleFavourite, isFavourite } = useFavourite();
  const fav = isFavourite(id);

  return (
    <div className="relative bg-gray-900 rounded-xl p-4 hover:scale-105 transition duration-300">
      <button
        onClick={() => toggleFavourite({ id, name, image, type })}
        className="absolute top-3 right-3"
      >
        <Heart
          className={`w-6 h-6 transition ${
            fav
              ? "fill-red-500 text-red-500"
              : "text-gray-400 hover:text-red-400"
          }`}
        />
      </button>

      <img
        src={image}
        alt={name}
        className="h-60 w-full object-cover rounded-lg"
      />

      <p className="mt-4 font-semibold text-center">{name}</p>

      <button className="mt-4 w-full bg-purple-600 hover:bg-purple-800 py-2 rounded-md text-sm font-medium">
        View Jerseys
      </button>
    </div>
  );
}
