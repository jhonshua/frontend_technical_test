import React, { useState, useEffect } from 'react';
import backgroundImage from '../assets/background.jpg';
import background_noche from '../assets/background_noche.png';
import moment from 'moment-timezone';

function WeatherCard({ weather, onClose }) {
  const isDay = weather?.current?.is_day === 1;

  
  const dayTextStyle = {
    color: "#5f5c5c",
    textShadow: "1px 1px 2px rgb(255, 255, 255)",
    textStroke: "1px white",
  };

  
  const nightTextStyle = {
    color: "#ffffff",
    textShadow: "1px 1px 2px rgb(2, 2, 2)",
    textStroke: "1px white",
  };

 
  const textStyle = isDay ? dayTextStyle : nightTextStyle;

  const [localTime, setLocalTime] = useState('');

  useEffect(() => {
    if (weather && weather.location && weather.location.tz_id) {
      const interval = setInterval(() => {
        const formattedTime = moment().tz(weather.location.tz_id).format('HH:mm:ss');
        setLocalTime(formattedTime);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [weather?.location?.tz_id]);

  return (
    <div
      className="bg-white rounded-md shadow-md p-4 relative"
      style={{
        backgroundImage: `url(${isDay ? backgroundImage : background_noche})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        color: 'white', 
      }}
    >
      <h3 className="text-xl font-semibold mb-2" style={textStyle}>
        {weather.location.name}, {weather.location.country}
      </h3>
      <p className="mb-2" style={textStyle}>
        Hora local: {localTime}
      </p>
      <p className="mb-2" style={textStyle}>
        Temperatura: {weather.current.temp_c}°C (sensacion de : {weather.current.feelslike_c}°C)
      </p>
      <p className="mb-2" style={textStyle}>
        Clima: {weather.current.condition.text}
      </p>
      <img src={`https:${weather.current.condition.icon}`} alt="Weather Icon" />
      <p style={textStyle}>
        Humedad: {weather.current.humidity}%
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