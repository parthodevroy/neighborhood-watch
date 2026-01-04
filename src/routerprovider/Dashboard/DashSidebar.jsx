import React, { useState } from "react";
import { Link } from "react-router";
import {
  MdDashboardCustomize,
  MdOutlineCreateNewFolder,
  MdProductionQuantityLimits,
} from "react-icons/md";
import { ImProfile } from "react-icons/im";
import { IoMdMenu } from "react-icons/io";

export default function DashSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      
      {/* Sidebar */}
      <div
        className={`
          h-screen w-64 dash text
          fixed lg:relative z-50
          ${mobileOpen ? "left-0" : "-left-64"} lg:left-0
          transition-all duration-300
        `}
      >
        {/* Close button (mobile only) */}
        <div className="p-4 flex justify-end lg:hidden">
          <button onClick={() => setMobileOpen(false)}>✕</button>
        </div>

        <ul className="mt-4 space-y-3 px-3 text-sm">
          <li>
            <Link to="/dashboard" className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-700/40">
              <MdDashboardCustomize size={22} />
              <span>Dashboard Overview</span>
            </Link>
          </li>

          <li>
            <Link to="/dashboard/my-issues" className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-700/40">
              <MdOutlineCreateNewFolder size={22} />
              <span>My Issues</span>
            </Link>
          </li>

          <li>
            <Link to="/dashboard/my-contribution" className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-700/40">
              <MdProductionQuantityLimits size={22} />
              <span>My Contributions</span>
            </Link>
          </li>

          <li>
            <Link to="/dashboard/profile" className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-700/40">
              <ImProfile size={20} />
              <span>My Profile</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Overlay (mobile) */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Navbar */}
      <div className="flex-1 lg:hidden">
        <nav className="h-16 dash flex items-center px-6">
          <IoMdMenu
            size={26}
            className="cursor-pointer"
            onClick={() => setMobileOpen(true)}
          />
        </nav>
      </div>

    </div>
  );
}
