const express = require('express');
const REQUEST_VALIDATION = require('../../../schemas/api');

const CONTENT_TYPE_CONTROLLER = require('../../../controllers/contentTypes');

const router = express.Router();

router.get(
  '/',
  REQUEST_VALIDATION.contentType.list,
  CONTENT_TYPE_CONTROLLER.getContentTypesList
); // fetchList of contentTypes
router.post(
  '/',
  REQUEST_VALIDATION.contentType.create,
  CONTENT_TYPE_CONTROLLER.createContentType
); // create new contentType
router.get(
  '/:id',
  REQUEST_VALIDATION.contentType.getById,
  CONTENT_TYPE_CONTROLLER.getContentById
); // fetch contentType by id
router.put(
  '/:id',
  REQUEST_VALIDATION.contentType.updateMeta,
  CONTENT_TYPE_CONTROLLER.updateContentType
); // update contentType by id

module.exports = router;
