"use client";

import { createContext, useContext, useEffect, useState } from "react";

type FavouriteItem = {
  id: number;
  name: string;
  image: string;
  type: "club" | "country";
};

type FavouriteContextType = {
  favourites: FavouriteItem[];
  toggleFavourite: (item: FavouriteItem) => void;
  isFavourite: (id: number) => boolean;
};

const FavouriteContext = createContext<FavouriteContextType | undefined>(undefined);

export const FavouriteProvider = ({ children }: { children: React.ReactNode }) => {
  const [favourites, setFavourites] = useState<FavouriteItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("favourites");
    if (stored) setFavourites(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  const toggleFavourite = (item: FavouriteItem) => {
    const exists = favourites.find((fav) => fav.id === item.id);

    if (exists) {
      setFavourites(favourites.filter((fav) => fav.id !== item.id));
    } else {
      setFavourites([...favourites, item]);
    }
  };

  const isFavourite = (id: number) => {
    return favourites.some((fav) => fav.id === id);
  };

  return (
    <FavouriteContext.Provider value={{ favourites, toggleFavourite, isFavourite }}>
      {children}
    </FavouriteContext.Provider>
  );
};

export const useFavourite = () => {
  const context = useContext(FavouriteContext);
  if (!context) throw new Error("useFavourite must be used inside FavouriteProvider");
  return context;
};
