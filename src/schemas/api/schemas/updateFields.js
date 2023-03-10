const joi = require('joi');

const validateSignup = (req, res, next) => {
  let schema = joi.object({
    id: joi.string().uuid().required(),
  });
  const { error } = schema.validate(req.params); // req.query, req.params, req.headers
  if (error) return res.status(400).json({ error: error.message });
  schema = joi.object({
    oldName: joi.string().required(),
    newName: joi.string(),
  });
  const { error: error2 } = schema.validate(req.body); // req.query, req.params, req.headers
  if (error2) return res.status(400).json({ error: error2.message });
  return next();
};

module.exports = validateSignup;
