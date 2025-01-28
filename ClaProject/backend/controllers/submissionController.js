const Submission = require("../models/Submission");
const Challenge = require("../models/Challenge");
const User = require("../models/User");

const gradeSubmission = async (req, res) => {
  try {
    const { challengeId, lang, code } = req.body;

    // Validate the challenge exists
    const challenge = await Challenge.findById(challengeId);
    if (!challenge) {
      return res.status(404).json({ message: "Challenge not found." });
    }

    // Create a submission entry
    const submission = new Submission({
      challengeId,
      userId: req.user.id,
      lang,
      code,
    });
    await submission.save();

    // Simulate grading logic
    const isCorrect = Math.random() > 0.5; // Random correctness simulation
    submission.status = isCorrect ? "Correct" : "Incorrect";
    submission.output = isCorrect
      ? challenge.tests[0].output
      : "Incorrect output";
    await submission.save();

    // Update user score if correct
    if (isCorrect) {
      const user = await User.findById(req.user.id);
      user.score += 10; // Increment score by 10 for correct submission
      await user.save();
    }

    res.json({
      message: "Submission graded.",
      status: submission.status,
      output: submission.output,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { gradeSubmission };
