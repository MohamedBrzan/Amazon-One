const Asynchronous = require('./Asynchronous');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.isAuthenticated = Asynchronous(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) return res.status(500).json({ message: 'Unauthorized' });

  const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);

  req.user = await User.findById(verified._id);

  next();
});
