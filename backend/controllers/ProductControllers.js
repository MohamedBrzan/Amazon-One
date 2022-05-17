const Asynchronous = require('../middleWares/Asynchronous');
const Product = require('../models/Product');
const User = require('../models/User');

// Get All Products
exports.getAllProducts = Asynchronous(async (req, res, next) => {
  const products = await Product.find();
  res.json({ success: 'true', products });
});

// Create a new Product
exports.createProduct = Asynchronous(async (req, res, next) => {
  const {
    name,
    brand,
    code,
    slug,
    category,
    description,
    countInStock,
    price,
    images,
  } = req.body;

  const product = await Product.create({
    owner: req.user._id,
    name,
    brand,
    code,
    slug,
    category,
    description,
    countInStock,
    price,
    images,
  });

  res.status(200).json({ success: true, product });
});
