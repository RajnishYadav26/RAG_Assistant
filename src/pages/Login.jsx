import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  Loader2,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [showPassword, setShowPassword] =
    useState(false);

  const [serverError, setServerError] =
    useState("");

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm();


  const onSubmit = async (data) => {
    setServerError("");

    try {
      // Temporary frontend login.
      // FastAPI will replace this later.

      await new Promise((resolve) =>
        setTimeout(resolve, 1200)
      );

      login({
        id: "demo-user",
        name: "Demo User",
        email: data.email,
      });

      navigate("/dashboard");

    } catch (error) {
      setServerError(
        "Unable to sign in. Please try again."
      );
    }
  };


  return (
    <div className="auth-page">

      <div className="auth-card">

        {/* Logo */}

        <div className="auth-logo">
          R
        </div>


        {/* Header */}

        <div className="auth-header">

          <h1>
            Welcome back
          </h1>

          <p>
            Sign in to your RAG Assistant
          </p>

        </div>


        {/* Error */}

        {serverError && (
          <div className="auth-error">
            {serverError}
          </div>
        )}


        {/* Form */}

        <form
          className="auth-form"
          onSubmit={handleSubmit(onSubmit)}
        >

          {/* Email */}

          <div className="form-group">

            <label htmlFor="email">
              Email address
            </label>

            <div
              className={
                errors.email
                  ? "input-wrapper input-error"
                  : "input-wrapper"
              }
            >

              <Mail size={18} />

              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                {...register("email", {
                  required:
                    "Email address is required",

                  pattern: {
                    value:
                      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

                    message:
                      "Please enter a valid email address",
                  },
                })}
              />

            </div>

            {errors.email && (
              <span className="field-error">
                {errors.email.message}
              </span>
            )}

          </div>


          {/* Password */}

          <div className="form-group">

            <div className="password-label-row">

              <label htmlFor="password">
                Password
              </label>

              <button
                type="button"
                className="forgot-button"
                onClick={() => {
                  alert(
                    "Password reset will be connected to the backend later."
                  );
                }}
              >
                Forgot password?
              </button>

            </div>


            <div
              className={
                errors.password
                  ? "input-wrapper input-error"
                  : "input-wrapper"
              }
            >

              <Lock size={18} />

              <input
                id="password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter your password"
                autoComplete="current-password"
                {...register("password", {
                  required:
                    "Password is required",

                  minLength: {
                    value: 8,

                    message:
                      "Password must be at least 8 characters",
                  },
                })}
              />


              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>

            </div>

            {errors.password && (
              <span className="field-error">
                {errors.password.message}
              </span>
            )}

          </div>


          {/* Submit */}

          <button
            type="submit"
            className="auth-submit"
            disabled={isSubmitting}
          >

            {isSubmitting ? (
              <>
                <Loader2
                  size={18}
                  className="spin"
                />

                Signing in...
              </>
            ) : (
              "Sign in"
            )}

          </button>

        </form>


        {/* Register */}

        <div className="auth-footer">

          <span>
            Don't have an account?
          </span>

          <Link to="/register">
            Create an account
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Login;