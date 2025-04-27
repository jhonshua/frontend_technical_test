import React, { useContext } from "react";
import SidebarLeft from "./components/SidebarLeft";
import CityInput from "./components/CityInput";
import WeatherCardList from "./components/WeatherCardList";
import logo from "../src/assets/logo.png";
import cielo from "../src/assets/cielo.jpg";
import AuthModal from "./components/modal/AuthModal";
import { AppContext } from "./context/AppContext";

function App() {
  const { isAuthModalVisible, setIsAuthModalVisible, isLogin } =
    useContext(AppContext);

  const closeAuthModal = () => {
    setIsAuthModalVisible(false);
  };

  return (
    <div
      className="flex bg-gradient-to-br from-blue-300 to-blue-500 h-screen"
      style={{
        backgroundImage: `url(${cielo})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <SidebarLeft />
      <main className="flex-1 p-6 flex flex-col items-center">
        <div className="mb-8">
          <div className="flex items-center mb-6">
            <div className="w-20 h-20 rounded-full flex items-center justify-center">
              <img
                src={logo}
                alt="Logo de la aplicación"
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-3xl font-semibold ml-2">Weather App</h1>
          </div>

          <CityInput />
        </div>
        <WeatherCardList />
      </main>

      {isAuthModalVisible && (
        <AuthModal
          isOpen={isAuthModalVisible}
          onClose={closeAuthModal}
          isLogin={isLogin}
        />
      )}
    </div>
  );
}

export default App;
