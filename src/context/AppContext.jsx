import React, { useState, createContext } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [globalState, setGlobalState] = useState('valor inicial');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [weatherResults, setWeatherResults] = useState(null);
  const [weatherHistory, setWeatherHistory] = useState([]);
  const [isAuthModalVisible, setIsAuthModalVisible] = useState(false);
  const [isAddFavoriteModalVisible, setIsAddFavoriteModalVisible] = useState(false);

  const updateGlobalState = (newValue) => {
    setGlobalState(newValue);
  };


  return (
    <AppContext.Provider
      value={{
        globalState,
        updateGlobalState,
        isLoggedIn,
        setIsLoggedIn,
        userData,
        setUserData,
        favorites,
        setFavorites,
        weatherResults,
        setWeatherResults,
        weatherHistory,
        setWeatherHistory,
        isAuthModalVisible,
        setIsAuthModalVisible,
        isAddFavoriteModalVisible, 
        setIsAddFavoriteModalVisible,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};