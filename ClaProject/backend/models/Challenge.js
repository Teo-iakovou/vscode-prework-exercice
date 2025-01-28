const mongoose = require("mongoose");

const challengeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    level: { type: String, required: true, enum: ["Easy", "Moderate", "Hard"] },
    code: {
      function_name: { type: String, required: true },
      code_text: [
        {
          language: { type: String, required: true },
          text: { type: String, required: true },
        },
      ],
      inputs: [
        {
          name: { type: String, required: true },
          type: { type: String, required: true },
        },
      ],
    },
    tests: [
      {
        weight: { type: Number, required: true },
        inputs: { type: Array, required: true },
        output: { type: mongoose.Schema.Types.Mixed, required: true },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Challenge", challengeSchema);
