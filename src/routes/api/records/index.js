const express = require('express');

const RECORD_CONTROLLER = require('../../../controllers/records');

const router = express.Router();

router.post('/', RECORD_CONTROLLER.createRecord); // create new record
router.put('/:id', RECORD_CONTROLLER.updateRecord); // update record by id

module.exports = router;
