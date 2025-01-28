import { useState, useEffect } from "react";
import { BiShow } from "react-icons/bi";
import axios from "axios";

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState("");

  // Fetch all cars
  const fetchCars = async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      setError("You are not authorized. Please log in.");
      return;
    }

    try {
      const response = await axios.get(
        "https://carmanagment.duckdns.org/api/car/get-all-cars",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCars(response.data.cars || []);
      setError("");
    } catch (err) {
      console.error("Failed to fetch cars:", err);
      setError("Failed to load cars. Please try again.");
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <div className="p-4">
      {error && <div className="alert alert-danger">{error}</div>}
      <h6>All Cars</h6>
      <ul className="list-group">
        {cars.length > 0 ? (
          cars.map((car) => (
            <li
              key={car._id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {car.model} ({car.yearOfManufacture})
              <BiShow
                size={20}
                style={{ cursor: "pointer" }}
                title="View Details"
                onClick={() => onViewCar(car._id)}
              />
            </li>
          ))
        ) : (
          <li className="list-group-item">No cars found.</li>
        )}
      </ul>
    </div>
  );
};

export default Cars;
