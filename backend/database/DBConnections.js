const mongoose = require('mongoose');

const DBConnections = async () => {};
mongoose
  .connect('mongodb://localhost:27017/e-commerce')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err.message));

module.exports = DBConnections;
