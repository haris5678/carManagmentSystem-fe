import { useState, useEffect } from "react";
import { FaUserCircle, FaPowerOff } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
// import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [searchModel, setSearchModel] = useState("");
  const [searchYear, setSearchYear] = useState("");
  const [error, setError] = useState("");

  // Fetch Dashboard Data
  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        setError("You are not authorized. Please log in.");
        return;
      }

      try {
        const response = await axios.get(
          "https://carmanagment.duckdns.org/api/dashboard/get-user-dsahboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDashboardData(response.data);
        setError("");
      } catch (err) {
        console.error(err);
        setError("Failed to load dashboard data. Please log in again.");
      }
    };

    fetchDashboardData();
  }, []);

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/signin"; // Redirect to SignIn page
  };

  // Handle Search
  const handleSearch = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");

    try {
      const response = await axios.get(
        `https://carmanagment.duckdns.org/api/dashboard/search-car?model=${searchModel}&year=${searchYear}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Search Results:", response.data);
    } catch (err) {
      console.error("Search Error:", err);
      setError("Failed to search cars.");
    }
  };

  const handleProfileClick = () => {
    window.location.href = "/profile";
  };

  return (
    <div className="d-flex vh-100">
      {/* Sidebar */}
      <div
        className="bg-dark text-white p-3"
        style={{ width: "250px", overflowY: "auto" }}
      >
        <h3 className="mb-4">Toolpad</h3>
        <ul className="list-unstyled">
          <li className="mb-3">
            <a href="/dashboard" className="text-white text-decoration-none">
              Dashboard
            </a>
          </li>
          <li className="mb-3">
            <a href="/add-car" className="text-white text-decoration-none">
              Add Car
            </a>
          </li>
          <li className="mb-3">
            <a href="/update-car" className="text-white text-decoration-none">
              Update Car
            </a>
          </li>
          <li className="mb-3">
            <a href="/delete-car" className="text-white text-decoration-none">
              Delete Car
            </a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1">
        {/* Top Navbar */}
        <div className="bg-dark text-white d-flex justify-content-between align-items-center px-4 py-2">
          <h5>Dashboard</h5>
          <div className="d-flex align-items-center">
            <FaUserCircle
              size={24}
              className="me-3"
              onClick={handleProfileClick}
            />
            <button
              className="btn btn-outline-light btn-sm"
              onClick={handleLogout}
            >
              <FaPowerOff className="me-1" />
              Logout
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-4">
          {error && <div className="alert alert-danger">{error}</div>}

          {/* Search Section */}
          <div className="mb-4">
            <h6>Search Cars</h6>
            <form onSubmit={handleSearch} className="d-flex">
              <input
                type="text"
                className="form-control me-2"
                placeholder="Model"
                value={searchModel}
                onChange={(e) => setSearchModel(e.target.value)}
              />
              <input
                type="number"
                className="form-control me-2"
                placeholder="Year"
                value={searchYear}
                onChange={(e) => setSearchYear(e.target.value)}
              />
              <button type="submit" className="btn btn-primary">
                <BiSearch className="me-1" />
                Search
              </button>
            </form>
          </div>

          {/* Dashboard Data */}
          {dashboardData ? (
            <div>
              <h5>Total Cars: {dashboardData.totalCars}</h5>
              <h6 className="mt-3">Cars by Category:</h6>
              <ul className="list-group">
                {dashboardData.carsByCategory.map((category, index) => (
                  <li
                    key={index}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    {category.category}
                    <span className="badge bg-primary">{category.total}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
