const catchAsync = require('../utils/catchAsync');

exports.allProducts = catchAsync(async (req, res, next) => {
  res.status(200).json({ message: 'Hello You!' });
});
