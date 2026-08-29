import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import apiClient from "../api/apiClient";

import "./Auth.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [isLoading, setIsLoading] = useState(false);


  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");


    // -----------------------------
    // Basic validation
    // -----------------------------

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.password
    ) {
      setError(
        "Please fill in all required fields."
      );

      return;
    }


    if (formData.password.length < 8) {
      setError(
        "Password must be at least 8 characters."
      );

      return;
    }


    if (
      formData.password !==
      formData.confirmPassword
    ) {
      setError(
        "Passwords do not match."
      );

      return;
    }


    try {

      setIsLoading(true);


      // -----------------------------
      // Send registration request
      // -----------------------------

      await apiClient.post(
        "/auth/register",
        {
          name: formData.name.trim(),
          email: formData.email.trim(),
          password: formData.password,
        }
      );


      setSuccess(
        "Account created successfully."
      );


      // -----------------------------
      // Redirect to login
      // -----------------------------

      setTimeout(() => {
        navigate("/");
      }, 1000);


    } catch (error) {

      const message =
        error?.response?.data?.detail ||
        "Unable to create account. Please try again.";

      setError(message);

    } finally {

      setIsLoading(false);

    }
  };


  return (
    <div className="auth-page">

      <div className="auth-card">

        <div className="auth-header">

          <div className="auth-logo">
            R
          </div>

          <h1>
            Create your account
          </h1>

          <p>
            Start using your document
            knowledge assistant.
          </p>

        </div>


        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >

          <div className="form-group">

            <label htmlFor="name">
              Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              disabled={isLoading}
            />

          </div>


          <div className="form-group">

            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
            />

          </div>


          <div className="form-group">

            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              placeholder="Minimum 8 characters"
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading}
            />

          </div>


          <div className="form-group">

            <label htmlFor="confirmPassword">
              Confirm Password
            </label>

            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Re-enter your password"
              value={
                formData.confirmPassword
              }
              onChange={handleChange}
              disabled={isLoading}
            />

          </div>


          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}


          {success && (
            <div className="auth-success">
              {success}
            </div>
          )}


          <button
            type="submit"
            className="auth-button"
            disabled={isLoading}
          >

            {isLoading
              ? "Creating account..."
              : "Create account"}

          </button>

        </form>


        <div className="auth-footer">

          <span>
            Already have an account?
          </span>

          <Link to="/">
            Sign in
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Register;