import React, { createContext, useContext, useState } from 'react';

// Create Context
const FavoritesContext = createContext();

// Provide Context
export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  

  // Toggle favorite (add/remove place)
  const toggleFavorite = (place) => {
    setFavorites((prev) => {
      const isFavorite = prev.some((fav) => fav.name === place.name);
      if (isFavorite) {
        // Remove from favorites
        return prev.filter((fav) => fav.name !== place.name);
      } else {
        // Add to favorites
        return [...prev, place];
      }
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

// Use Context Hook
export const useFavorites = () => useContext(FavoritesContext);
