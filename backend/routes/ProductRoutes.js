const express = require('express');
const { getAllProducts, createProduct } = require('../controllers/ProductControllers');
const router = express.Router();

router.route('/products').get(getAllProducts).post(createProduct);

module.exports = router;
