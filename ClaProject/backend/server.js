const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { connectDB } = require("./utils/db");

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
connectDB();

// Routes

app.use("/api/auth", require("./routes/auth"));
app.use("/api/challenges", require("./routes/challenges"));
app.use("/api/leaderboard", require("./routes/leaderboard"));
app.use("/api/stats", require("./routes/stats"));
app.use("/api/submissions", require("./routes/submissions"));

// Error Handling Middleware
app.use(require("./utils/errorHandler"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
