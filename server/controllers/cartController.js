const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const User = require('../models/User');
// Cart
// CartItem

exports.addToCart = catchAsync(async (req, res, next) => {
  // req.user will hold user Id, use it to point to cart
  // find cart in Cart model by User.id
  //   create cart item and have it point at said cart
});
