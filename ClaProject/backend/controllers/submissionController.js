const Submission = require("../models/Submission");
const Challenge = require("../models/Challenge");
const User = require("../models/User");

const gradeSubmission = async (req, res) => {
  try {
    const { challenge_id, lang, code } = req.body;
    const challenge = await Challenge.findById(challenge_id);
    if (!challenge) {
      return res.status(404).json({ message: "Challenge not found" });
    }

    // Check if the challenge is already solved by this user
    const previousSubmission = await Submission.findOne({
      challenge: challenge_id,
      user: req.user.id,
      status: "passed",
    });
    if (previousSubmission) {
      return res.status(400).json({ message: "Challenge already solved" });
    }

    const payload = {
      lang,
      code,
      func_name: challenge.code.function_name,
      tests: challenge.tests,
    };

    const runnerResponse = await axios.post(
      "https://runlang-v1.onrender.com/run",
      payload
    );
    const { status, test_results } = runnerResponse.data;

    let score = 0;
    if (status === "passed") {
      score = test_results.reduce((acc, test) => acc + test.weight * 100, 0);
    }

    const submission = new Submission({
      user: req.user.id,
      challenge: challenge_id,
      status,
      score,
      code,
    });

    await submission.save();

    // Update user's total score
    if (status === "passed") {
      await User.findByIdAndUpdate(req.user.id, { $inc: { score } });
    }

    res
      .status(201)
      .json({ message: "Submission graded successfully", submission });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { gradeSubmission };
