import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const ForgetPassword = () => {
  // Yup Validation Schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, setMessage, setError }) => {
    try {
      const response = await axios.post(
        "https://carmanagment.duckdns.org/api/auth/forgot-password",
        values
      );
      setMessage("Password reset link has been sent to your email!");
      setError(""); 
      console.log(response.data); 
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
      setMessage(""); 
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
        className="forget-password-container bg-white p-4 rounded shadow"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h2 className="text-center mb-4">Forgot Password</h2>
        <Formik
          initialValues={{ email: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            handleSubmit(values, {
              setSubmitting: actions.setSubmitting,
              setMessage: actions.setFieldValue.bind(null, "message"),
              setError: actions.setFieldValue.bind(null, "error"),
            });
          }}
        >
          {({ isSubmitting, status }) => (
            <Form>
              {status?.message && (
                <div className="alert alert-success">{status.message}</div>
              )}
              {status?.error && (
                <div className="alert alert-danger">{status.error}</div>
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
                  placeholder="Enter your email"
                />
                <ErrorMessage
                  name="email"
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
                {isSubmitting ? "Submitting..." : "Reset Password"}
              </button>
            </Form>
          )}
        </Formik>
        <div className="text-center mt-3">
          <a href="/signin" style={{ color: "black" }}>
            Back to Sign In
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
