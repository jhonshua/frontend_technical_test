import React from 'react';
import { FiHome, FiTrash2, FiPlus } from 'react-icons/fi'; 
function FavoritesList({ cities, onRemoveCity, onAddCity }) {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold mb-2">My Favorites</h2>
      <ul className="space-y-2">
        {cities.map((city, index) => (
          <li key={index} className="flex items-center justify-between bg-white p-2 rounded hover:bg-blue-50 transition-colors">
            <div className="flex items-center">
              <FiHome className="w-4 h-4 mr-2 text-gray-500" /> {/* Icono de hogar/lugar */}
              {city}
            </div>
            <button 
              onClick={() => onRemoveCity(index)}
              className="text-red-400 hover:text-red-600 transition-colors"
              aria-label={`Remove ${city}`}
              title="Remove city"
            >
              <FiTrash2 className="w-4 h-4" /> {/* Icono de papelera */}
            </button>
          </li>
        ))}
      </ul>
      
      <button 
        onClick={onAddCity}
        className="mt-4 bg-white text-blue-500 py-2 px-4 rounded-md font-semibold flex items-center justify-center w-full hover:bg-blue-50 transition-colors"
      >
        <FiPlus className="w-4 h-4 mr-2" /> {/* Icono de plus */}
        Add New
      </button>
    </div>
  );
}

export default FavoritesList;