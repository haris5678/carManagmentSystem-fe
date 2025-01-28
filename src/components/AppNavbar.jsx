import { FaUserCircle, FaPowerOff } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AppNavbar = ({ onLogout = () => {} }) => {
  return (
    <div className="bg-dark text-white d-flex justify-content-between align-items-center px-4 py-2">
      <h5>Admin Dashboard</h5>
      <div className="d-flex align-items-center">
        <FaUserCircle size={24} className="me-3" />
        <button className="btn btn-outline-light btn-sm" onClick={onLogout}>
          <FaPowerOff className="me-1" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default AppNavbar;
