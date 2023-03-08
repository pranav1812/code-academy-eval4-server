const express = require('express');
const { validateAdminToken } = require('../../middlewares/authorization');

const router = express.Router();

router.use(validateAdminToken);

router.get('/', (req, res) => {
  res.json({ message: 'Admin route' });
});

module.exports = router;
