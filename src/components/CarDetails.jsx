import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const CarDetails = () => {
  const { id } = useParams(); 
  const [car, setCar] = useState(null); 
  const [error, setError] = useState(""); 
  const [successMessage, setSuccessMessage] = useState(""); 
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCarDetails = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        setError("You are not authorized. Please log in.");
        navigate("/signin");
        return;
      }

      try {
        const response = await axios.get(
          `https://carmanagment.duckdns.org/api/car/get-car-by-Id/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Full car response:", response.data);
        setCar(response.data); // Set car details
        setError("");
      } catch (err) {
        console.error("Failed to fetch car details:", err);
        setError("Failed to load car details. Please try again.");
      } finally {
        setLoading(false); // Stop loading spinner
      }
    };

    fetchCarDetails();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading car details...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "grey" }}
    >
      <div
        className="bg-white p-4 rounded shadow"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h2 className="text-center mb-4">Car Details</h2>
        {/* Error or Success Message */}
        {error && <div className="alert alert-danger text-center">{error}</div>}
        {successMessage && (
          <div className="alert alert-success text-center">
            {successMessage}
          </div>
        )}

        {/* Car Details */}
        {car && (
          <>
            <div className="mb-3">
              <label className="form-label">Model</label>
              <input
                type="text"
                className="form-control"
                value={car.model}
                disabled
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Year of Manufacture</label>
              <input
                type="text"
                className="form-control"
                value={car.yearOfManufacture}
                disabled
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Color</label>
              <input
                type="text"
                className="form-control"
                value={car.color}
                disabled
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Category</label>
              <input
                type="text"
                className="form-control"
                value={car.category?.name || "N/A"}
                disabled
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Registration Number</label>
              <input
                type="text"
                className="form-control"
                value={car.registrationNo}
                disabled
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Make</label>
              <input
                type="text"
                className="form-control"
                value={car.make}
                disabled
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Added By</label>
              <input
                type="text"
                className="form-control"
                value={`${car.createdBy?.firstName} (${car.createdBy?.email})`}
                disabled
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Date Added</label>
              <input
                type="text"
                className="form-control"
                value={new Date(car.createdAt).toLocaleDateString()}
                disabled
              />
            </div>

            <button
              className="btn btn-primary w-100 mt-3"
              onClick={() => navigate("/dashboard")}
            >
              Back to Dashboard
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CarDetails;
