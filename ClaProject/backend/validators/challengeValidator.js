const Joi = require("joi");

const validateChallenge = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    category: Joi.string().required(),
    description: Joi.string().required(),
    level: Joi.string().valid("Easy", "Moderate", "Hard").required(),
    code: Joi.object({
      function_name: Joi.string().required(),
      code_text: Joi.array()
        .items(
          Joi.object({
            language: Joi.string().required(),
            text: Joi.string().required(),
          })
        )
        .required(),
      inputs: Joi.array()
        .items(
          Joi.object({
            name: Joi.string().required(),
            type: Joi.string().required(),
          })
        )
        .required(),
    }).required(),
    tests: Joi.array()
      .items(
        Joi.object({
          weight: Joi.number().required(),
          inputs: Joi.array().required(),
          output: Joi.any().required(),
        })
      )
      .required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};

module.exports = { validateChallenge };
