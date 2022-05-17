const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const UserSchema = new mongoose.Schema(
  {
    avatar: { type: String, required: [true, 'Please Provide A Avatar'] },
    name: {
      type: String,
      minlength: [3, 'Name Must Be At Least 3 Characters'],
      required: [true, 'Please provide a name'],
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide An Email'],
      validate: [validator.isEmail, 'Please Enter A Valid Email '],
      unique: true,
    },
    password: {
      type: String,
      minlength: [8, 'Password Must Be At Least 8 Characters'],
      required: [true, 'Please Provide A Password'],
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],

    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
      required: [true, 'Please provide a code'],
    },

    cart: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, default: 0 },
        totalAmount: { type: Number, default: 0 },
      },
    ],
  },
  { timestamps: true }
);

UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.EXPIRES_IN,
  });
  return token;
};

module.exports = mongoose.model('User', UserSchema);
