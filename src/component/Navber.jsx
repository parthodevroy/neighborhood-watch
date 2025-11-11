import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router";
import { Authcontext } from "../authcontext/Authcontext";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const { user, signout } = useContext(Authcontext);
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    signout();
    setShowMenu(false);
  };

  const linkItems = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-yellow-500 font-bold border-b-2 border-red-500 px-2 py-1 transition-all"
              : "text-black hover:text-[#06b6d4] px-2 py-1 transition-all"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/issues"
          className={({ isActive }) =>
            isActive
              ? "text-yellow-500 font-bold border-b-2 border-red-500 px-2 py-1 transition-all"
              : "text-black hover:text-[#06b6d4] px-2 py-1 transition-all"
          }
        >
         All Issues
        </NavLink>
      </li>

      {user && (
        <>
          <li>
            <NavLink
              to="/mycontribution"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-500 font-bold border-b-2 border-red-500 px-2 py-1 transition-all"
                  : "text-black hover:text-[#06b6d4] px-2 py-1 transition-all"
              }
            >
              My Contribution
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/addissues"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-500 font-bold border-b-2 border-red-500 px-2 py-1 transition-all"
                  : "text-black hover:text-[#06b6d4] px-2 py-1 transition-all"
              }
            >
              Report Issues
            </NavLink>
          </li>

          <li className="mx-2">
      <NavLink
        to="/myissues"
        className={({ isActive }) =>
          isActive
            ? "text-yellow-500 font-bold border-b-2 border-red-500 px-2 py-1 transition-all"
            : "text-black hover:text-[#06b6d4] px-2 py-1 transition-all"
        }
      >
        My Reported Issues
      </NavLink>
    </li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-main text-white shadow-md px-6 py-2 flex justify-between items-center">
      {/* Logo */}
      <Link to="/" className="text-2xl font-extrabold text-yellow-500 tracking-wide">
        Neighborhood Watch
      </Link>

      {/* Center Links (Desktop) */}
      <div className="hidden lg:flex">
        <ul className="menu menu-horizontal px-4 flex gap-4">{linkItems}</ul>
      </div>

      {/* Right Section: User/Login */}
      <div className="relative">
        {user ? (
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#06b6d4]"
            >
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="User"
                  className="w-full h-full object-cover"
                />
              ) : (
                <FaUserCircle className="w-full h-full text-gray-300" />
              )}
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 bg-white text-black rounded-lg shadow-lg w-44 z-50">
                <div className="px-4 py-2 border-b">
                  <p className="font-semibold">{user.displayName || "User"}</p>
                  <p className="text-sm text-gray-500">{user.email || "No email"}</p>
                </div>
                <ul>
                  <li>
                    <Link
                      to="/updateprofile"
                      onClick={() => setShowMenu(false)}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Update Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Log Out
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login">
            <button className="bg-btn text-white px-6 py-2 rounded-xl font-semibold hover-glow">
              Log In
            </button>
          </Link>
        )}
      </div>

      {/* Mobile Dropdown */}
      <div className="lg:hidden ">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content text-black bg-card rounded-box z-10 mt-3 w-52 p-2 shadow-lg"
          >
            {linkItems}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
