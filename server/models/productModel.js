const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A product must have a name'],
    unique: true,
    trim: true,
    maxlength: [
      40,
      'A product name must have less or equal then 20 characters',
    ],
    minlength: [10, 'A product name must have more or equal then 5 characters'],
  },
  category: String,
  price: {
    type: Number,
    required: [true, 'A product must have a price'],
  },
  image: String,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
