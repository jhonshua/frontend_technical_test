import React, { useState, useContext, useEffect } from 'react';
import SidebarHeader from './SidebarLeft/SidebarHeader';
import FavoritesList from './SidebarLeft/FavoritesList';
import SidebarFooter from './SidebarLeft/SidebarFooter';
import { AppContext } from '../context/AppContext';
import AuthModal from '../components/modal/AuthModal';
import { toast } from 'react-toastify';
import { loginUser } from '../services/loginService';
import Icon from './Icon';

function SidebarLeft() {
  const { isLoggedIn, setIsLoggedIn, setUserData } = useContext(AppContext);
  const [favoriteCities, setFavoriteCities] = useState([
    "Caracas",
    "Maracaibo",
    "Mérida",
    "Valencia"
  ]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
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
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleRemoveCity = (index) => {
    setFavoriteCities(prevCities => prevCities.filter((_, i) => i !== index));
  };

  const openLoginModal = () => {
    setIsLoginMode(true);
    setIsAuthModalOpen(true);
  };

  const openRegisterModal = () => {
    setIsLoginMode(false);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const handleLogin = async () => {
    try {
      const userDataFromApi = await loginUser(email, password);
      setIsLoggedIn(true);
      setUserData({
        token: userDataFromApi.token,
        userId: userDataFromApi.userId,
        username: userDataFromApi.username,
      });
      localStorage.setItem('authToken', userDataFromApi.token);
      closeAuthModal();
      toast.success('Inicio de sesión exitoso!');
    } catch (err) {
      setError(err.message);
      toast.error(`Error al iniciar sesión: ${err.message}`);
    }
  };

  const toggleSidebarMobile = () => {
    setIsSidebarVisibleMobile(!isSidebarVisibleMobile);
  };

  return (
    <>
      {isMobile && (
        <button
          onClick={toggleSidebarMobile}
          className="fixed top-4 left-4 bg-blue-500 text-white p-2 rounded-md z-50"
        >
          <Icon name="menu" size="md" />
        </button>
      )}
      <aside
        className={`bg-blue-100 w-48 p-4 flex flex-col h-screen transition-transform duration-300 z-40 ${
          isMobile ? (isSidebarVisibleMobile ? 'translate-x-0 fixed top-0 left-0 h-full' : '-translate-x-full fixed top-0 left-0 h-full') : 'translate-x-0'
        }`}
        style={{ left: isMobile ? 0 : 'auto' }}
      >
        <SidebarHeader />

        {isLoggedIn ? (
          <FavoritesList
            cities={favoriteCities}
            onRemoveCity={handleRemoveCity}
          />
        ) : (
          <div className="mb-4 p-4 bg-white rounded-lg">
            <h2 className="text-lg font-semibold mb-3 text-center">Acceso requerido</h2>
            <button
              onClick={openLoginModal}
              className="w-full mb-2 bg-blue-500 text-white py-2 px-4 rounded-md font-semibold hover:bg-blue-600 transition-colors"
            >
              Iniciar sesión
            </button>
            <button
              onClick={openRegisterModal}
              className="w-full border border-blue-500 text-blue-500 py-2 px-4 rounded-md font-semibold hover:bg-blue-50 transition-colors"
            >
              Registrarse
            </button>
          </div>
        )}

        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={closeAuthModal}
          isLogin={isLoginMode}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
        />

        <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} isLogin={isLoginMode} />
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