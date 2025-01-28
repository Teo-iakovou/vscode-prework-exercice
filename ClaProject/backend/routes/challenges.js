const express = require("express");
const router = express.Router();
const {
  createChallenge,
  listChallenges,
  getChallengeById,
  listCategories,
} = require("../controllers/challengesContoller");
const { validateChallenge } = require("../validators/challengeValidator");
const authMiddleware = require("../middlewares/authMiddleware");

// Routes
router.post("/", authMiddleware, validateChallenge, createChallenge);
router.get("/", listChallenges);
router.get("/:id", getChallengeById);
router.get("/categories", listCategories);

module.exports = router;
