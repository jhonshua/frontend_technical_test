import React, { useState, useContext } from 'react';

import { AppContext } from '../../context/AppContext';
import { loginUser } from '../../services/loginService';
import { registerUser } from '../../services/registerService';
import Icon from '../Icon';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';


function AuthModal({ isOpen, onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const { setIsLoggedIn, setUserData } = useContext(AppContext);

  const handleToggleAuthMode = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const userDataFromApi = await loginUser(email, password);
      setIsLoggedIn(true);
      setUserData({
        token: userDataFromApi.token,
        userId: userDataFromApi.userId,
        username: userDataFromApi.username,
      });
      localStorage.setItem('authToken', userDataFromApi.token);
      onClose();
      toast.success('Inicio de sesión exitoso!');
      // navigate('/dashboard');
    } catch (err) {
      setError(err.message);
      toast.error(`Error al iniciar sesión: ${err.message}`);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await registerUser(username, email, password);
      toast.success('Registro exitoso! Por favor, inicia sesión.');
      setIsLogin(true);
    } catch (err) {
      setError(err.message);
      toast.error(`Error al registrar: ${err.message}`);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content bg-white p-8 rounded-md relative w-full max-w-md sm:max-w-sm md:max-w-md lg:max-w-md xl:max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-center">
          {isLogin ? 'Iniciar sesión' : 'Registrarse'}
        </h2>
        <form onSubmit={isLogin ? handleLogin : handleRegister}>
          {!isLogin && (
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
                Nombre de usuario:
              </label>
              <input
                type="text"
                id="username"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                Correo electrónico:
            </label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Contraseña:
            </label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            type="submit"
          >
            {isLogin ? 'Iniciar sesión' : 'Registrarse'}
          </button>
        </form>
        <p className="text-center mt-4">
          {isLogin ? (
            <>
              ¿No tienes una cuenta?{' '}
              <button type="button" onClick={handleToggleAuthMode} className="text-blue-500 font-semibold hover:underline">
                Regístrate
              </button>
            </>
          ) : (
            <>
              ¿Ya tienes una cuenta?{' '}
              <button type="button" onClick={handleToggleAuthMode} className="text-blue-500 font-semibold hover:underline">
                Inicia sesión
              </button>
            </>
          )}
        </p>
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          <Icon name="close" size="md" />
        </button>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
}

export default AuthModal;