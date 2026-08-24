import { useState } from "react";

import { useForm } from "react-hook-form";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  Loader2,
} from "lucide-react";

import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [serverError, setServerError] =
    useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm();

  const password = watch("password");


  const onSubmit = async (data) => {
    setServerError("");

    try {

      // Backend registration will be connected later.

      await new Promise((resolve) =>
        setTimeout(resolve, 1200)
      );

      console.log(
        "Registration data:",
        data
      );

      navigate("/");

    } catch (error) {

      setServerError(
        "Unable to create your account. Please try again."
      );

    }
  };


  return (
    <div className="auth-page">

      <div className="auth-card register-card">

        <div className="auth-logo">
          R
        </div>


        <div className="auth-header">

          <h1>
            Create your account
          </h1>

          <p>
            Start using your Enterprise RAG Assistant
          </p>

        </div>


        {serverError && (
          <div className="auth-error">
            {serverError}
          </div>
        )}


        <form
          className="auth-form"
          onSubmit={handleSubmit(onSubmit)}
        >

          {/* Name */}

          <div className="form-group">

            <label htmlFor="name">
              Full name
            </label>

            <div
              className={
                errors.name
                  ? "input-wrapper input-error"
                  : "input-wrapper"
              }
            >

              <User size={18} />

              <input
                id="name"
                type="text"
                placeholder="Your name"
                autoComplete="name"
                {...register("name", {
                  required:
                    "Your name is required",

                  minLength: {
                    value: 2,

                    message:
                      "Name must be at least 2 characters",
                  },
                })}
              />

            </div>

            {errors.name && (
              <span className="field-error">
                {errors.name.message}
              </span>
            )}

          </div>


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

            <label htmlFor="password">
              Password
            </label>

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
                placeholder="Create a password"
                autoComplete="new-password"
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


          {/* Confirm password */}

          <div className="form-group">

            <label htmlFor="confirmPassword">
              Confirm password
            </label>

            <div
              className={
                errors.confirmPassword
                  ? "input-wrapper input-error"
                  : "input-wrapper"
              }
            >

              <Lock size={18} />

              <input
                id="confirmPassword"
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                placeholder="Confirm your password"
                autoComplete="new-password"
                {...register(
                  "confirmPassword",
                  {
                    required:
                      "Please confirm your password",

                    validate: (value) =>
                      value === password ||
                      "Passwords do not match",
                  }
                )}
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
              >
                {showConfirmPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>

            </div>

            {errors.confirmPassword && (
              <span className="field-error">
                {
                  errors.confirmPassword
                    .message
                }
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

                Creating account...
              </>
            ) : (
              "Create account"
            )}

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