import React, { useState, useEffect } from 'react';
import logo from '../../assets/logo.png';

function SidebarHeader() {
  const [currentTime, setCurrentTime] = useState(new Date());


  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);



  const formattedTime = currentTime.toLocaleTimeString();

  return (
    <div className="mb-6">
      <div className="flex items-center mb-3">
        <div className="w-8 h-8 rounded-full flex items-center justify-center">
          <img src={logo} alt="Logo de la aplicación" className="w-full h-full object-contain" />
        </div>
        <h1 className="text-xl font-semibold ml-2">Weather App</h1>
      </div>
      <div className="mt-2">
        <p className="text-sm font-medium text-gray-700">Hora local:</p>
        <p className="text-sm text-gray-500 font-bold">{formattedTime}</p> 
      </div>
   
     
    </div>
  );
}

export default SidebarHeader;