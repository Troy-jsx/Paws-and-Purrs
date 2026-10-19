import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import MobileTopBar from "../components/MobileTopBar.jsx";

export default function DashboardLayout() {
  const [navOpen, setNavOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setNavOpen(false);
  }, [pathname]);

  return (
    <div className="bg-gradient flex h-screen flex-col lg:flex-row">
      <MobileTopBar onMenu={() => setNavOpen(true)} />
      <Sidebar open={navOpen} onClose={() => setNavOpen(false)} />
      <div className="flex min-h-0 min-w-0 flex-1">
        <Outlet />
      </div>
    </div>
  );
}