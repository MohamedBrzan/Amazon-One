const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  register,
  login,
  logout,
  IsLoggedIn,
  userCart,
} = require('../controllers/UserControllers');
const { isAuthenticated } = require('../middleWares/Authentication');

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logged').get(IsLoggedIn);
router.route('/logout').get(logout);
router.route('/users').get(getAllUsers);
router.route('/cart').get(isAuthenticated, userCart);

module.exports = router;
