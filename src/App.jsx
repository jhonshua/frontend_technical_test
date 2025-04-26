import React from 'react';
import SidebarLeft from './components/SidebarLeft';
import CityInput from './components/CityInput';
import WeatherCardList from './components/WeatherCardList'; 

function App() {
  return (
    <div className="flex bg-blue-200 h-screen">
      <SidebarLeft />
      <main className="flex-1 p-6 flex flex-col items-center">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-4">Weather Details</h1>
          <CityInput /> {/* CityInput ahora actualiza el estado global */}
        </div>
        <WeatherCardList /> {/* Renderiza la lista de tarjetas de clima */}
      </main>
    </div>
  );
}

export default App;