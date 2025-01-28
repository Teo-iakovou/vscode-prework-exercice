import codingLogo from "../assets/coding.png";
import React, { useState } from "react";
import { login } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

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
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  // Handle form submission
  const handleLogin = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Dispatch login action with mock user data
    const user = { name: "Teo Iakovou", email };
    dispatch(login(user)); // Update Redux auth state
    navigate("/home"); // Navigate to home page
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
              className="w-full p-2 mb-4 border rounded-md bg-gray-100"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mb-4 border rounded-md bg-gray-100"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
            <button
              type="submit"
              className="w-full p-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 transition mt-4"
            >
              Sign In
            </button>
            <p className="text-sm mt-4">
              New to CodeCLA?
              <Link
                to="/signup"
                className="text-indigo-600 font-bold hover:underline ml-2"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
