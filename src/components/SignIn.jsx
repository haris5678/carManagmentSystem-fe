import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });


  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await axios.post(
        "https://carmanagment.duckdns.org/api/auth/login",
        values
      );

      const { role } = response.data.user;
      const token = response.data.token; 
      localStorage.setItem("authToken", token);
      localStorage.setItem("userRole", role);

      alert("Login successful!");

      console.log("token is ", token);
      console.log("role is ", response.data.token);

      if (role == "admin") {
        navigate("/admin-dashboard");
      } else if (role == "user") {
        navigate("/dashboard");
      } else {
        throw new Error("Invalid role. Please contact support.");
      }
    } catch (err) {
      console.error(err);
      setErrors({
        api:
          err.response?.data?.message ||
          "Invalid login credentials. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "grey" }}
    >
      <div
        className="signup-container bg-white p-4 rounded shadow"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h2 className="text-center mb-4">Sign In</h2>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors }) => (
            <Form>
              {errors.api && (
                <div className="alert alert-danger text-center">
                  {errors.api}
                </div>
              )}

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  className="form-control"
                  placeholder="Enter email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  className="form-control"
                  placeholder="Enter password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-danger"
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={isSubmitting}
                style={{ backgroundColor: "black", border: "none" }}
              >
                {isSubmitting ? "Signing In..." : "Sign In"}
              </button>
            </Form>
          )}
        </Formik>
        <div className="text-center mt-3">
          <span>Forgot </span>
          <a href="/forget-password" style={{ color: "black" }}>
            password
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
