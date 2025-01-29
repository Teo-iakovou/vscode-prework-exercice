const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { loginUserService } = require("../services/authService");

const { registerUser } = require("../services/authService");
// Register Coder
const registerCoder = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: "coder",
    });
    await newUser.save();
    res.status(201).json({ message: "Coder registered successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Register Manager
const registerManager = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: "manager",
    });
    await newUser.save();
    res.status(201).json({ message: "Manager registered successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await loginUserService(email, password);
    res.json({ token, message: "Login successful." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// Get User Profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update User Profile
const updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, about } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found." });

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.about = about || user.about;

    await user.save();
    res.json({ message: "Profile updated successfully.", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const registerController = async (req, res) => {
  try {
    const response = await registerUser(req.body);
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const verifyEmailController = async (req, res) => {
  try {
    const { token } = req.query;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "User already verified" });
    }

    user.isVerified = true;
    await user.save();

    res.send("<h1>Email verified successfully!</h1>");
  } catch (error) {
    res.status(400).send("<h1>Invalid or expired token</h1>");
  }
};
module.exports = {
  registerCoder,
  registerManager,
  loginUser,
  getProfile,
  updateProfile,
  registerController,
  verifyEmailController,
};
