const express = require('express');
const { create, paginate, update, remove, getByCode } = require('@controller/seatMatrix.js');

const router = express.Router();

router.post('/', create);
router.get('/', paginate);
router.delete('/:code', remove);
router.put('/:code', update);
router.get('/:code', getByCode);

module.exports = router;
