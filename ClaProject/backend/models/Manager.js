const mongoose = require("mongoose");

const ManagerSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const Manager = mongoose.model("Manager", ManagerSchema);
module.exports = Manager;
