const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Cart = require('../models/Cart');
const CartItem = require('../models/CartItem');
const Product = require('../models/Product');

exports.addToCart = catchAsync(async (req, res, next) => {
  // req.user will hold user Id, use it to point to cart
  // find cart in Cart model by User.id
  const cart = await Cart.find({ customer: req.user._id }).exec();
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

exports.createCart = catchAsync(async (req, res, next) => {
  //TODO: add conditional statement to check if cart exists
  const cart = await Cart.create({
    customer: req.user._id,
  });
  res.status(200).json({ message: 'success', data: { cart } });
});

exports.getCart = catchAsync(async (req, res, next) => {
  const cart = await Cart.find({ customer: req.user._id });
  res.status(200).json({ message: 'success', data: { cart } });
});

exports.updateProduct = catchAsync(async (req, res, next) => {});
