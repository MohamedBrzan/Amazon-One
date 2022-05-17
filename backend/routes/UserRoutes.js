const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  register,
  login,
  logout,
  IsLoggedIn,
} = require('../controllers/UserControllers');

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/logged').get(IsLoggedIn);
router.route('/').get(getAllUsers);

module.exports = router;
