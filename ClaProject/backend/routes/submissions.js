const express = require("express");
const router = express.Router();
const { gradeSubmission } = require("../controllers/submissionController");
const { validateSubmission } = require("../validators/submissionValidator");
const authMiddleware = require("../middlewares/authMiddleware");

// Route to handle code submission
router.post("/", authMiddleware, validateSubmission, gradeSubmission);

module.exports = router;
