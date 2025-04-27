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
        <div className="bg-white bg-opacity-75 rounded-md p-4 mx-auto w-full sm:w-3/4 md:w-2/3 lg:w-1/2 text-center">
          <p className="text-gray-700">
            No tiene resultados para mostrar. Por favor, ingresa una ciudad y
            presiona weather .
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[550px] overflow-y-auto">
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