const express = require('express');

const {
  getAllUsers,
  register,
  login,
  logout,
} = require('../controllers/UserControllers');
const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/users').get(getAllUsers);

module.exports = router;
