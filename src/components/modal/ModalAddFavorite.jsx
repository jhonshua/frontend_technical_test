import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { addCityToFavorites } from "../../services/favoriteServicio";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ModalAddFavorite() {
  const {
    isAddFavoriteModalVisible,
    setIsAddFavoriteModalVisible,
    userData,
    setFavorites,
  } = useContext(AppContext);
  const [cityName, setCityName] = useState("");
  const [isInputEmpty, setIsInputEmpty] = useState(false);
  const authToken = userData?.token;

  if (!isAddFavoriteModalVisible) {
    return null;
  }

  const handleCloseModal = () => {
    setIsAddFavoriteModalVisible(false);
    setIsInputEmpty(false);
  };

  const handleInputChange = (event) => {
    setCityName(event.target.value);
    setIsInputEmpty(false);
  };

  const handleAddClick = async () => {
    if (cityName.trim()) {
      try {
        const updatedFavorites = await addCityToFavorites(
          cityName.trim(),
          authToken
        );
        setFavorites(updatedFavorites);
        toast.success(`"${cityName.trim()}" agregado a favoritos!`);
        setIsAddFavoriteModalVisible(false);
        setCityName("");
        setIsInputEmpty(false);
      } catch (error) {
        toast.error(`Error al agregar "${cityName.trim()}" a favoritos.`);
        console.error("Error al agregar a favoritos:", error);
      }
    } else {
      setIsInputEmpty(true);
      toast.warn("Por favor, ingresa el nombre de una ciudad.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 modal-add-favorite-overlay">
      <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md relative modal-add-favorite-content">
        <button
          onClick={handleCloseModal}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 rounded-md"
        >
          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
        </button>
        <h2 className="text-xl font-semibold mb-4">
          Agregar Ciudad a Favoritos
        </h2>
        <div className="mb-4">
          <label
            htmlFor="cityName"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Nombre de la Ciudad:
          </label>
          <input
            type="text"
            id="cityName"
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              isInputEmpty ? "border-red-500" : ""
            }`}
            placeholder="Ej. Caracas, Buenos Aires"
            value={cityName}
            onChange={handleInputChange}
          />
          {isInputEmpty && (
            <p className="text-red-500 text-xs italic">
              Por favor, ingresa el nombre de una ciudad.
            </p>
          )}
        </div>
        <div className="flex justify-end">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleAddClick}
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalAddFavorite;
