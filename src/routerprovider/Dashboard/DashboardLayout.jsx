import { Outlet } from "react-router";
import { useState } from "react";
import DashboardNavbar from "./DashboardNavber";
import DashSidebar from "./DashSidebar";

const DashBoardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-card">

      {/* Navbar */}
      <DashboardNavbar onMenuClick={() => setSidebarOpen(true)} />

      <div className="flex flex-1 overflow-hidden">

        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <DashSidebar />
        </div>

        {/* Mobile Sidebar */}
        <div
          className={`fixed inset-0 z-50 lg:hidden transform transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="w-64 bg-card h-full shadow-xl">
            <DashSidebar onClose={() => setSidebarOpen(false)} />
          </div>

          {/* Overlay */}
          <div
            className="flex-1 bg-black/40"
            onClick={() => setSidebarOpen(false)}
          />
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default DashBoardLayout;
