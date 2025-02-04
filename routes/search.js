const express = require('express');
const router = express.Router();
const { searchListings } = require('../controllers/search');

router.get('/', searchListings);

module.exports = router;
