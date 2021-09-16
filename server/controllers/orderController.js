const catchAsync = require('../utils/catchAsync');
const Cart = require('../models/Cart');
const CartItem = require('../models/CartItem');
const cartController = require('./cartController');
// Order model

exports.getOrder = catchAsync(async (req, res, next) => {
  // req.user will hold user Id, use it to point to order
  // const user = await User.findById(req.user._id);
  // use order to find cart
  const cart = await Cart.find({ customer: req.user._id, active: true }).exec();
  if (cart.length) {
    // use cart to find all products
    const products = await CartItem.find({ cart: cart[0].id }).exec();
    // send them back as array of data
    res.status(200).json({
      message: 'success',
      data: {
        products,
        cart,
      },
    });
  } else {
    const newCart = await Cart.create({ customer: req.user._id, active: true });
    res.status(200).json({
      message: 'success',
      data: {
        newCart,
      },
    });
  }
});

exports.completeOrder = catchAsync(async (req, res, next) => {
  const cart = await Cart.updateOne(
    { customer: req.user._id, active: true },
    { active: false }
  );
  res.status(200).json({ message: 'success' });
});
