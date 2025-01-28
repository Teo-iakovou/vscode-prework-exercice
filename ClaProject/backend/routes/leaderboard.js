const express = require("express");
const router = express.Router();
const {
  getLeaderboard,
  getTopKCoders,
} = require("../controllers/leaderboardController");

// Routes
router.get("/", getLeaderboard);
router.get("/top", getTopKCoders);

module.exports = router;
