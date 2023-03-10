const joi = require('joi');

const validateUpdate = (req, res, next) => {
  let schema = joi.object({
    name: joi.string().required(), // there's nothing else to update
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.message });
  schema = joi.object({
    id: joi.string().uuid().required(),
  });
  const { error: error2 } = schema.validate(req.params);
  if (error2) return res.status(400).json({ error: error.message });
  return next();
};

module.exports = validateUpdate;
