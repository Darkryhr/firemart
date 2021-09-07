const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { promisify } = require('util');

const signToken = (id) =>
  jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

exports.signUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    // allows only needed data in new user, i.e can't sign in as admin
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    role: req.body.role,
  });
  console.log(newUser);
  const token = signToken(newUser._id);
  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  // check if user exists && password is correct
  const user = await User.findOne({ email: email }).select('+password');
  if (!user || !(await user.correctPassword(password, user.password)))
    return next(new AppError('Incorrect email or password', 401));

  // send token to client if correct
  const token = signToken(user._id);
  res.status(200).json({ status: 'success', token });
});

exports.protect = catchAsync(async (req, res, next) => {
  // get and check token
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) return next(new AppError('You are not  logged in', 401));
  // verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // check if user exists
  const freshUser = await User.findById(decoded.id);
  if (!freshUser)
    return next(
      new AppError('The user belonging to this token no longer exists', 401)
    );
  // check if user changed password after token was issued
  if (freshUser.changedPasswordAfter(decoded.iat))
    return next(
      new AppError('User recently changed password, please log in again', 401)
    );

  // grant access to protected route
  req.user = freshUser;
  next();
});

// * wrap in function so that you can pass parameters into middleware
exports.restrictTo =
  (...roles) =>
  (req, res, next) => {
    // roles ['admin', 'lead-guide']. role='user'
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }

    next();
  };
