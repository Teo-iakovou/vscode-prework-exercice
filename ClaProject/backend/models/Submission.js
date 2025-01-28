const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema(
  {
    challengeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Challenge",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    lang: { type: String, enum: ["py", "js"], required: true },
    code: { type: String, required: true },
    status: {
      type: String,
      enum: ["Pending", "Correct", "Incorrect"],
      default: "Pending",
    },
    output: { type: mongoose.Schema.Types.Mixed }, // Store the result of the submission
  },
  { timestamps: true }
);

module.exports = mongoose.model("Submission", submissionSchema);
