const API_BASE_URL = 'https://backend-technical-test-fcn1.onrender.com';

export const getWeather = async (city) => {
  try {
    const response = await fetch(`${API_BASE_URL}/weather?city=${city}`);

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