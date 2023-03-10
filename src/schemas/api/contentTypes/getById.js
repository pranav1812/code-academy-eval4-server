const joi = require('joi');

const validateGet = (req, res, next) => {
  const schema = joi.object({
    id: joi.string().uuid().required(),
  });
  const { error } = schema.validate(req.params); // req.query, req.params, req.headers
  if (error) return res.status(400).json({ error: error.message });
  return next();
};

module.exports = validateGet;
