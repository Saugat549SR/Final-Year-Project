const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please Enter product Name'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please Enter product Description'],
  },
  price: {
    type: Number,
    required: [true, 'Please Enter product Price'],
    maxLength: [8, 'Price cannot exceed 8 characters'],
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, 'please Enter product category'],
  },
  Stock: {
    type: Number,
    required: [true, 'Please Enter product Stock'],
    maxLength: [1, 'Stock cannot exceed 1 characters'],
    default: 1,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAT: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model('Product', productSchema);
