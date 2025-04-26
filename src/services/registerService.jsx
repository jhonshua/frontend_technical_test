// services/registerService.jsx
export const registerUser = async (username, email, password) => {
    try {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Registro exitoso
        return data; // Devolver los datos del usuario registrado (incluyendo el _id)
      } else {
        throw new Error(data.message || 'Error al registrar usuario');
      }
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      throw error; // Re-lanzar el error para que el componente lo maneje
    }
  };