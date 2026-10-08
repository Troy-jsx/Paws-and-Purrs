import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";

export default function DashboardLayout() {
  return (
    <div className="bg-gradient flex h-screen">
      <Sidebar />
      <div className="flex min-w-0 flex-1">
        <Outlet />
      </div>
    </div>
  );
}