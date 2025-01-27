import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone_no: "",
    password: "", // For password update
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  // Fetch User Profile Data
  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        setError("You are not authorized. Please log in.");
        navigate("/signin");
        return;
      }

      try {
        const response = await axios.get(
          "https://carmanagment.duckdns.org/api/user/get-profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserData({ ...response.data.user, password: "" }); // Initialize data and clear password
        setError("");
      } catch (err) {
        console.error(err);
        setError("Failed to load user profile. Please try again.");
      }
    };

    fetchUserProfile();
  }, [navigate]);

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle Save Changes
  const handleSave = async () => {
    const token = localStorage.getItem("authToken");

    const payload = {};
    if (userData.lastName) payload.lastName = userData.lastName;
    if (userData.password) payload.password = userData.password;

    if (Object.keys(payload).length === 0) {
      setError("No changes to update.");
      setSuccessMessage("");
      return;
    }

    try {
      await axios.patch(
        "https://carmanagment.duckdns.org/api/user/update-profile",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccessMessage("Profile updated successfully!");
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to update profile. Please try again.");
      setSuccessMessage("");
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
        <h2 className="text-center mb-4">User Profile</h2>
        {/* Error or Success Message */}
        {error && <div className="alert alert-danger text-center">{error}</div>}
        {successMessage && (
          <div className="alert alert-success text-center">
            {successMessage}
          </div>
        )}

        {/* User Profile Form */}
        <form>
          {/* First Name (Non-editable) */}
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="form-control"
              value={userData.firstName}
              disabled
            />
          </div>

          {/* Last Name (Editable) */}
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="form-control"
              value={userData.lastName}
              onChange={handleChange}
              placeholder="Update last name"
            />
          </div>

          {/* Email (Non-editable) */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={userData.email}
              disabled
            />
          </div>

          {/* Phone Number (Non-editable) */}
          <div className="mb-3">
            <label htmlFor="phone_no" className="form-label">
              Phone Number
            </label>
            <input
              type="text"
              id="phone_no"
              name="phone_no"
              className="form-control"
              value={userData.phone_no}
              disabled
            />
          </div>

          {/* Password (Editable) */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              value={userData.password}
              onChange={handleChange}
              placeholder="Update password"
            />
          </div>

          {/* Save Changes Button */}
          <button
            type="button"
            className="btn btn-primary w-100"
            onClick={handleSave}
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
