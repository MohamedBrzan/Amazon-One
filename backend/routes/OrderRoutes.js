const express = require('express');
const {
  createOrder,
  getAllOrders,
  findOrder,
  getUserOrders,
  deleteOrder,
} = require('../controllers/OrderControllers.js');
const { isAuthenticated } = require('../middleWares/Authentication');
const router = express.Router();

router.route('/user').get(isAuthenticated, getUserOrders);
router.route('/').get(isAuthenticated, getAllOrders);
router
  .route('/:id')
  .get(isAuthenticated, findOrder)
  .delete(isAuthenticated, deleteOrder);
router.route('/new').post(isAuthenticated, createOrder);

module.exports = router;
