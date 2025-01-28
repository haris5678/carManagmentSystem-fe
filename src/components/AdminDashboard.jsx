import { Outlet } from "react-router-dom";
import AppNavbar from "./AppNavbar";
import AdminSidebar from "./AdminSidebar";

const AdminDashboard = () => {
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/signin";
  };

  return (
    <div className="d-flex vh-100">
      <AdminSidebar />
      <div className="flex-grow-1">
        <AppNavbar onLogout={handleLogout} />
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
