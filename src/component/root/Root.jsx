import { Outlet, useLocation } from "react-router";
import Navber from "../Navber";
import Footer from "../Footer";
import Homebar from "../home/Homebar";

const Root = () => {
  const location = useLocation();

  // 🔹 যদি path /dashboard এর শুরু হয়, তাহলে Root navbar না দেখানো
  const hideNav = location.pathname.startsWith("/dashboard");

  return (
    <div className="min-h-screen bg-main text-main transition-all duration-500">
      {!hideNav && <Navber />}

      {location.pathname === "/" && <Homebar />}

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
