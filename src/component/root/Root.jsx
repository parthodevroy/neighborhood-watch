import React from "react";
import Navber from "../Navber";
import { Outlet, useLocation } from "react-router";
import Footer from "../Footer";
import Homebar from "../home/Homebar";

const Root = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-main text-main transition-all duration-500">
        
      
      <header>
       <div> <Navber /></div>
        {location.pathname === "/" && <Homebar />}
      </header>

      
      <main className="p-2">
        <Outlet />
      </main>

      
      <footer>
        <Footer />
      </footer>
     </div>
  );
};

export default Root;
