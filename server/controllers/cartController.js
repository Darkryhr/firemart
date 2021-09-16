const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Cart = require('../models/Cart');
const CartItem = require('../models/CartItem');

exports.addToCart = catchAsync(async (req, res, next) => {
  // req.user will hold user Id, use it to point to cart
  // find cart in Cart model by User.id
  const cart = await Cart.find({ customer: req.user._id, active: true }).exec();
  // req should contain the whole product object
  //   create cart item and have it point at said cart
  const { amount, product, price } = req.body;
  // CartItem.exists(
  //   filter query that checks the product id and cart id, if true, then route to updateCart
  // )

  const newItem = await CartItem.create({
    product,
    amount: amount,
    price: price,
    cart: cart[0]._id,
  });
  res.status(200).json({
    message: 'success',
    data: {
      newItem,
    },
  });
});

exports.getCart = catchAsync(async (req, res, next) => {
  // * check if active cart exists
  const activeCart = await Cart.find({ customer: req.user._id, active: true });
  if (activeCart) {
    res.status(200).json({ message: 'success', data: { cart: activeCart } });
  } else {
    // * check if any cart exists
    const anyCart = await Cart.find({ customer: req.user._id });
    // * need to create a new cart either way
    const newCart = await Cart.create({ customer: req.user._id });
    if (anyCart) {
      // * send new cart, for existing user
      res.status(200).json({ message: 'success', data: { cart: newCart } });
    } else {
      // * no cart exists, new user
      res.status(200).json({ message: 'success', data: { cart: newCart } });
    }
  }
});

// exports.getCart = catchAsync(async (req, res, next) => {
//   const cart = await Cart.find({ customer: req.user._id, active: true });
//   if (cart) {
//     res.status(200).json({ message: 'success', data: { cart } });
//   } else {
//     // * no active cart found, should happen after a purchase is complete
//     const newCart = await Cart.create({ customer: req.user._id });
//     res.status(200).json({ message: 'success', data: { newCart } });
//   }
// });

exports.updateProduct = catchAsync(async (req, res, next) => {});

exports.getCartSum = catchAsync(async (req, res, next) => {
  const carts = await Cart.find();
  res.status(201).json({
    message: 'success',
    data: carts.length,
  });
});
