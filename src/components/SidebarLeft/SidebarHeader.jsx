import React from 'react';

function SidebarHeader() {
  return (
    <div className="flex items-center mb-6">
      <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center text-white font-bold">
        JP
      </div>
      <h1 className="text-xl font-semibold ml-2">Weather App</h1>
    </div>
  );
}

export default SidebarHeader;