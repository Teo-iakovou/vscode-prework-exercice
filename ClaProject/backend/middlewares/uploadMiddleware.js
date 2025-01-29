const multer = require("multer");

const uploadMiddleware = multer({
  storage: multer.memoryStorage(), // In-memory storage
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size (5MB)
});

module.exports = uploadMiddleware;
