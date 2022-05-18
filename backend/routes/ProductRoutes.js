const express = require('express');
const {
  getAllProducts,
  findProduct,
  updateProduct,
  deleteProduct,
  addToCart,
  removeFromCart,
  shippingProducts,
} = require('../controllers/ProductControllers.js');
const { createProduct } = require('../controllers/ProductControllers.js');
const { isAuthenticated } = require('../middleWares/Authentication');
const router = express.Router();

router
.route('/all')
.get(getAllProducts)
.post(isAuthenticated, addToCart)
.delete(isAuthenticated, removeFromCart);
router.route('/new').post(isAuthenticated, createProduct);
router.route('/shipping').post(isAuthenticated, shippingProducts);
router
.route('/:slug')
.post(findProduct)
.put(isAuthenticated, updateProduct)
.delete(isAuthenticated, deleteProduct);

module.exports = router;
