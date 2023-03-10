const joi = require('joi');

const validateCreate = (req, res, next) => {
  const schema = joi
    .object({
      name: joi.string().required(),
      schema: joi
        .object({
          schema: joi.object().required(),
        })
        .required(),
    })
    .required();
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.message });
  return next();
};

module.exports = validateCreate;
