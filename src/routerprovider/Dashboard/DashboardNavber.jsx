import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { FaUserCircle } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";
import { Authcontext } from "../../authcontext/Authcontext";

const DashboardNavbar = ({ onMenuClick }) => {
  const { user, signout } = useContext(Authcontext);
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    signout();
    setShowMenu(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-card border-b">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Left: Hamburger + Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="lg:hidden text-2xl"
          >
            <HiMenu />
          </button>

          <Link to="/" className="flex items-center gap-2">
            <img
              src="https://cdn.pixabay.com/photo/2018/08/05/10/58/work-3585353_1280.jpg"
              alt="Logo"
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="font-bold text-lg">Dashboard</span>
          </Link>
        </div>

        {/* Right: User */}
        {user && (
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="w-10 h-10 rounded-full overflow-hidden border"
            >
              {user.photoURL ? (
                <img src={user.photoURL} className="w-full h-full object-cover" />
              ) : (
                <FaUserCircle className="w-full h-full" />
              )}
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-card border rounded-lg shadow-lg">
                <div className="px-4 py-2 border-b">
                  <p className="font-semibold">{user.displayName}</p>
                  <p className="text-xs">{user.email}</p>
                </div>
                <Link to="/updateprofile" className="block px-4 py-2">Update Profile</Link>
                <button onClick={handleLogout} className="w-full text-left px-4 py-2">Log out</button>
              </div>
            )}
          </div>
        )}

      </div>
    </header>
  );
};

export default DashboardNavbar;
