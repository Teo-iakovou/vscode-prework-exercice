const Submission = require("../models/Submission");
const Challenge = require("../models/Challenge");

// Solved Challenges Statistics
const getSolvedChallengesStats = async (req, res) => {
  try {
    const stats = await Challenge.aggregate([
      {
        $group: {
          _id: "$level",
          totalChallenges: { $sum: 1 },
          solvedChallenges: {
            $sum: {
              $cond: [{ $eq: ["$status", "passed"] }, 1, 0],
            },
          },
        },
      },
    ]);

    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Trending Categories
const getTrendingCategories = async (req, res) => {
  try {
    const categories = await Submission.aggregate([
      { $match: { status: "passed" } },
      {
        $lookup: {
          from: "challenges",
          localField: "challenge",
          foreignField: "_id",
          as: "challengeData",
        },
      },
      { $unwind: "$challengeData" },
      { $group: { _id: "$challengeData.category", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $project: { category: "$_id", count: 1, _id: 0 } },
    ]);

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Heatmap
const getHeatmap = async (req, res) => {
  try {
    const { start_date, end_date } = req.query;
    const startDate = start_date
      ? new Date(start_date)
      : new Date(new Date().setFullYear(new Date().getFullYear() - 1));
    const endDate = end_date ? new Date(end_date) : new Date();

    const heatmapData = await Submission.aggregate([
      {
        $match: {
          status: "passed",
          user: req.user.id,
          submittedAt: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $addFields: {
          date: {
            $dateToString: { format: "%Y/%m/%d", date: "$submittedAt" },
          },
        },
      },
      {
        $group: {
          _id: "$date",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          date: "$_id",
          count: 1,
          _id: 0,
        },
      },
      { $sort: { date: 1 } },
    ]);

    res.status(200).json(heatmapData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getSolvedChallengesStats,
  getTrendingCategories,
  getHeatmap,
};
