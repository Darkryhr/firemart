const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Product = require('../models/Product');

exports.getAllProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find();
  res.status(201).json({
    status: 'success',
    data: {
      products,
    },
  });
});

exports.getProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  res.status(201).json({
    status: 'success',
    data: {
      product,
    },
  });
});
