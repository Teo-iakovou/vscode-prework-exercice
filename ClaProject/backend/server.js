const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { connectDB } = require("./utils/db");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./graphql/schema");
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
app.use(
  "/graphql",
  graphqlHTTP((req) => {
    let user = null;
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      user = jwt.verify(token, process.env.JWT_SECRET);
    }
    return { schema, context: { user } };
  })
);
// Error Handling Middleware
app.use(require("./utils/errorHandler"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
