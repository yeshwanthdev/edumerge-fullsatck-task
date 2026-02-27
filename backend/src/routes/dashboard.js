const express = require('express');
const { getAllottedSeats, getProgramSeats, getAdmissionDetails } = require('@controller/dashboard.js');

const router = express.Router();

router.get('/getAllottedSeats', getAllottedSeats);
router.get('/getProgramSeats', getProgramSeats);
router.get('/getAdmissionDetails', getAdmissionDetails);

module.exports = router;
