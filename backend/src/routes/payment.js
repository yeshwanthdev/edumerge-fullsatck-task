const express = require('express');
const { paginate, update } = require('@controller/payment.js');

const router = express.Router();

router.get('/', paginate);
router.put('/:code', update);

module.exports = router;
