const express = require('express');
const REQUEST_VALIDATION = require('../../../schemas/api');

const RECORD_CONTROLLER = require('../../../controllers/records');

const router = express.Router();

router.post(
  '/',
  REQUEST_VALIDATION.records.create,
  RECORD_CONTROLLER.createRecord
); // create new record
router.put(
  '/:id',
  REQUEST_VALIDATION.records.edit,
  RECORD_CONTROLLER.updateRecord
); // update record by id
router.delete(
  '/:id',
  REQUEST_VALIDATION.records.delete,
  RECORD_CONTROLLER.deleteRecord
); // delete record by id

module.exports = router;
