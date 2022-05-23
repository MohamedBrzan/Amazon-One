const Asynchronous = require('../middleWares/Asynchronous');
const ErrorHandler = require('../middleWares/ErrorHandler');
const Order = require('../models/Order');
const User = require('../models/User');

// Get All Orders
exports.getAllOrders = Asynchronous(async (req, res, next) => {
  const orders = await Order.find();
  res.status(200).json(orders);
});

// Get Order By Id
exports.findOrder = Asynchronous(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order)
    return next(
      new ErrorHandler(`Order with id ${req.params.id} not found`, 404)
    );
  res.status(200).json(order);
});

// Great Order
exports.createOrder = Asynchronous(async (req, res, next) => {
  const { fullName, address, state, country, city, zip, phone, status } =
    req.body;
  const user = await User.findById(req.user._id)
    .populate({
      path: 'cart.product',
    })
    .populate('products');

  if (!user) return next(new ErrorHandler('Please Login First', 500));

  const cartProducts = user.cart.map((item) => item.product);

  if (!cartProducts.length)
    return next(new ErrorHandler('No products in cart', 404));

  const products = user.cart;

  const totalPrice = products.reduce((sum, item) => sum + item.totalAmount, 0);

  console.log(totalPrice);

  const newOrder = {
    user,
    fullName,
    address,
    state,
    country,
    city,
    zip,
    phone,
    products,
    totalPrice,
    status,
  };

  const order = await Order.create(newOrder);

  res.json({
    success: true,
    message: 'Order added Successfully',
    user,
    order,
  });
});

// Get User Orders
exports.getUserOrders = Asynchronous(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user) return next(new ErrorHandler('User not found', 404));

  const orders = await Order.find({ user: req.user._id })
    .populate('user')
    .populate({
      path: 'products.product',
    });

  res.status(200).json(orders);
});

// Delete Order
exports.deleteOrder = Asynchronous(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order)
    return next(
      new ErrorHandler(`Order with id ${req.params.id} not found`, 404)
    );

  await order.remove();

  res.json({
    success: true,
    message: 'Order deleted Successfully',
  });
});
