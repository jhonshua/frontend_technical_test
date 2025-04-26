import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

function SidebarFooter() {
  const { isLoggedIn, setIsLoggedIn, setUserData } = useContext(AppContext);

  const handleLogout = () => {
    // Limpiar el estado de autenticación
    setIsLoggedIn(false);
    setUserData({ token: null, userId: null, username: null });

    // Limpiar el localStorage
    localStorage.removeItem('authToken');

    // Opcional: Puedes redirigir al usuario a la página de inicio o mostrar un mensaje
    console.log('Usuario deslogueado');
  };

  return (
    <div className="mt-auto text-gray-500 text-sm flex flex-col items-center">
      {isLoggedIn && (
        <button
        onClick={handleLogout}
        className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded-md mb-2 focus:outline-none focus:shadow-outline"
      >
          Logout
        </button>
      )}
      <div>
        © Copyright 2025 - made by Julio Llinas.
      </div>
    </div>
  );
}

export default SidebarFooter;