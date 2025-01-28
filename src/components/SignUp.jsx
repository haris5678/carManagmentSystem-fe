import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";

const validationSchema = Yup.object({
  firstName: Yup.string()
    .trim()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(30, "First name must be 30 characters or less"),
  lastName: Yup.string()
    .trim()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(30, "Last name must be 30 characters or less"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone_no: Yup.string()
    .matches(/^\d{11}$/, "Phone number must be exactly 11 digits")
    .required("Phone number is required"),
});

const SignUp = () => {
  const navigate = useNavigate();

  // Handle Form Submission
  const handleSubmit = async (
    values,
    { setSubmitting, resetForm, setErrors }
  ) => {
    try {
      const response = await axios.post(
        "https://carmanagment.duckdns.org/api/auth/signup",
        values
      );

      alert(response.data.message || "Sign-up successful!");
      resetForm();
      navigate("/signin");
    } catch (err) {
      setErrors({
        api:
          err.response?.data?.error ||
          "Something went wrong. Please try again.",
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
        <h2 className="text-center mb-4">Sign Up</h2>
        <Formik
          initialValues={{
            email: "",
            phone_no: "",
            firstName: "",
            lastName: "",
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
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <Field
                  type="text"
                  name="firstName"
                  id="firstName"
                  className="form-control"
                  placeholder="Enter your first name"
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <Field
                  type="text"
                  name="lastName"
                  id="lastName"
                  className="form-control"
                  placeholder="Enter your last name"
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  className="form-control"
                  placeholder="Enter your email address"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="phone_no" className="form-label">
                  Phone Number
                </label>
                <Field
                  type="text"
                  name="phone_no"
                  id="phone_no"
                  className="form-control"
                  placeholder="Enter your phone number"
                />
                <ErrorMessage
                  name="phone_no"
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
                {isSubmitting ? "Submitting..." : "Sign Up"}
              </button>
            </Form>
          )}
        </Formik>
        <div className="text-center mt-3">
          <span>Already registered? </span>
          <a href="/signin" style={{ color: "black" }}>
            Sign In
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
