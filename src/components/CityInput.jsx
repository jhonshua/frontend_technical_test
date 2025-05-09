import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { getWeather } from '../services/weatherService';

function CityInput() {
  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  const { setWeatherHistory } = useContext(AppContext);

  const handleChange = (event) => {
    setCity(event.target.value);
    setError('');
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleClick();
    }
  };

  const handleClick = async () => {
    if (city.trim() === '') {
      setError('Por favor, ingresa el nombre de una ciudad.');
      return;
    }

    try {
      const data = await getWeather(city);
      setWeatherHistory(prevHistory => [...prevHistory, data]);
      setCity('');
      setError('');
    } catch (error) {
      console.error('Error al buscar el clima:', error);
      setError('Error al buscar el clima. Intenta de nuevo.');
    }
  };

  return (
    <div>
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Ingresa tu ciudad"
          value={city}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white ${error ? 'border-red-500' : ''}`}
        />
        <button
          onClick={handleClick}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2 focus:outline-none focus:shadow-outline"
        >
          Busqueda
        </button>
      </div>
      {error && <p className="text-red-500 text-xs italic mt-1">{error}</p>}
    </div>
  );
}

export default CityInput;