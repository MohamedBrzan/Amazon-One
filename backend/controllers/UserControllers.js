const Asynchronous = require('../middleWares/Asynchronous');
const ErrorHandler = require('../middleWares/ErrorHandler');
const User = require('../models/User');
const SendToken = require('../utils/SendToken');

// Register
exports.register = Asynchronous(async (req, res, next) => {
  const { avatar, name, email, password } = req.body;

  let user = await User.findOne({ email }).select('+password');

  if (user) return next(new ErrorHandler('User Already Registered', 401));

  user = await User.create({ avatar, name, email, password });

  SendToken(res, 201, user);
});

// Login
exports.login = Asynchronous(async (req, res, next) => {
  const { email, password } = req.body;

  let user = await User.findOne({ email }).select('+password');

  if (!user) return next(new ErrorHandler('User Does Not Exist', 401));

  const isMatch = await user.matchPassword(password);

  if (!isMatch) return next(new ErrorHandler('Invalid Email or Password', 401));

  SendToken(res, 200, user);
});

// Logout
exports.logout = Asynchronous(async (req, res, next) => {
  res.clearCookie('token');

  res.json({ message: 'Successfully logged out' });
});

// Check If User Is Logged In
exports.IsLoggedIn = Asynchronous(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) return next(new ErrorHandler('Unauthorized', 401));

  const user = await User.findOne({ token });

  if (!user) return next(new ErrorHandler('Unauthorized', 401));

  res.json({ success: true, message: 'Successfully Logged In', user });
});

// Get All Users
exports.getAllUsers = Asynchronous(async (req, res, next) => {
  const users = await User.find();

  res.json(users);
});

// User Cart
exports.userCart = Asynchronous(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user) return next(new ErrorHandler('Please Login First', 500));

  res.json(user.cart);
});
