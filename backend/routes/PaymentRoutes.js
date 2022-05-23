const express = require('express');
const { getClientId } = require('../controllers/Payment.js');
const { isAuthenticated } = require('../middleWares/Authentication');
const router = express.Router();

router.route('/').get(isAuthenticated, getClientId);

module.exports = router;
