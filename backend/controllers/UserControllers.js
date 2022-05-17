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

// Get All Users
exports.getAllUsers = Asynchronous(async (req, res, next) => {
  const users = await User.find();

  res.json(users);
});

// Check If User Is Logged In
exports.IsLoggedIn = Asynchronous(async (req, res, next) => {
  const { token } = req.cookies;

  if (token) return next(new ErrorHandler('You are already logged in', 200));

  if (!token) return next(new ErrorHandler('Unauthorized', 401));

  next();
});
