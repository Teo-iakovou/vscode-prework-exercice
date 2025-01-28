const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

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
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials." });
    }
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
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

module.exports = {
  registerCoder,
  registerManager,
  loginUser,
  getProfile,
  updateProfile,
};
