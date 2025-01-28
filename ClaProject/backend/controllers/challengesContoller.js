const Challenge = require("../models/Challenge");

// Create a Challenge
const createChallenge = async (req, res) => {
  try {
    const challenge = new Challenge(req.body);
    await challenge.save();
    res
      .status(201)
      .json({ message: "Challenge created successfully.", challenge });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// List Challenges
const listChallenges = async (req, res) => {
  try {
    const { category } = req.query;
    const challenges = category
      ? await Challenge.find({ category })
      : await Challenge.find();
    res.json(challenges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Challenge by ID
const getChallengeById = async (req, res) => {
  try {
    const { id } = req.params;
    const challenge = await Challenge.findById(id);
    if (!challenge) {
      return res.status(404).json({ message: "Challenge not found." });
    }
    res.json(challenge);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// List Categories
const listCategories = async (req, res) => {
  try {
    const categories = await Challenge.distinct("category");
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createChallenge,
  listChallenges,
  getChallengeById,
  listCategories,
};
