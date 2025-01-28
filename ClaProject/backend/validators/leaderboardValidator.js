const Joi = require("joi");

const validateTopKCoders = (req, res, next) => {
  const schema = Joi.object({
    k: Joi.number().integer().positive().required(),
  });

  const { error } = schema.validate(req.query);
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};

module.exports = { validateTopKCoders };
