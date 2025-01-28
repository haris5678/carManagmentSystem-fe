import AppNavbar from "./AppNavbar";
import AdminSidebar from "./AdminSidebar";
import DashboardMain from "./DashboardMain";

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
        <DashboardMain />
      </div>
    </div>
  );
};

export default AdminDashboard;
