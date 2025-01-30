import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import codingLogo from "../assets/coding.png";

import { login } from "../redux/slices/authSlice"; // Redux action

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    if (email && !/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Invalid email format";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_EXPRESS_API_URL}/managers/signin`,
        {
          email,
          password,
        }
      );

      const token = response.data.token;
      Cookies.set("token", token, { expires: 7 }); // Store token in cookies for 7 days
      dispatch(login(token)); // Store token in Redux

      navigate("/home"); // Redirect to dashboard
    } catch (error) {
      console.error(
        "Signin Error:",
        error.response?.data?.message || "Signin failed"
      );
      alert(error.response?.data?.message || "Signin failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="flex w-3/5 shadow-lg rounded-lg overflow-hidden">
        {/* Left Section */}
        <div className="bg-purple-900 flex justify-center items-center w-1/2 p-8">
          <img src={codingLogo} alt="Coding Logo" className="w-64 h-auto" />
        </div>

        {/* Right Section */}
        <div className="bg-white w-1/2 p-10 flex flex-col justify-center items-center">
          <h3 className="text-purple-600 mb-6 text-2xl">Login Now!</h3>
          <form className="w-full" onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mb-4 border rounded-md"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mb-4 border rounded-md"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}

            <button
              type="submit"
              className="w-full p-3 bg-indigo-600 text-white rounded-md"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
