import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleAddCategory = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");

    if (!token) {
      setError("You are not authorized. Please log in.");
      navigate("/signin");
      return;
    }

    try {
      await axios.post(
        "https://carmanagment.duckdns.org/api/category/create-category",
        { name, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccessMessage("Category added successfully!");
      setError("");
      setName("");
      setDescription("");

      // Automatically navigate back to the dashboard after 2 seconds
      setTimeout(() => {
        setSuccessMessage("");
        navigate("/admin-dashboard");
      }, 2000);
    } catch (err) {
      console.error(err);
      setError("Failed to add category. Please try again.");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "grey" }}
    >
      <div
        className="bg-white p-4 rounded shadow"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h2 className="text-center mb-4">Add Category</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        {successMessage && (
          <div className="alert alert-success text-center">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleAddCategory}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              placeholder="Enter category name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description (Optional)
            </label>
            <textarea
              id="description"
              name="description"
              className="form-control"
              placeholder="Enter description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            style={{ backgroundColor: "black", border: "none" }}
          >
            Add Category
          </button>

          <button
            type="button"
            className="btn btn-secondary w-100 mt-2"
            onClick={() => navigate("/admin-dashboard")}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
