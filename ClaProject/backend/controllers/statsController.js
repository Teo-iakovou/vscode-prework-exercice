const Submission = require("../models/Submission");
const Challenge = require("../models/Challenge");

// Solved Challenges Statistics
const getSolvedChallengesStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const stats = await Submission.aggregate([
      { $match: { userId: userId, status: "Correct" } },
      {
        $lookup: {
          from: "challenges",
          localField: "challengeId",
          foreignField: "_id",
          as: "challengeDetails",
        },
      },
      { $unwind: "$challengeDetails" },
      {
        $group: {
          _id: "$challengeDetails.level",
          count: { $sum: 1 },
        },
      },
    ]);

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Trending Categories
const getTrendingCategories = async (req, res) => {
  try {
    const trending = await Submission.aggregate([
      {
        $lookup: {
          from: "challenges",
          localField: "challengeId",
          foreignField: "_id",
          as: "challengeDetails",
        },
      },
      { $unwind: "$challengeDetails" },
      {
        $group: {
          _id: "$challengeDetails.category",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);

    res.json(trending);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Heatmap
const getHeatmap = async (req, res) => {
  try {
    const { start_date, end_date } = req.query;

    const submissions = await Submission.aggregate([
      {
        $match: {
          userId: req.user.id,
          createdAt: {
            $gte: new Date(start_date),
            $lte: new Date(end_date),
          },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getSolvedChallengesStats,
  getTrendingCategories,
  getHeatmap,
};
