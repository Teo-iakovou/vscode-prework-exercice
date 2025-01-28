import React from "react";
import { login } from "../redux/slices/authSlice";
import codingLogo from "../assets/coding.png";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

// Zod schema for validation
const signUpSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });
  const onSubmit = (data) => {
    // Dispatch login action with user data (simulating login after signup)
    dispatch(login(data));
    navigate("/home"); // Redirect to home page
  };
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="flex w-3/5 shadow-lg rounded-lg overflow-hidden">
        {/* Left Section */}
        <div className="bg-indigo-900 flex justify-center items-center w-1/2 p-8">
          <img src={codingLogo} alt="Coding Logo" className="w-64 h-auto" />
        </div>

        {/* Right Section */}
        <div className="bg-white w-1/2 p-10 flex flex-col justify-center items-center">
          <h3 className="text-indigo-600 mb-6 text-2xl">Join Coders Now!</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <input
              type="text"
              placeholder="First Name"
              {...register("firstName")}
              className="w-full p-3 mb-4 border rounded-md bg-indigo-900 text-white placeholder-white"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName.message}</p>
            )}

            <input
              type="text"
              placeholder="Last Name"
              {...register("lastName")}
              className="w-full p-3 mb-4 border rounded-md bg-indigo-900 text-white placeholder-white"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName.message}</p>
            )}

            <input
              type="email"
              placeholder="Email"
              {...register("email")}
              className="w-full p-3 mb-4 border rounded-md bg-indigo-900 text-white placeholder-white"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}

            <input
              type="password"
              placeholder="Password"
              {...register("password")}
              className="w-full p-3 mb-4 border rounded-md bg-indigo-900 text-white placeholder-white"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}

            <button
              type="submit"
              className="w-full p-3 bg-cyan-400 text-white rounded-md hover:bg-indigo-500 transition mt-4"
            >
              Sign Up
            </button>
          </form>
          <p className="text-sm mt-4">
            Already have an account?
            <Link
              to="/signin"
              className="text-indigo-600 font-bold hover:underline ml-2"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
