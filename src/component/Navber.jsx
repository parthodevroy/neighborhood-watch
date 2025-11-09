import React from 'react';
import { Link, NavLink } from 'react-router';

const Navber = () => {
  const link = <>
    <li className="mx-2"> {/* horizontal margin for spacing */}
      <NavLink
        to="/"
        className={({ isActive }) => isActive 
          ? 'text-red-500 font-bold border-b-2 border-red-500 px-2 py-1 transition-all' 
          : 'text-white hover:text-[#06b6d4] px-2 py-1 transition-all'
        }
      >
        Home
      </NavLink>
    </li>
    <li className="mx-2">
      <NavLink
        to="/issues"
        className={({ isActive }) => isActive 
          ? 'text-red-500 font-bold border-b-2 border-red-500 px-2 py-1 transition-all' 
          : 'text-white hover:text-[#06b6d4] px-2 py-1 transition-all'
        }
      >
        Issues
      </NavLink>
    </li>
  </>;

  return (
    <div className="navbar bg-main text-white shadow-md px-6"> {/* horizontal padding */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-card rounded-box z-10 mt-3 w-52 p-2 shadow-lg"
          >
            {link}
          </ul>
        </div>
        <a className="btn btn-ghost text-2xl font-extrabold text-[#06b6d4] tracking-wide">
          Neighborhood Watch
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-4">{link}</ul> {/* some extra padding */}
      </div>
      <div className="navbar-end">
        <Link to={"/register"}>
          <button className="bg-btn text-white px-6 py-2 rounded-xl font-semibold hover-glow">
            Log In
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navber;
