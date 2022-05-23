const Asynchronous = require('../middleWares/Asynchronous');

// Get Client Id
exports.getClientId = Asynchronous(async (req, res, next) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});
