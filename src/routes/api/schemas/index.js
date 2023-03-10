const express = require('express');
const REQUEST_VALIDATION = require('../../../schemas/api');

const SCHEMA_CONTROLLER = require('../../../controllers/schemas');

const router = express.Router();

// creation of new schemas will be along with the creation of new contentTypes
router.put(
  '/:id',
  REQUEST_VALIDATION.schemas.update,
  SCHEMA_CONTROLLER.updateSchema
); // update schema by id
router.put(
  '/:id/updateFieldName',
  REQUEST_VALIDATION.schemas.updateFields,
  SCHEMA_CONTROLLER.updateFieldName
);

module.exports = router;
