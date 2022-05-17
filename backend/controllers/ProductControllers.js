const Asynchronous = require('../middleWares/Asynchronous');
const ErrorHandler = require('../middleWares/ErrorHandler');
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

  const owner = await User.findById(req.user._id);

  let product = await Product.findOne({ slug });

  if (product) return next(new ErrorHandler('Product already exists', 400));

  product = await Product.create({
    owner,
    name,
    brand,
    code,
    slug,
    category,
    description,
    countInStock,
    price,
    images,
  }).then(async (product) => {
    owner.products.push(product);
    await owner.save();
    res.status(200).json({ success: true, product });
  });
});

// Find A Product
exports.findProduct = Asynchronous(async (req, res, next) => {
  const product = await Product.findOne({ slug: req.params.slug });

  if (!product) return next(new ErrorHandler('Product not found', 404));

  res.json({ success: true, product });
});

// Update a Product
exports.updateProduct = Asynchronous(async (req, res, next) => {
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

  let product = await Product.findOne({ slug: req.params.slug });

  if (!product) return next(new ErrorHandler('Product not found', 404));

  product = await Product.findOneAndUpdate(
    { slug: req.params.slug },
    {
      name,
      brand,
      code,
      slug,
      category,
      description,
      countInStock,
      price,
      images,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.json({ success: true, product });
});

// Delete a Product
exports.deleteProduct = Asynchronous(async (req, res, next) => {
  const product = await Product.findOne({ slug: req.params.slug });

  if (!product) return next(new ErrorHandler('Product not found', 404));

  const productOwner = await User.findById(product.owner._id.toString());

  productOwner.products.pull(product._id);

  await productOwner.save();

  await Product.findOneAndDelete({ slug: req.params.slug });

  res.json({ success: true, message: 'Product deleted' });
});

// Add Product to Cart
exports.addToCart = Asynchronous(async (req, res, next) => {
  const { quantity, slug } = req.body;

  const user = await User.findById(req.user._id);

  if (!user) return next(new ErrorHandler('Please Login First', 500));

  const product = await Product.findOne({ slug });

  if (!product) return next(new ErrorHandler('Product not found', 404));

  const found = user.cart.find(
    (item) => item.product._id.toString() === product._id.toString()
  );

  if (found) {
    found.quantity += quantity ? quantity : 1;

    found.totalAmount = found.quantity * product.price;

    if (found.quantity > product.countInStock) {
      return next(
        new ErrorHandler('Product out of stock will be available soon', 404)
      );
    }
    await user.save();
    return res.json({
      success: true,
      message: 'Product updated in cart',
      found,
    });
  } else {
    user.cart.push({
      product,
      quantity: quantity ? quantity : 1,
      totalAmount: quantity ? product.price * quantity : product.price,
    });

    await user.save();

    return res.json({ success: true, message: 'Product added to cart' });
  }
});

// Remove Product from Cart
exports.removeFromCart = Asynchronous(async (req, res, next) => {
  const { slug } = req.body;
  const user = await User.findById(req.user._id);

  if (!user) return next(new ErrorHandler('Please Login First', 500));

  const product = await Product.findOne({ slug });

  if (!product) return next(new ErrorHandler('Product not found', 404));

  const found = user.cart.find(
    (item) => item.product._id.toString() === product._id.toString()
  );

  if (!found) return next(new ErrorHandler('Product not found in cart', 404));

  user.cart.pull(found);

  await user.save();

  res.json({ success: true, message: 'Product removed from cart' });
});
