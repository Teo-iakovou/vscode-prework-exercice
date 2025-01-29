const Challenge = require("../models/Challenge");
const { getStatusForChallenge } = require("../services/challengeService");

// Create a Challenge
const createChallenge = async (req, res) => {
  try {
    const { title, category, description, level, code, tests } = req.body;
    const challenge = new Challenge({
      title,
      category,
      description,
      level,
      code,
      tests,
      createdBy: req.user.id,
    });
    await challenge.save();
    res
      .status(201)
      .json({ message: "Challenge created successfully", challenge });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// List Challenges
const listChallenges = async (req, res) => {
  try {
    const userRole = req.user.role;
    let challenges;

    if (userRole === "manager") {
      challenges = await Challenge.find({ createdBy: req.user.id });
    } else if (userRole === "coder") {
      challenges = await Challenge.find();
      challenges = challenges.map((challenge) => {
        const status = getStatusForChallenge(req.user.id, challenge._id); // Function to calculate status
        return { ...challenge._doc, status };
      });
    }

    res.status(200).json({ challenges });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Challenge by ID
const getChallengeById = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id).populate(
      "createdBy",
      "name"
    );
    if (!challenge) {
      return res.status(404).json({ message: "Challenge not found" });
    }

    // Add status if the requester is a coder
    if (req.user.role === "coder") {
      const status = getStatusForChallenge(req.user.id, challenge._id); // Helper function for status
      return res.status(200).json({ ...challenge._doc, status });
    }

    res.status(200).json(challenge);
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
