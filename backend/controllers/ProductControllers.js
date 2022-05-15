const Asynchronous = require('../middleWares/Asynchronous');
const Product = require('../models/Product');

// Get All Products
exports.getAllProducts = Asynchronous(async (req, res, next) => {
  const products = await Product.find();
  res.json(products);
});

// Create a new Product
exports.createProduct = Asynchronous(async (req, res, next) => {
  const {
    name,
    code,
    description,
    price,
    slug,
    brand,
    countInStock,
    rating,
    images,
  } = req.body;
  const product = await Product.create({
    name,
    code,
    description,
    price,
    slug,
    brand,
    countInStock,
    rating,
    images,
  });
  res.json(product);
});
