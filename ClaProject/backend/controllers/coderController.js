const updateProfile = require("../services/coderService");

const updateCoderProfile = async (req, res) => {
  try {
    const coderId = req.user.id; // Extract from token
    const updatedCoder = await updateProfile(coderId, req.body, req.file);
    res.json({ success: true, coder: updatedCoder });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { updateCoderProfile };
