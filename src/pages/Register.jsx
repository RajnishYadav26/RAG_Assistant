import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Register() {

  const navigate = useNavigate();

  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();


  const password = watch("password");


  const onSubmit = async (data) => {

    try {

      setError("");

      /*
       * Backend registration API
       * will be connected later.
       */

      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Registration data:", data);

      navigate("/");

    } catch (err) {

      setError("Registration failed. Please try again.");

    }

  };


  return (
    <div>

      <h1>Create Account</h1>

      <form onSubmit={handleSubmit(onSubmit)}>


        <div>

          <label>Name</label>

          <input
            type="text"
            placeholder="Enter your name"
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 2,
                message: "Name must contain at least 2 characters",
              },
            })}
          />

          {errors.name && (
            <p>{errors.name.message}</p>
          )}

        </div>


        <div>

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Please enter a valid email",
              },
            })}
          />

          {errors.email && (
            <p>{errors.email.message}</p>
          )}

        </div>


        <div>

          <label>Password</label>

          <input
            type="password"
            placeholder="Create a password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must contain at least 8 characters",
              },
            })}
          />

          {errors.password && (
            <p>{errors.password.message}</p>
          )}

        </div>


        <div>

          <label>Confirm Password</label>

          <input
            type="password"
            placeholder="Confirm your password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
          />

          {errors.confirmPassword && (
            <p>{errors.confirmPassword.message}</p>
          )}

        </div>


        {error && (
          <p>{error}</p>
        )}


        <button
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating account..." : "Create Account"}
        </button>

      </form>


      <p>
        Already have an account?{" "}

        <Link to="/">
          Login
        </Link>

      </p>

    </div>
  );
}

export default Register;