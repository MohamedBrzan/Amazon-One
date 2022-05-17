const express = require('express');
const { getAllProducts } = require('../controllers/ProductControllers.js');
const { createProduct } = require('../controllers/ProductControllers.js');
const { isAuthenticated } = require('../middleWares/Authentication');
const router = express.Router();

router.route('/').get(getAllProducts);
router.route('/new').post(isAuthenticated, createProduct);

module.exports = router;
