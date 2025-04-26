// components/WeatherCardList.jsx
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import WeatherCard from './WeatherCard';

function WeatherCardList() {
  const { weatherHistory, setWeatherHistory } = useContext(AppContext);

  const handleCloseCard = (indexToRemove) => {
    setWeatherHistory(prevHistory => prevHistory.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="mt-6">
      {weatherHistory.length === 0 ? (
        <p>No weather searches yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto"> {/* Añadimos max-h-96 y overflow-y-auto */}
          {weatherHistory.map((weather, index) => (
            <div key={index} className="relative">
              <WeatherCard
                weather={weather}
                onClose={() => handleCloseCard(index)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WeatherCardList;