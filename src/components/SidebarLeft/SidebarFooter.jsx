import React from "react";
import logo from "../../assets/Logo-PulpoLine.png";

function SidebarFooter() {
  return (
    <div >
      <div className="w-25 h-25 rounded-full flex items-center justify-center"> 
        <img
          src={logo}
          alt="Logo de la aplicación"
          className="w-full h-full object-contain"
        />
      </div>
      <div className="mt-1 text-xs">© Copyright 2025 </div> 
      <div className="mt-1 text-xs">by Julio Llinas.</div> 
    </div>
  );
}

export default SidebarFooter;