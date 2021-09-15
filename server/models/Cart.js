const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
  {
    customer: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
    },
  },
  {
    active: {
      type: Boolean,
      default: true,
    },
  }
);

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
