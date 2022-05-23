const express = require('express');
const {
  getAllProducts,
  findProduct,
  updateProduct,
  deleteProduct,
  addToCartAndIncreaseQuantity,
  addToCartAndDecreaseQuantity,
  removeFromCart,
} = require('../controllers/ProductControllers.js');
const { createProduct } = require('../controllers/ProductControllers.js');
const { isAuthenticated } = require('../middleWares/Authentication');
const router = express.Router();

router.route('/new').post(isAuthenticated, createProduct);
router
  .route('/all')
  .get(getAllProducts)
  .post(isAuthenticated, addToCartAndIncreaseQuantity)
  .put(isAuthenticated, addToCartAndDecreaseQuantity)
  .delete(isAuthenticated, removeFromCart);
router
  .route('/:slug')
  .post(findProduct)
  .put(isAuthenticated, updateProduct)
  .delete(isAuthenticated, deleteProduct);

module.exports = router;
