const express = require("express");
const uploadMiddleware = require("../middlewares/uploadMiddleware");
const { updateCoderProfile } = require("../controllers/coderController");
const authMiddleware = require("../middlewares/authMiddleware"); // Ensure user authentication

const router = express.Router();

router.put(
  "/update-profile",
  authMiddleware,
  uploadMiddleware.single("avatar"),
  updateCoderProfile
);

module.exports = router;
