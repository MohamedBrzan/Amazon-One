const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'please add a name'] },
  email: {
    type: String,
    required: [true, 'please add an email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'please add a password'],
    minlength: 6,
  },
  role: {
    type: String,
    enum: ['user', 'publisher', 'admin'],
    default: 'user',
  },
  resetToken: String,
  resetTokenExpiration: Date,
  cart: {
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
        },
        quantity: { type: Number, required: [true, 'please add a quantity'] },
      },
    ],
  },

  history: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
      quantity: { type: Number, required: [true, 'please add a quantity'] },
      date: { type: Date, default: Date.now() },
    },
  ],

  payment: [
    {
      name: { type: String, required: [true, 'please add a name'] },
      cardNumber: {
        type: String,
        required: [true, 'please add a card number'],
      },
      expiryDate: {
        type: String,
        required: [true, 'please add an expiry date'],
      },
      cvv: { type: String, required: [true, 'please add a cvv'] },
      zipCode: { type: String, required: [true, 'please add a zip code'] },
      date: { type: Date, default: Date.now() },
    },
  ],

  order: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
      name: { type: String, required: [true, 'please add a name'] },
      price: { type: Number, required: [true, 'please add a price'] },
      quantity: { type: Number, required: [true, 'please add a quantity'] },
      date: { type: Date, default: Date.now() },
    },
  ],

  address: [
    {
      name: { type: String, required: [true, 'please add a name'] },
      address: { type: String, required: [true, 'please add an address'] },
      city: { type: String, required: [true, 'please add a city'] },
      state: { type: String, required: [true, 'please add a state'] },
      zipCode: { type: String, required: [true, 'please add a zip code'] },
      date: { type: Date, default: Date.now() },
    },
  ],

  orderHistory: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
      name: { type: String, required: [true, 'please add a name'] },
      price: { type: Number, required: [true, 'please add a price'] },
      quantity: { type: Number, required: [true, 'please add a quantity'] },
      date: { type: Date, default: Date.now() },
    },
  ],

  orderAddress: [
    {
      name: { type: String, required: [true, 'please add a name'] },
      address: { type: String, required: [true, 'please add an address'] },
      city: { type: String, required: [true, 'please add a city'] },
      state: { type: String, required: [true, 'please add a state'] },
      zipCode: { type: String, required: [true, 'please add a zip code'] },
      date: { type: Date, default: Date.now() },
    },
  ],

  orderPayment: [
    {
      name: { type: String, required: [true, 'please add a name'] },
      cardNumber: {
        type: String,
        required: [true, 'please add a card number'],
      },
      expiryDate: {
        type: String,
        required: [true, 'please add an expiry date'],
      },
      cvv: { type: String, required: [true, 'please add a cvv'] },
      zipCode: { type: String, required: [true, 'please add a zip code'] },
      date: { type: Date, default: Date.now() },
    },
  ],

  orderReview: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
      name: { type: String, required: [true, 'please add a name'] },
      price: { type: Number, required: [true, 'please add a price'] },
      quantity: { type: Number, required: [true, 'please add a quantity'] },
      date: { type: Date, default: Date.now() },
    },
  ],
});
