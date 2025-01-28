const Joi = require("joi");

const validateSubmission = (req, res, next) => {
  const schema = Joi.object({
    challengeId: Joi.string().required(),
    lang: Joi.string().valid("py", "js").required(),
    code: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};

module.exports = { validateSubmission };
