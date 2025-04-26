// services/weatherService.jsx

export const getWeather = async (city) => {
    try {
      const response = await fetch(`http://localhost:3000/weather?city=${city}`);
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error al obtener el clima para ${city}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error al obtener el clima para ${city}:`, error);
      throw error;
    }
  };