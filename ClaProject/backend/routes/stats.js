const express = require("express");
const router = express.Router();
const {
  getSolvedChallengesStats,
  getTrendingCategories,
  getHeatmap,
} = require("../controllers/statsController");
const authMiddleware = require("../middlewares/authMiddleware");
const { validateHeatmapQuery } = require("../validators/statsValidator");

// Routes
router.get("/solved-challenges", authMiddleware, getSolvedChallengesStats);
router.get("/trending-categories", getTrendingCategories);
router.get("/heatmap", authMiddleware, validateHeatmapQuery, getHeatmap);

module.exports = router;
