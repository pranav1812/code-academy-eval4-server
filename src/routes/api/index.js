const express = require('express');
const { validateUserToken } = require('../../middlewares/authorization');

const router = express.Router();

router.use(validateUserToken);

router.get('/', (req, res) => {
  res.json({ message: 'User route' });
});

router.use('/contentTypes', require('./contentTypes'));
router.use('/records', require('./records'));
router.use('/schemas', require('./schemas'));

module.exports = router;
