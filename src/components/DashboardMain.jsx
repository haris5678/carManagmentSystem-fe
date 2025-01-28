import { useState, useEffect } from "react";
import { BiShow, BiTrash, BiPencil } from "react-icons/bi";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DashboardMain = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [categories, setCategories] = useState([]);
  const [modalType, setModalType] = useState(""); 
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
      setModalType(""); 
      setCategoryData({ name: "", description: "" });

      fetchCategories(); 

      setTimeout(() => setSuccessMessage(""), 3000); 
    } catch (err) {
      console.error(err);
      setError("Failed to save category. Please try again.");
    }
  };

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
      fetchCategories(); 
    } catch (err) {
      console.error(err);
      setError("Failed to delete category. Please try again.");
    }
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

export default DashboardMain;
