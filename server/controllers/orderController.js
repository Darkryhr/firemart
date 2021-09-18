const catchAsync = require('../utils/catchAsync');
const Cart = require('../models/Cart');
const CartItem = require('../models/CartItem');
const cartController = require('./cartController');
const Order = require('../models/Order');
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
  // * find relevant cart and set to inactive
  const cart = await Cart.findOneAndUpdate(
    { customer: req.user._id, active: true },
    { active: false },
    { new: true }
  );
  // * get all items associated with cart
  const cartItems = await CartItem.find({ cart: cart._id });
  // * calculate sum of products
  const sumTotal = cartItems
    .map((item) => {
      return +item.price * +item.amount;
    })
    .reduce((acc, a) => acc + a, 0);
  // * create order doc
  const order = await Order.create({
    customer: req.user._id,
    cart: cart._id,
    price: sumTotal,
    address: req.body.city + ', ' + req.body.street,
    deliveryDate: req.body.delivery,
    orderedAt: req.body.orderedAt,
    creditCardDigits: req.body.credit,
  });
  // * send it back so user can print invoice
  res.status(200).json({
    message: 'success',
    data: {
      order,
    },
  });
});

exports.getInvoice = catchAsync(async (req, res, next) => {
  console.log(req.params.id);
  const order = await Order.findById(req.params.id).exec();
  res.status(200).json({
    message: 'success',
    data: {
      order,
    },
  });
});
