import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { Authcontext } from "../authcontext/Authcontext";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const { user, signout } = useContext(Authcontext);
  const [showMenu, setShowMenu] = useState(false);
  const [dark, setDark]=useState(false)

  // /handel logout

  const handleLogout = () => {
    signout();
    setShowMenu(false);
  };

//   // handel them
const handelthem = (checked) => {
  const theme = checked ? "dark" : "light";
  const html = document.querySelector("html");
  html.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  setDark(checked)
};
console.log(user);


useEffect(() => {
  const savedTheme = localStorage.getItem("theme") || "light";
  const dark=savedTheme==="dark";
  setDark(dark)
  document.querySelector("html").setAttribute("data-theme", savedTheme);
}, []);
// const handelthem=(checked)=>{
//   const html=document.querySelector("html")
//   if (checked) {
    
//     html.setAttribute("data-theme", "dark")
//   }else{
//     html.setAttribute("data-theme", "light")
//   }

// }


  const linkItems = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-color font-bold text-xls border-b-2 border-red-500 px-2 py-1 transition-all"
              : "text-color font-bold text-xls hover:text-[#06b6d4] px-2 py-1 transition-all"
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
              ? "text-color font-bold text-xls border-b-2 border-red-500 px-2 py-1 transition-all"
              : "text-color font-bold text-xls hover:text-[#06b6d4] px-2 py-1 transition-all"
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
                  ? "text-color font-bold text-xls border-b-2 border-red-500 px-2 py-1 transition-all"
                  : "text-color font-bold text-xls hover:text-[#06b6d4] px-2 py-1 transition-all"
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
                  ? "text-color font-bold text-xls border-b-2 border-red-500 px-2 py-1 transition-all"
                  : "text-color font-bold text-xls hover:text-[#06b6d4] px-2 py-1 transition-all"
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
            ? "text-color font-bold text-xls border-b-2 border-red-500 px-2 py-1 transition-all"
            : "text-color font-bold text-xls hover:text-[#06b6d4] px-2 py-1 transition-all"
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
    <div className="navbar bg-navbar text-white shadow-md px-6 py-2 flex justify-between items-center">

     
<Link to="/" className="flex items-center gap-3">

  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-yellow-500 shadow-lg">
    <img
      src="https://cdn.pixabay.com/photo/2018/08/05/10/58/work-3585353_1280.jpg"
      alt="Logo"
      className="w-full h-full object-cover"
    />
  </div>

  
  <span className="text-2xl font-extrabold text-color tracking-wide">
    Neighborhood <br />  <span className="text-white">Watch</span>
  </span>
</Link>


     
      <div className="hidden lg:flex">
        <ul className="menu menu-horizontal px-4 flex gap-4">{linkItems}</ul>
      </div>


     
      <div className="relative text-color">
        {user ?.email? (
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#06b6d4]"
            >
              {user.photoURL? (
                <img
                  src={user?.photoURL}
                  alt="User"
                  className="w-full h-full object-cover"
                />
              ) : (
                <FaUserCircle className="w-full h-full text-gray-300" />
              )}
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 bg-card text-color rounded-lg shadow-lg w-44 z-50">
                <div className="px-4 py-2 border-b">
                  <p className="font-semibold">{user?.displayName || "User"}</p>
                  <p className="text-sm text-gray-500">{user.email || "No email"}</p>
                </div>
                <ul>
                  <li>
                    <Link
                      to="/updateprofile"
                      onClick={() => setShowMenu(false)}
                      className="block px-4 py-2  bg-hover"
                    >
                      Update Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 bg-hover"
                    >
                      Log Out
                    </button>
                  </li>
                  <li className="pl-2">
                    <input  onChange={(e)=>handelthem(e.target.checked)} checked={dark} type="checkbox" className="toggle " />
                    <span className="pl-1">Select Theme</span>
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

      {/*  Dropdown */}
      <div className="lg:hidden ">
        <div className="dropdown relative">
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
            className="menu menu-sm dropdown-content text-black bg-card rounded-box z-10 right-0 mt-3 w-52 p-2 shadow-lg"
          >
            {linkItems}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
