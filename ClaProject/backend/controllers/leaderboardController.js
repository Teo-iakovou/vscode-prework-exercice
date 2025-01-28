const User = require("../models/User");

// Get Full Leaderboard
const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await User.find({ role: "coder" })
      .sort({ score: -1 }) // Sort by score in descending order
      .select("firstName lastName score"); // Only include relevant fields
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Top K Coders
const getTopKCoders = async (req, res) => {
  try {
    const { k } = req.query;
    const topCoders = await User.find({ role: "coder" })
      .sort({ score: -1 })
      .limit(parseInt(k)) // Limit results to K coders
      .select("firstName lastName score");

    res.json(topCoders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getLeaderboard, getTopKCoders };
