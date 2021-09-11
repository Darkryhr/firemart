const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
// Order model

exports.getOrder = catchAsync(async (req, res, next) => {
  // req.user will hold user Id, use it to point to order
  // use order to find cart
  // use cart to find all products
  // send them back as array of data
});
