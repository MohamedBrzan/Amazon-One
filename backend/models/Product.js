const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: { type: String, required: [true, 'please add a name'] },
    brand: { type: String, required: [true, 'please add a brand name'] },
    code: { type: String, required: [true, 'please add a code'] },
    slug: { type: String, required: [true, 'please add a slug'], unique: true },
    category: { type: String, required: [true, 'please add a category'] },
    description: { type: String, required: [true, 'please add a description'] },
    countInStock: {
      type: Number,
      required: [true, 'please add countInStock'],
      default: 1,
    },
    rating: { type: Number, default: 0 },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    price: { type: Number, required: [true, 'please add a price'] },
    images: { type: Array, required: [true, 'please add images'] },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', ProductSchema);
