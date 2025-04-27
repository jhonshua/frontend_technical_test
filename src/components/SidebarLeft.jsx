import React, { useState, useContext, useEffect } from "react";
import SidebarHeader from "./SidebarLeft/SidebarHeader";
import SidebarFooter from "./SidebarLeft/SidebarFooter";
import FavoritesList from "./SidebarLeft/FavoritesList";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import Icon from "./Icon";

function SidebarLeft() {
  const { isLoggedIn, setIsLoggedIn, setUserData, favorites, setFavorites, setIsAuthModalVisible } = useContext(AppContext);
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarVisibleMobile, setIsSidebarVisibleMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
      if (window.innerWidth > 640) {
        setIsSidebarVisibleMobile(true);
      } else {
        setIsSidebarVisibleMobile(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleRemoveCity = (index) => {
    const cityToRemove = favorites[index];
    console.log(`Eliminar ${cityToRemove} de favoritos (implementar llamada al servicio)`);
    setFavorites((prevFavorites) => prevFavorites.filter((_, i) => i !== index));
  };

  const openLoginModal = () => {
    setIsAuthModalVisible(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData({ token: null, userId: null, username: null });
    localStorage.removeItem("authToken");
    setFavorites([]);
    toast.info("Sesión cerrada.");
  };

  const toggleSidebarMobile = () => {
    setIsSidebarVisibleMobile(!isSidebarVisibleMobile);
  };

  return (
    <>
      {isMobile && (
        <button
          onClick={toggleSidebarMobile}
          className="fixed top-4 right-4 bg-blue-500 text-white p-2 rounded-md z-50 border border-black" 
        >
          <Icon name="menu" size="md" />
        </button>
      )}
      <aside
        className={`bg-blue-100 w-48 p-4 flex flex-col h-screen transition-transform duration-300 z-40 ${
          isMobile
            ? isSidebarVisibleMobile
              ? "translate-x-0 fixed top-0 left-0 h-full"
              : "-translate-x-full fixed top-0 left-0 h-full"
            : "translate-x-0"
        }`}
        style={{ left: isMobile ? 0 : "auto" }}
      >
        <SidebarHeader />

        {isLoggedIn ? (
          <>
            <FavoritesList
              cities={favorites}
              onRemoveCity={handleRemoveCity}
            />
            <button
              onClick={handleLogout}
              className="mt-4 w-full bg-gray-500 text-white py-2 px-4 rounded-md font-semibold hover:bg-gray-600 transition-colors active:scale-95"
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <div className="mb-4 p-4 bg-white rounded-lg">
            <h2 className="text-lg font-semibold mb-3 text-center">
              Acceso requerido
            </h2>
            <button
              onClick={openLoginModal}
              className="w-full mb-2 bg-blue-500 text-white py-2 px-4 rounded-md font-semibold hover:bg-blue-600 transition-colors"
            >
              Iniciar sesión
            </button>
          </div>
        )}
        <SidebarFooter />
      </aside>
      {isMobile && isSidebarVisibleMobile && (
        <div
          onClick={toggleSidebarMobile}
          className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-30"
        ></div>
      )}
    </>
  );
}

export default SidebarLeft;