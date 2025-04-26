// components/Icon.jsx
import React from 'react';
import { FaTimes, FaHeart, FaSun, FaCloud } from 'react-icons/fa'; // Importa los iconos que necesites

const Icon = ({ name, size, color, ...props }) => {
  const iconSize = size === 'sm' ? '1em' : size === 'md' ? '1.5em' : '2em'; // Define tamaños base
  const iconColor = color || 'currentColor'; // Usa el color proporcionado o el color de texto

  switch (name) {
    case 'close':
      return <FaTimes size={iconSize} color={iconColor} {...props} />;
    case 'heart':
      return <FaHeart size={iconSize} color={iconColor} {...props} />;
    case 'sun':
      return <FaSun size={iconSize} color={iconColor} {...props} />;
    case 'cloud':
      return <FaCloud size={iconSize} color={iconColor} {...props} />;
    // Agrega más casos para otros iconos que necesites
    default:
      return null; // O podrías devolver un icono por defecto o un mensaje de error
  }
};

export default Icon;