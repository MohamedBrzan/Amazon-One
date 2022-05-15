const Asynchronous = require('../middleWares/Asynchronous');
const User = require('../models/User');
const SendToken = require('../utils/SendToken');

// Register
exports.register = Asynchronous(async (req, res, next) => {
  const { name, email, password } = req.body;

  let user = await User.findOne({ email }).select('+password');

  if (user) return res.status(400).json({ message: 'User already exists' });

  user = await User.create({ name, email, password });

  SendToken(res, 201, user);
});

// Login
exports.login = Asynchronous(async (req, res, next) => {
  const { email, password } = req.body;

  let user = await User.findOne({ email }).select('+password');

  if (!user) return res.status(400).json({ message: 'User does not exist' });

  const isMatch = await user.matchPassword(password);

  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

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
