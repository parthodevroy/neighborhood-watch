import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { Authcontext } from "../authcontext/Authcontext";
import { FaUserCircle } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";

const navLinkClass = ({ isActive }) =>
  `px-3 py-2 rounded-md text-sm font-semibold transition
   ${
     isActive
       ? "text-primary bg-primary/10"
       : "text-color hover:text-primary hover:bg-primary/5"
   }`;

const Navbar = () => {
  const { user, signout } = useContext(Authcontext);
  const [showMenu, setShowMenu] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(false);

  const handleLogout = () => {
    signout();
    setShowMenu(false);
    setMobileOpen(false);
  };

  const handleTheme = (checked) => {
    const theme = checked ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    setDark(checked);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setDark(savedTheme === "dark");
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const links = (
    <>
      <NavLink to="/" className={navLinkClass}>Home</NavLink>
      <NavLink to="/issues" className={navLinkClass}>All Issues</NavLink>

      {user && (
        <>
          <NavLink to="/mycontribution" className={navLinkClass}>My Contributions</NavLink>
          <NavLink to="/addissues" className={navLinkClass}>Report Issue</NavLink>
          <NavLink to="/myissues" className={navLinkClass}>My Issues</NavLink>
          <NavLink to="/dashboard" className={navLinkClass}>Dashboard</NavLink>
        </>
      )}

      <NavLink to="/about" className={navLinkClass}>About</NavLink>
      <NavLink to="/support" className={navLinkClass}>Support</NavLink>
      <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
    </>
  );

  return (
    <header className="sticky top-0 z-[999] bg-navbar ">
      <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full overflow-hidden border shadow">
            <img
              src="https://cdn.pixabay.com/photo/2018/08/05/10/58/work-3585353_1280.jpg"
              alt="Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-extrabold text-xl leading-tight">
            Neighborhood <br />
            <span className="text-primary">Watch</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {links}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* User */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="w-10 h-10 rounded-full overflow-hidden border border-primary"
              >
                {user.photoURL ? (
                  <img src={user.photoURL} alt="User" className="w-full h-full object-cover" />
                ) : (
                  <FaUserCircle className="w-full h-full text-xl" />
                )}
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-3 w-56 bg-card rounded-xl shadow-lg border">
                  <div className="px-4 py-3 border-b">
                    <p className="font-semibold text-sm">{user.displayName || "User"}</p>
                    <p className="text-xs text-muted">{user.email}</p>
                  </div>

                  <Link to="/updateprofile" className="block px-4 py-2 text-sm hover:bg-muted/40">
                    Update Profile
                  </Link>

                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm hover:bg-muted/40">
                    Log out
                  </button>

                  <div className="flex items-center justify-between px-4 py-3 border-t">
                    <span className="text-sm">Dark Mode</span>
                    <input
                      type="checkbox"
                      checked={dark}
                      onChange={(e) => handleTheme(e.target.checked)}
                      className="toggle toggle-sm"
                    />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              <button className="px-5 py-2 bg-primary text-white text-sm font-semibold rounded-lg">
                Login
              </button>
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-2xl"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-card border-t shadow-md">
          <div className="flex flex-col p-4 gap-2">
            {links}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
