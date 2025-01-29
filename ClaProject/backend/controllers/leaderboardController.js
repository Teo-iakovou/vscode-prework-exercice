const User = require("../models/User");

// Get Full Leaderboard
const getLeaderboard = async (req, res) => {
  try {
    const coders = await User.find({ role: "coder" })
      .sort({ score: -1 })
      .select("name score");
    res.status(200).json({ leaderboard: coders });
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
