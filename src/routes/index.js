const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send('Final Eval Server');
});

router.use('/api', require('./api'));
router.use('/admin', require('./admin'));

module.exports = router;
