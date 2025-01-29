const express = require("express");
const router = express.Router();
const {
  registerCoder,
  registerManager,
  loginUser,
  registerController,
  verifyEmailController,
} = require("../controllers/authController");
const {
  validateRegister,
  validateLogin,
} = require("../validators/authValidator");
const { getProfile, updateProfile } = require("../controllers/authController");
// Routes for registration
router.post("/coder/register", validateRegister, registerCoder);
router.post("/manager/register", validateRegister, registerManager);
router.post("/register", registerController);
router.get("/verify", verifyEmailController);
// Route for login
router.post("/login", validateLogin, loginUser);
router.get("/profile", getProfile);
router.put("/profile", updateProfile);
module.exports = router;
