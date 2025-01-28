import { useState, useEffect } from "react";
import { FaUserCircle, FaPowerOff } from "react-icons/fa";
import { BiSearch, BiTrash, BiShow, BiPencil } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [cars, setCars] = useState([]);
  const [categories, setCategories] = useState([]);
  const [carModel, setCarModel] = useState("");
  const [carYear, setCarYear] = useState("");
  const [selectedCar, setSelectedCar] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const fetchDashboardData = async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      setError("You are not authorized. Please log in.");
      navigate("/signin");
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
      if (err.response?.status === 401) {
        localStorage.removeItem("authToken");
        navigate("/signin");
      } else {
        setError("Failed to load dashboard data. Please log in again.");
      }
    }
  };

  const fetchCategories = async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      setError("You are not authorized. Please log in.");
      navigate("/signin");
      return;
    }

    try {
      const response = await axios.get(
        "https://carmanagment.duckdns.org/api/category/get-all-category",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCategories(response.data.categories);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
      setError("Failed to load categories. Please try again.");
    }
  };

  const fetchAllCars = async (year = "", model = "") => {
    const token = localStorage.getItem("authToken");

    const queryParams = [];
    if (year) queryParams.push(`year=${year}`);
    if (model) queryParams.push(`model=${model}`);
    const queryString = queryParams.length > 0 ? `?${queryParams.join("&")}` : "";

    try {
      const response = await axios.get(
        `https://carmanagment.duckdns.org/api/car/get-all-users-cars${queryString}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCars(response.data.cars);
      setError("");
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        localStorage.removeItem("authToken");
        navigate("/signin");
      } else {
        setError("Failed to load cars. Please try again.");
      }
    }
  };

  useEffect(() => {
    fetchDashboardData();
    fetchCategories();
    fetchAllCars();
  }, [navigate]);

  const handleSearchCars = (e) => {
    e.preventDefault();
    fetchAllCars(carYear, carModel);
  };

  const handleCarClick = (carId) => {
    navigate(`/car-details/${carId}`);
  };

  const handleEditCar = (car) => {
    setSelectedCar(car);
    setEditModalOpen(true);
  };

  const handleDeleteCar = async (carId) => {
    const token = localStorage.getItem("authToken");

    try {
      await axios.delete(
        `https://carmanagment.duckdns.org/api/car/delete-car/${carId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCars((prevCars) => prevCars.filter((car) => car._id !== carId));
      setError("");
      await fetchDashboardData(); // Refresh dashboard data
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        localStorage.removeItem("authToken");
        navigate("/signin");
      } else {
        setError("Failed to delete the car. Please try again.");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/signin");
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleSaveChanges = async () => {
    const token = localStorage.getItem("authToken");

    try {
      await axios.patch(
        `https://carmanagment.duckdns.org/api/car/update-car/${selectedCar._id}`,
        {
          color: selectedCar.color,
          model: selectedCar.model,
          make: selectedCar.make,
          registrationNo: selectedCar.registrationNo,
          yearOfManufacture: selectedCar.yearOfManufacture,
          category: selectedCar.category,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccessMessage("Car updated successfully!");
      setError("");
      setEditModalOpen(false);
      await fetchDashboardData(); // Refresh dashboard data
      fetchAllCars(); // Refresh car list
    } catch (err) {
      console.error(err);
      setError("Failed to update car. Please try again.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedCar((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="d-flex vh-100">
      {/* Sidebar */}
      <div className="bg-dark text-white p-3" style={{ width: "250px", overflowY: "auto" }}>
        <h3 className="mb-4">Toolpad</h3>
        <ul className="list-unstyled">
          <li className="mb-3">
            <a href="/dashboard" className="text-white text-decoration-none">
              Dashboard
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
            <FaUserCircle size={24} className="me-3" onClick={handleProfileClick} />
            <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
              <FaPowerOff className="me-1" />
              Logout
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-4">
          {error && <div className="alert alert-danger">{error}</div>}
          {successMessage && <div className="alert alert-success">{successMessage}</div>}

          {/* Dashboard Data Section */}
          {dashboardData && (
            <div className="mb-4">
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
          )}

          {/* All Cars Section */}
          <div className="mt-5">
            <h6>All Cars</h6>
            <form onSubmit={handleSearchCars} className="d-flex mb-4">
              <input
                type="text"
                className="form-control me-2"
                placeholder="Model"
                value={carModel}
                onChange={(e) => setCarModel(e.target.value)}
              />
              <input
                type="number"
                className="form-control me-2"
                placeholder="Year"
                value={carYear}
                onChange={(e) => setCarYear(e.target.value)}
              />
              <button type="submit" className="btn btn-primary">
                <BiSearch className="me-1" />
                Search Cars
              </button>
            </form>

            {/* Add Car Button */}
            <button
              className="btn btn-success mb-3"
              onClick={() => navigate("/add-car")}
            >
              Add Car
            </button>

            {/* Cars List */}
            {cars.length > 0 ? (
              <ul className="list-group">
                {cars.map((car) => (
                  <li
                    key={car._id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <strong>{car.model}</strong> ({car.yearOfManufacture})
                    </div>
                    <div>
                      <BiShow
                        size={20}
                        className="me-3"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleCarClick(car._id)}
                        title="View Details"
                      />
                      <BiPencil
                        size={20}
                        className="me-3"
                        style={{ cursor: "pointer", color: "blue" }}
                        onClick={() => handleEditCar(car)}
                        title="Edit Car"
                      />
                      <BiTrash
                        size={20}
                        style={{ cursor: "pointer", color: "red" }}
                        onClick={() => handleDeleteCar(car._id)}
                        title="Delete Car"
                      />
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div>No cars found.</div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Car Modal */}
      {editModalOpen && selectedCar && (
        <div
          className="modal d-block"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <div className="modal-dialog" style={{ maxWidth: "500px", margin: "10% auto" }}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Car Details</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setEditModalOpen(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="category" className="form-label">
                      Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      className="form-control"
                      value={selectedCar.category || ""}
                      onChange={handleInputChange}
                    >
                      <option value="" disabled>
                        Select a category
                      </option>
                      {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="color" className="form-label">
                      Color
                    </label>
                    <input
                      type="text"
                      id="color"
                      name="color"
                      className="form-control"
                      value={selectedCar.color}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="model" className="form-label">
                      Model
                    </label>
                    <input
                      type="text"
                      id="model"
                      name="model"
                      className="form-control"
                      value={selectedCar.model}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="make" className="form-label">
                      Make
                    </label>
                    <input
                      type="text"
                      id="make"
                      name="make"
                      className="form-control"
                      value={selectedCar.make}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="registrationNo" className="form-label">
                      Registration Number
                    </label>
                    <input
                      type="text"
                      id="registrationNo"
                      name="registrationNo"
                      className="form-control"
                      value={selectedCar.registrationNo}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="yearOfManufacture" className="form-label">
                      Year of Manufacture
                    </label>
                    <input
                      type="number"
                      id="yearOfManufacture"
                      name="yearOfManufacture"
                      className="form-control"
                      value={selectedCar.yearOfManufacture}
                      onChange={handleInputChange}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setEditModalOpen(false)}
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={handleSaveChanges}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
