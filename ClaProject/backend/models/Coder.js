const mongoose = require("mongoose");

const CoderSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  challenges_completed: { type: Number, default: 0 },
  skill_level: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    default: "Beginner",
  },
});

const Coder = mongoose.model("Coder", CoderSchema);
module.exports = Coder;
