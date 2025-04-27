// favoriteService.js
const API_BASE_URL = 'http://localhost:3000'; 

export const removeCityFromFavorites = async (city, authToken) => {
  try {
    const response = await fetch(`${API_BASE_URL}/favorite?city=${city}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json', 
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error al eliminar ${city} de favoritos: ${response.status}`);
    }

    const data = await response.json();
    return data; 
  } catch (error) {
    console.error('Error al eliminar ciudad de favoritos:', error);
    throw error; 
  }
};



export const getAllFavorites = async (authToken) => {
    try {
      const response = await fetch(`${API_BASE_URL}/favorite/cities`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error al obtener favoritos: ${response.status}`);
      }
  
      const data = await response.json();
      return data; 
    } catch (error) {
      console.error('Error al obtener todos los favoritos:', error);
      throw error; 
    }
  };

