import React from 'react';
import { FaTimes, FaHeart, FaSun, FaCloud } from 'react-icons/fa'; 

const Icon = ({ name, size, color, ...props }) => {
  const iconSize = size === 'sm' ? '1em' : size === 'md' ? '1.5em' : '2em'; 
  const iconColor = color || 'currentColor'; 

  switch (name) {
    case 'close':
      return <FaTimes size={iconSize} color={iconColor} {...props} />;
    case 'heart':
      return <FaHeart size={iconSize} color={iconColor} {...props} />;
    case 'sun':
      return <FaSun size={iconSize} color={iconColor} {...props} />;
    case 'cloud':
      return <FaCloud size={iconSize} color={iconColor} {...props} />;
  
    default:
      return null; 
  }
};

export default Icon;