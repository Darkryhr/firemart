const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const User = require('../models/User');

exports.getUser = catchAsync(async (req, res, next) => {
  // get user data
  const user = await User.findById(req.params.id);
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});
