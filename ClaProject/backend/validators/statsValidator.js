const Joi = require("joi");

const validateHeatmapQuery = (req, res, next) => {
  const schema = Joi.object({
    start_date: Joi.date().required(),
    end_date: Joi.date().required(),
  });

  const { error } = schema.validate(req.query);
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};

module.exports = { validateHeatmapQuery };
