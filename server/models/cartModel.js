const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  customer: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
