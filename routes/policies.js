const express = require('express');
const router = express.Router();

router.get('/privacy', (req, res) => {
    res.render('policies/privacyPolicy');
});

router.get('/terms', (req, res) => {
    res.render('policies/termsAndConditions');
});

router.get('/refund', (req, res) => {
    res.render('policies/refundPolicy');
});

router.get('/shipping', (req, res) => {
    res.render('policies/shippingPolicy');
});

router.get('/contact', (req, res) => {
    res.render('policies/contactUs');
});

module.exports = router;
