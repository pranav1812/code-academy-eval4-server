const joi = require('joi');

const validateCreate = (req, res, next) => {
  const schema = joi.object({
    contentTypeId: joi.string().uuid().required(),
    record: joi.object().required(),
  });
  const { error } = schema.validate(req.body); // req.query, req.params, req.headers
  if (error) return res.status(400).json({ error: error.message });
  return next();
};

module.exports = validateCreate;
