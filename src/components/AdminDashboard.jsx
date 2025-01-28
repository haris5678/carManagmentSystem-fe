import { useState, useEffect } from "react";
import { FaUserCircle, FaPowerOff } from "react-icons/fa";
import { BiShow, BiTrash, BiPencil } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [modalType, setModalType] = useState(""); // 'add', 'edit', or 'view'
  const [categoryData, setCategoryData] = useState({
    name: "",
    description: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  // Fetch Admin Dashboard Data
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
      setError("");
    } catch (err) {
      console.error(err);
      handleUnauthorizedError(err);
    }
  };

  // Fetch All Categories
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
      console.error("Failed to fetch categories:", err);
      setError("Failed to load categories. Please try again.");
    }
  };

  const handleUnauthorizedError = (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("authToken");
      navigate("/signin");
    }
  };

  useEffect(() => {
    fetchAdminDashboardData();
    fetchCategories();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/signin");
  };

  // Handle Add or Update Category
  const handleSaveCategory = async () => {
    const token = localStorage.getItem("authToken");

    try {
      const apiUrl =
        modalType === "edit"
          ? `https://carmanagment.duckdns.org/api/category/update-category/${selectedCategory._id}`
          : "https://carmanagment.duckdns.org/api/category/create-category";

      const method = modalType === "edit" ? "patch" : "post";

      await axios[method](
        apiUrl,
        { name: categoryData.name, description: categoryData.description },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSuccessMessage(
        modalType === "edit"
          ? "Category updated successfully!"
          : "Category added successfully!"
      );
      setError("");
      setModalType(""); // Close the modal
      setCategoryData({ name: "", description: "" });

      fetchCategories(); // Refresh categories

      setTimeout(() => setSuccessMessage(""), 3000); // Clear success message
    } catch (err) {
      console.error(err);
      setError("Failed to save category. Please try again.");
    }
  };

  // Handle Delete Category
  const handleDeleteCategory = async (categoryId) => {
    const token = localStorage.getItem("authToken");

    try {
      await axios.delete(
        `https://carmanagment.duckdns.org/api/category/delete-category/${categoryId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSuccessMessage("Category deleted successfully!");
      setError("");
      fetchCategories(); // Refresh category list
    } catch (err) {
      console.error(err);
      setError("Failed to delete category. Please try again.");
    }
  };

  // Handle Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategoryData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle View Category Details
  const handleViewCategory = async (categoryId) => {
    const token = localStorage.getItem("authToken");

    try {
      const response = await axios.get(
        `https://carmanagment.duckdns.org/api/category/get-category-by-Id/${categoryId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSelectedCategory(response.data.category);
      setModalType("view"); // Open view modal
    } catch (err) {
      console.error(err);
      setError("Failed to fetch category details. Please try again.");
    }
  };

  return (
    <div className="d-flex vh-100">
      {/* Sidebar */}
      <div
        className="bg-dark text-white p-3"
        style={{ width: "250px", overflowY: "auto" }}
      >
        <h3 className="mb-4">Admin Dashboard</h3>
        <ul className="list-unstyled">
          <li className="mb-3">
            <a
              href="/admin-dashboard"
              className="text-white text-decoration-none"
            >
              Dashboard
            </a>
          </li>
          <li className="mb-3">
            <a href="/cars" className="text-white text-decoration-none">
              Car
            </a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1">
        <div className="bg-dark text-white d-flex justify-content-between align-items-center px-4 py-2">
          <h5>Admin Dashboard</h5>
          <div className="d-flex align-items-center">
            <FaUserCircle size={24} className="me-3" />
            <button
              className="btn btn-outline-light btn-sm"
              onClick={handleLogout}
            >
              <FaPowerOff className="me-1" />
              Logout
            </button>
          </div>
        </div>

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
              onClick={() => navigate("/add-category")}
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
                      style={{ cursor: "pointer" }}
                      onClick={() => handleViewCategory(category._id)}
                      title="View Details"
                    />
                    <BiPencil
                      size={20}
                      className="me-3"
                      style={{ cursor: "pointer", color: "blue" }}
                      onClick={() => {
                        setSelectedCategory(category);
                        setCategoryData({
                          name: category.name,
                          description: category.description,
                        });
                        setModalType("edit");
                      }}
                      title="Edit Category"
                    />
                    <BiTrash
                      size={20}
                      style={{ cursor: "pointer", color: "red" }}
                      onClick={() => handleDeleteCategory(category._id)}
                      title="Delete Category"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Modals */}
      {(modalType === "add" ||
        modalType === "edit" ||
        modalType === "view") && (
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
          <div
            className="modal-dialog"
            style={{ maxWidth: "500px", margin: "10% auto" }}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {modalType === "add"
                    ? "Add Category"
                    : modalType === "edit"
                    ? "Edit Category"
                    : "View Category"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setModalType("")}
                ></button>
              </div>
              <div className="modal-body">
                {modalType === "view" ? (
                  <div>
                    <p>
                      <strong>Name:</strong> {selectedCategory?.name}
                    </p>
                    <p>
                      <strong>Description:</strong>{" "}
                      {selectedCategory?.description || "N/A"}
                    </p>
                  </div>
                ) : (
                  <form>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        value={categoryData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="description" className="form-label">
                        Description
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        className="form-control"
                        value={categoryData.description}
                        onChange={handleInputChange}
                      />
                    </div>
                  </form>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setModalType("")}
                >
                  Close
                </button>
                {modalType !== "view" && (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSaveCategory}
                  >
                    Save Changes
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
