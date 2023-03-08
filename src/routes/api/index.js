const express = require('express');
const { validateUserToken } = require('../../middlewares/authorization');

const router = express.Router();

router.use(validateUserToken);

router.get('/', (req, res) => {
  res.json({ message: 'User route' });
});

module.exports = router;
