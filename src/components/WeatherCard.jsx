// components/WeatherCard.jsx
import React from 'react';

function WeatherCard({ weather, onClose }) {
  return (
    <div className="p-4 bg-white bg-opacity-80 rounded-md shadow-md mb-4 relative">
      <h3 className="text-xl font-semibold mb-2">{weather.location.name}, {weather.location.country}</h3>
      <p className="text-gray-600 mb-2">
        Temperature: {weather.current.temp_c}°C (Feels like: {weather.current.feelslike_c}°C)
      </p>
      <p className="text-gray-600 mb-2">
        Weather: {weather.current.condition.text}
      </p>
      <img src={`https:${weather.current.condition.icon}`} alt="Weather Icon" />
      <p className="text-gray-600">
        Humidity: {weather.current.humidity}%
      </p>
      <button
        onClick={onClose}
        className="absolute top-2 right-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-full w-6 h-6 flex items-center justify-center text-sm focus:outline-none focus:shadow-outline"
      >
        X
      </button>
    </div>
  );
}

export default WeatherCard;