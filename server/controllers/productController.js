const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Product = require('../models/Product');
const Category = require('../models/Category');

exports.getAllProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find();
  res.status(201).json({
    status: 'success',
    result: products.length,
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

exports.getCategories = catchAsync(async (req, res, next) => {
  const categories = await Category.find();
  res.status(201).json({
    message: 'success',
    data: {
      categories,
    },
  });
});

exports.updateProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    return next(new AppError('No product found with that ID', 404));
  }

  res.status(200).json({
    message: 'success',
    data: {
      product,
    },
  });
});

exports.createProduct = catchAsync(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      product,
    },
  });
});
