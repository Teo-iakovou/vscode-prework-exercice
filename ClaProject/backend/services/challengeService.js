const Submission = require("../models/Submission");

const getStatusForChallenge = async (userId, challengeId) => {
  const submission = await Submission.findOne({
    user: userId,
    challenge: challengeId,
  });

  if (!submission) return "Waiting";
  if (submission.status === "passed") return "Completed";
  return "Attempted";
};

module.exports = { getStatusForChallenge };
