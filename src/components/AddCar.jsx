import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddCar = () => {
  const [formData, setFormData] = useState({
    category: "",
    color: "",
    model: "",
    make: "",
    registrationNo: "",
    yearOfManufacture: "",
  });
  const [categories, setCategories] = useState([]); // State for categories
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false); // State for button loading
  const navigate = useNavigate();

  // Fetch Categories
  useEffect(() => {
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
        setError("");
      } catch (err) {
        console.error(err);
        setError("Failed to load categories. Please try again.");
      }
    };

    fetchCategories();
  }, [navigate]);

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("You are not authorized. Please log in.");
      navigate("/signin");
      return;
    }
    setLoading(true);

    try {
      await axios.post(
        "https://carmanagment.duckdns.org/api/car/add-car",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccessMessage("Car added successfully!");
      setError("");
      setFormData({
        category: "",
        color: "",
        model: "",
        make: "",
        registrationNo: "",
        yearOfManufacture: "",
      }); // Reset form
    } catch (err) {
      console.error(err);
      setError("Failed to add car. Please try again.");
      setSuccessMessage("");
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "grey" }}
    >
      <div
        className="bg-white p-4 rounded shadow"
        style={{ maxWidth: "500px", width: "100%" }}
      >
        <button
          className="btn btn-secondary mb-3"
          onClick={() => navigate("/dashboard")}
        >
          Back to Dashboard
        </button>
        <h2 className="text-center mb-4">Add Car</h2>
        {/* Error or Success Messages */}
        {error && <div className="alert alert-danger text-center">{error}</div>}
        {successMessage && (
          <div className="alert alert-success text-center">
            {successMessage}
          </div>
        )}

        {/* Add Car Form */}
        <form onSubmit={handleSubmit}>
          {/* Category Dropdown */}
          <div className="mb-3">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <select
              id="category"
              name="category"
              className="form-control"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Color */}
          <div className="mb-3">
            <label htmlFor="color" className="form-label">
              Color
            </label>
            <input
              type="text"
              id="color"
              name="color"
              className="form-control"
              placeholder="Enter car color"
              value={formData.color}
              onChange={handleChange}
              required
            />
          </div>

          {/* Model */}
          <div className="mb-3">
            <label htmlFor="model" className="form-label">
              Model
            </label>
            <input
              type="text"
              id="model"
              name="model"
              className="form-control"
              placeholder="Enter car model"
              value={formData.model}
              onChange={handleChange}
              required
            />
          </div>

          {/* Make */}
          <div className="mb-3">
            <label htmlFor="make" className="form-label">
              Make
            </label>
            <input
              type="text"
              id="make"
              name="make"
              className="form-control"
              placeholder="Enter car make"
              value={formData.make}
              onChange={handleChange}
              required
            />
          </div>

          {/* Registration Number */}
          <div className="mb-3">
            <label htmlFor="registrationNo" className="form-label">
              Registration Number
            </label>
            <input
              type="text"
              id="registrationNo"
              name="registrationNo"
              className="form-control"
              placeholder="Enter registration number"
              value={formData.registrationNo}
              onChange={handleChange}
              required
            />
          </div>

          {/* Year of Manufacture */}
          <div className="mb-3">
            <label htmlFor="yearOfManufacture" className="form-label">
              Year of Manufacture
            </label>
            <input
              type="number"
              id="yearOfManufacture"
              name="yearOfManufacture"
              className="form-control"
              placeholder="Enter year of manufacture"
              value={formData.yearOfManufacture}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? (
              <div className="spinner-border spinner-border-sm" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              "Add Car"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCar;
