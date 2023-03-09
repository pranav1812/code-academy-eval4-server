const express = require('express');

const SCHEMA_CONTROLLER = require('../../../controllers/schemas');

const router = express.Router();

// creation of new schemas will be along with the creation of new contentTypes
router.put('/:id', SCHEMA_CONTROLLER.updateSchema); // update schema by id

module.exports = router;
