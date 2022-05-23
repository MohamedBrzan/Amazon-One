const Asynchronous = require('../middleWares/Asynchronous');
const ErrorHandler = require('../middleWares/ErrorHandler');
const Product = require('../models/Product');
const User = require('../models/User');
const SendToken = require('../utils/SendToken');

// Register
exports.register = Asynchronous(async (req, res, next) => {
  const {
    avatar,
    fullName,
    email,
    password,
    reenterPassword,
    address,
    state,
    country,
    city,
    zip,
    phone,
  } = req.body;

  let user = await User.findOne({ email }).select('+password');

  if (user) return next(new ErrorHandler('User Already Registered', 401));

  if (password !== reenterPassword)
    return next(new ErrorHandler('Password Does Not Match', 401));

  user = await User.create({
    avatar,
    fullName,
    email,
    password,
    address,
    state,
    country,
    city,
    zip,
    phone,
  });

  SendToken(res, 201, user);
});

// Login
exports.login = Asynchronous(async (req, res, next) => {
  const { email, password } = req.body;

  let user = await User.findOne({ email })
    .select('+password')
    .populate({
      path: 'cart.product',
    })

    .populate('products');

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

  const user = await User.findOne({ token })
    .populate({
      path: 'cart.product',
    })

    .populate('products');

  if (!user) return next(new ErrorHandler('Unauthorized', 401));

  res.json({ success: true, message: 'Successfully Logged In', user });
});

// Get All Users
exports.getAllUsers = Asynchronous(async (req, res, next) => {
  const users = await User.find()
    .populate({
      path: 'cart.product',
    })

    .populate('products');

  res.json(users);
});

// Get User
exports.getUser = Asynchronous(async (req, res, next) => {
  const user = await User.findById(req.user._id)
    .populate({
      path: 'cart.product',
    })

    .populate('products');

  if (!user) return next(new ErrorHandler('Please Login First', 404));

  res.json(user);
});

// User Cart
exports.userCart = Asynchronous(async (req, res, next) => {
  const user = await User.findById(req.user._id)
    .populate({
      path: 'cart.product',
    })

    .populate('products');

  if (!user) return next(new ErrorHandler('Please Login First', 500));

  res.json(user.cart);
});

// Delete User Cart
exports.deleteUserCart = Asynchronous(async (req, res, next) => {
  const user = await User.findById(req.user._id)
    .populate({
      path: 'cart.product',
    })

    .populate('products');

  if (!user) return next(new ErrorHandler('Please Login First', 500));

  user.cart = [];

  await user.save();

  res.json({ cart: user.cart, user });
});
