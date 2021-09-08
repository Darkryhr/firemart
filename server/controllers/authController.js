const jwt = require('jsonwebtoken');
const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { promisify } = require('util');

const signToken = (id) =>
  jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

exports.signUp = catchAsync(async (req, res, next) => {
  const { email, password, name, city, street } = req.body;
  const newUser = await User.create({
    // allows only needed data in new user, i.e can't sign in as admin
    email,
    password,
    role: 'user',
    name,
    city,
    street,
  });
  // const token = signToken(newUser._id);
  res.status(201).json({
    status: 'success',
    // token,
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  // check if user exists && password is correct
  const user = await User.findOne({ email: email });

  if (!user || !(await user.correctPassword(password, user.password)))
    return next(new AppError('Incorrect email or password', 401));

  // send token to client if correct
  const token = signToken(user._id);
  res.status(200).json({ status: 'success', token, id: user._id });
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
  console.log('TOKEN: ' + req.headers.authorization);
  if (!token) return next(new AppError('You are not  logged in', 401));
  // verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // check if user exists
  const freshUser = await User.findById(decoded.id);
  if (!freshUser)
    return next(
      new AppError('The user belonging to this token no longer exists', 401)
    );

  // grant access to protected route, relevant when implementing admin privliges
  req.user = freshUser;
  next();
});
