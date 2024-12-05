import React, { createContext, useContext, useState } from 'react';

// Create Context
const AppContext = createContext();

// Provide Context
export const AppProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [Screentheme, setTheme] = useState('light'); // 'light' or 'dark'
  const [temperatureUnit, setTemperatureUnit] = useState('C'); // 'C' or 'F'

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

  // Toggle theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Change temperature unit
  const changeTemperatureUnit = (unit) => {
    setTemperatureUnit(unit); // 'C' or 'F'
  };

  return (
    <AppContext.Provider
      value={{
        favorites,
        toggleFavorite,
        Screentheme,
        toggleTheme,
        temperatureUnit,
        changeTemperatureUnit,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Use Context Hook
export const useAppContext = () => useContext(AppContext);
