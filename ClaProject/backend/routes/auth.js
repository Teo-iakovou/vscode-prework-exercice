const express = require("express");
const router = express.Router();
const {
  registerCoder,
  registerManager,
  loginUser,
} = require("../controllers/authController");
const {
  validateRegister,
  validateLogin,
} = require("../validators/authValidator");
const { getProfile, updateProfile } = require("../controllers/authController");
// Routes for registration
router.post("/coder/register", validateRegister, registerCoder);
router.post("/manager/register", validateRegister, registerManager);

// Route for login
router.post("/login", validateLogin, loginUser);
router.get("/profile", getProfile);
router.put("/profile", updateProfile);
module.exports = router;
