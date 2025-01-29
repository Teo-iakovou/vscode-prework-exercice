const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String },
  role: { type: String, required: true, enum: ["coder", "manager"] },
  description: { type: String }, // Coders only
  score: { type: Number, default: 0 }, // Coders only
  isVerified: { type: Boolean, default: false }, // Verification status
});

module.exports = mongoose.model("User", userSchema);
