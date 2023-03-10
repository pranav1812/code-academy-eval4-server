const joi = require('joi');

const validateListRequest = (req, res, next) => {
  const schema = joi.object({});
  const { error } = schema.validate(req.query);
  if (error) return res.status(400).json({ error: error.message });
  return next();
};

module.exports = validateListRequest;
