const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment');

// When user clicks "Pay with Crypto"
router.post('/create-payment', paymentController.createPayment);

module.exports = router;
