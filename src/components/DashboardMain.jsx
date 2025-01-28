import { useState, useEffect } from "react";
import { BiShow, BiTrash, BiPencil } from "react-icons/bi";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DashboardMain = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [categories, setCategories] = useState([]);
  const [modalType, setModalType] = useState(""); // 'add', 'edit', or 'view'
  const [categoryData, setCategoryData] = useState({
    name: "",
    description: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAdminDashboardData();
    fetchCategories();
  }, [navigate]);

  const fetchAdminDashboardData = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("You are not authorized. Please log in.");
      navigate("/signin");
      return;
    }

    try {
      const response = await axios.get(
        "https://carmanagment.duckdns.org/api/dashboard/get-admin-dsahboard",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setDashboardData(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load dashboard data.");
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
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCategories(response.data.categories || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load categories.");
    }
  };

  const handleSaveCategory = async () => {
    // Implementation of saving a category
  };

  const handleDeleteCategory = async (categoryId) => {
    // Implementation of deleting a category
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategoryData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-4">
      {error && <div className="alert alert-danger">{error}</div>}
      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}

      {dashboardData && (
        <div className="mb-4">
          <h5>Total Cars: {dashboardData.totalCars}</h5>
          <h5>Total Categories: {dashboardData.totalCategories}</h5>
          <h5>Total Users: {dashboardData.totalUsers}</h5>
        </div>
      )}

      <div className="mt-5">
        <h6>All Categories</h6>
        <button
          className="btn btn-success mb-3"
          onClick={() => setModalType("add")}
        >
          Add Category
        </button>
        <ul className="list-group">
          {categories.map((category) => (
            <li
              key={category._id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {category.name}
              <div>
                <BiShow
                  size={20}
                  className="me-3"
                  onClick={() => {
                    setSelectedCategory(category);
                    setModalType("view");
                  }}
                />
                <BiPencil
                  size={20}
                  className="me-3"
                  onClick={() => {
                    setSelectedCategory(category);
                    setCategoryData({
                      name: category.name,
                      description: category.description,
                    });
                    setModalType("edit");
                  }}
                />
                <BiTrash
                  size={20}
                  onClick={() => handleDeleteCategory(category._id)}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashboardMain;
