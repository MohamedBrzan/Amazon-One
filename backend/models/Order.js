const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'please select a user'],
    },
    fullName: {
      type: String,
      minlength: [3, 'Name Must Be At Least 3 Characters'],
      required: [true, 'Please provide a fullName'],
      trim: true,
      lowercase: true,
    },
    address: {
      type: String,
      required: [true, 'Please Provide An Address'],
      trim: true,
      lowercase: true,
    },
    state: {
      type: String,
      required: [true, 'Please Provide A State'],
      trim: true,
      lowercase: true,
    },
    country: {
      type: String,
      required: [true, 'Please Provide A Country'],
      trim: true,
      lowercase: true,
    },
    city: {
      type: String,
      required: [true, 'Please Provide A City'],
      trim: true,
      lowercase: true,
    },
    zip: {
      type: Number,
      required: [true, 'Please Provide A Zip'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Please Provide A Phone Number'],
      trim: true,
      lowercase: true,
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: [true, 'please select a product'],
        },
        quantity: {
          type: Number,
          required: [true, 'please select a quantity'],
        },
        totalAmount: {
          type: Number,
          required: [true, 'please select a totalAmount'],
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: [true, 'please select a totalPrice'],
    },
    status: {
      type: String,
      enum: ['pending', 'paid', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
      required: [true, 'please select a status'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
