import React, { useContext } from 'react';
import { FiHome, FiTrash2, FiPlus } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { removeCityFromFavorites } from '../../services/favoriteServicio';
import { getWeather } from '../../services/weatherService'; 
import { AppContext } from '../../context/AppContext';

function FavoritesList({ cities, onAddCity }) {
  const { userData, setFavorites, weatherHistory, setWeatherHistory } = useContext(AppContext); 

  const handleRemove = async (cityToRemove) => {
    try {
      const response = await removeCityFromFavorites(cityToRemove, userData.token);
      setFavorites(response);
      toast.success(`Favorito ${cityToRemove} eliminado correctamente`);
    } catch (error) {
      console.error('Error al eliminar de favoritos:', error);
      toast.error(`Error al eliminar ${cityToRemove} de favoritos: ${error.message}`);
    }
  };

  const handleCityClick = async (city) => {
    const alreadyInHistory = weatherHistory.some(item => item?.name?.toLowerCase() === city.toLowerCase());

    if (!alreadyInHistory) {
      try {
        const weatherData = await getWeather(city);
        setWeatherHistory(prevHistory => [...prevHistory, weatherData]);
      } catch (error) {
        console.error('Error al obtener el clima para:', city, error);
        toast.error(`Error al obtener el clima para ${city}`);
      }
    } else {
      toast.info(`El clima para ${city} ya está en el historial.`);
    }
  };

  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold mb-2">Mi Favoritos</h2>
      <ul className="space-y-2">
        {cities.map((city, index) => (
          <li key={index} className="flex items-center justify-between bg-white p-2 rounded hover:bg-blue-50 transition-colors">
            <div className="flex items-center">
              <FiHome className="w-4 h-4 mr-2 text-gray-500" />
              <span
                className="cursor-pointer hover:underline"
                onClick={() => handleCityClick(city)} 
              >
                {city}
              </span>
            </div>
            <button
              onClick={() => handleRemove(city)}
              className="text-red-400 hover:text-red-600 transition-colors"
              aria-label={`Remove ${city}`}
              title="Remove city"
            >
              <FiTrash2 className="w-4 h-4" />
            </button>
          </li>
        ))}
      </ul>

      <button
        onClick={onAddCity}
        className="mt-4 bg-white text-blue-500 py-2 px-4 rounded-md font-semibold flex items-center justify-center w-full hover:bg-blue-50 transition-colors"
      >
        <FiPlus className="w-4 h-4 mr-2" />
        Add New
      </button>
    </div>
  );
}

export default FavoritesList;