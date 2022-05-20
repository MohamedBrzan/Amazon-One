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
  let {
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

  const user = await User.findById(req.user._id)
    .populate({
      path: 'cart.product',
    })
    .populate('products');

  if (!user) return next(new ErrorHandler('Please Login First', 404));

  let product = await Product.findOne({ slug: req.params.slug });

  if (!product) return next(new ErrorHandler('Product not found', 404));

  if (countInStock <= 0 && price <= 0) {
    countInStock = product.countInStock;
    price = product.price;
  } else if (name === '' || name === undefined) {
    name = product.name;
  } else if (brand === '' || brand === undefined) {
    brand = product.brand;
  } else if (code === '' || code === undefined) {
    code = product.code;
  } else if (category === '' || category === undefined) {
    category = product.category;
  } else if (description === '' || description === undefined) {
    description = product.description;
  } else if (countInStock <= 0 || countInStock === undefined) {
    countInStock = product.countInStock;
  } else if (price <= 0 || price === undefined) {
    price = product.price;
  } else if (countInStock <= 0 && price <= 0) {
    countInStock = product.countInStock;
    price = product.price;
  }

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
    },
    {
      new: true,
      runValidators: true,
    }
  ).then(async (product) => {
    user.products.forEach((item) => {
      if (item._id.toString() === product._id.toString()) {
        item.name = product.name;
        item.brand = product.brand;
        item.code = product.code;
        item.slug = product.slug;
        item.category = product.category;
        item.description = product.description;
        item.countInStock = product.countInStock;
        item.price = product.price;
        item.images = product.images;
      }
    });

    await user.save();
  });

  res.json({ success: true, product, user });
});

// Delete a Product
exports.deleteProduct = Asynchronous(async (req, res, next) => {
  const user = await User.findById(req.user._id)
    .populate({
      path: 'cart.product',
    })
    .populate('products');

  if (!user) return next(new ErrorHandler('Please Login First', 500));

  const product = await Product.findOne({ slug: req.params.slug });

  if (!product) return next(new ErrorHandler('Product not found', 404));

  user.products.pull(product._id);

  await user.save();

  await Product.findOneAndDelete({ slug: req.params.slug });

  res.json({ success: true, message: 'Product deleted', user });
});

// Add Product to Cart And Increase Quantity
exports.addToCartAndIncreaseQuantity = Asynchronous(async (req, res, next) => {
  const { quantity, slug } = req.body;

  const user = await User.findById(req.user._id)
    .populate({
      path: 'cart.product',
    })
    .populate('products');

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
      user,
      found,
    });
  } else {
    user.cart.push({
      product,
      quantity: quantity ? quantity : 1,
      totalAmount: quantity ? product.price * quantity : product.price,
    });

    await user.save();

    return res.json({
      success: true,
      message: 'Product added to cart',
      cart: user.cart,
      user,
    });
  }
});

// Add Product to Cart And Decrease Quantity
exports.addToCartAndDecreaseQuantity = Asynchronous(async (req, res, next) => {
  const { quantity, slug } = req.body;

  const user = await User.findById(req.user._id)
    .populate({
      path: 'cart.product',
    })
    .populate('products');
  if (!user) return next(new ErrorHandler('Please Login First', 500));

  const product = await Product.findOne({ slug });

  if (!product) return next(new ErrorHandler('Product not found', 404));

  const found = user.cart.find(
    (item) => item.product._id.toString() === product._id.toString()
  );

  found.quantity -= 1;

  found.totalAmount = found.quantity * product.price;

  if (found.quantity < quantity) {
    return next(
      new ErrorHandler('Cannot Decrease This Number From Product Quantity', 404)
    );
  }
  await user.save();
  return res.json({
    success: true,
    message: 'Product updated in cart',
    cart: user.cart,
    user,
    found,
  });
});

// Remove Product from Cart
exports.removeFromCart = Asynchronous(async (req, res, next) => {
  const { slug } = req.body;
  const user = await User.findById(req.user._id)
    .populate({
      path: 'cart.product',
    })
    .populate('products');

  if (!user) return next(new ErrorHandler('Please Login First', 500));

  const product = await Product.findOne({ slug });

  if (!product) return next(new ErrorHandler('Product not found', 404));

  const found = user.cart.find(
    (item) => item.product._id.toString() === product._id.toString()
  );

  if (!found) return next(new ErrorHandler('Product not found in cart', 404));

  user.cart.pull(found);

  await user.save();

  res.json({ success: true, message: 'Product removed from cart', user });
});

// Get Shipping Products
exports.shippingProducts = Asynchronous(async (req, res, next) => {
  const user = await User.findById(req.user._id)
    .populate({
      path: 'cart.product',
    })
    .populate('products');

  if (!user) return next(new ErrorHandler('Please Login First', 500));

  const cartProducts = user.cart.map((item) => item.product);

  if (!cartProducts.length)
    return next(new ErrorHandler('No products in cart', 404));

  const { fullName, address, city, state, zip, country, phone } = req.body;

  const products = user.cart;

  user.shipping.push({
    fullName,
    address,
    city,
    state,
    zip,
    country,
    phone,
    shippingItems: products,
  });

  user.cart = [];

  await user.save();

  res.json({
    success: true,
    message: 'Shipping data added',
    shipping: user.shipping,
    user,
  });
});
