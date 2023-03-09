const express = require('express');

const CONTENT_TYPE_CONTROLLER = require('../../../controllers/contentTypes');

const router = express.Router();

router.get('/', CONTENT_TYPE_CONTROLLER.getContentTypesList); // fetchList of contentTypes
router.post('/', CONTENT_TYPE_CONTROLLER.createContentType); // create new contentType
router.get('/:id', CONTENT_TYPE_CONTROLLER.getContentById); // fetch contentType by id
router.put('/:id', CONTENT_TYPE_CONTROLLER.updateContentType); // update contentType by id

module.exports = router;
