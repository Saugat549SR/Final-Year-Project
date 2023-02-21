const ErrorHandler = require('../utils/errorhandler');
const cloudinary = require('cloudinary');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const catchAsyncErrors = require('../middleware/catchAsyncError');
const tokenSend = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

//Register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  // if (!req.body.avatar) {
  //   console.error('Error: no avatar image provided');
  //   return res.status(400).json({ message: 'No avatar image provided' });
  // }

  // const cloudInary = await cloudinary.v2.uploader.upload(req.body.avatar, {
  //   folder: 'register',
  //   width: 150,
  //   crop: 'scale',
  // });

  // if (!cloudInary) {
  //   console.error('Error: failed to upload image to Cloudinary');
  //   return res
  //     .status(500)
  //     .json({ message: 'Error uploading image to Cloudinary' });
  // }

  // console.log(cloudInary);

  const { firstName, lastName, email, password } = req.body;

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    avatar: {
      // public_id: cloudInary.public_id,
      // url: cloudInary.secure_url,
      public_id: 'sample Id',
      url: 'dpUrl',
    },
  });

  const token = jwt.sign({ id: user._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: '1d',
  });

  const verifyLink = `${req.protocol}://${req.get(
    'host'
  )}/api/users/verify/${token}`;

  const message = `Please click the following link to verify your email: \n\n ${verifyLink}`;
  try {
    await sendEmail({
      email: user.email,
      subject: `Email Verification`,
      message,
    });
    res.status(200).json({
      sucess: true,
      message: `Email sent to ${user.email} sucessfully`,
    });
  } catch (error) {
    console.error('Error sending verification email:', error);
    res.status(500).json({
      success: false,
      message: 'Error sending verification email. Please try again later',
    });
  }
});
//verify user
exports.verifyUser = async (req, res) => {
  const { token } = req.params;
  try {
    const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
    const user = await User.findByIdAndUpdate(
      decoded.id,
      { isVerified: true },
      { new: true, runValidators: true }
    );
    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'User not found',
      });
    }

    res.redirect('http://localhost:3000/login?verified=true');
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid token',
    });
  }
};

//login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  //if user has benn given both email and password
  if (!email || !password) {
    return next(new ErrorHandler('Please enter email and password', 400));
  }
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new ErrorHandler('Invalid email or password', 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler('Invalid email or password', 401));
  }

  tokenSend(user, 200, res);
});

//Logout

exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: 'logged out',
  });
});

//forgot Password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler('User not found', 404));
  }

  const tokenReset = user.getResetPassToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    'host'
  )}/api/users/password/reset/${tokenReset}`;

  const message = `Your password reset Token is: \n\n ${resetPasswordUrl}`;
  try {
    await sendEmail({
      email: user.email,
      subject: `Password Recovery`,
      message,
    });

    res.status(200).json({
      sucess: true,
      message: `Email sent to ${user.email} sucessfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});

//reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  //creating token hash
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        'Reset Password token is invalid or has been expired',
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler('Password does not match', 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  tokenSend(user, 200, res);
});

//get user details
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

//update user password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler('Old password is incorrect', 400));
  }
  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler('Password does not match', 400));
  }

  user.password = req.body.newPassword;
  await user.save();
  tokenSend(user, 200, res);
});

//update Profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
  };

  //we will add cloudniary later

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
  });
});

//get all users (admin can look user details)
exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });
});

//get single users (admin can look user details)
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorHandler(`user does not exists with id: ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

//update User Role --Admin
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
  });
});

//Delete User -Admin
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id);
  //we will remove cloudniary later

  if (!user) {
    return next(
      new ErrorHandler(`User does not exits with Id: ${req.params.id}`)
    );
  }
  await user.remove();

  res.status(200).json({
    success: true,
    message: 'User Deleted Successfully',
  });
});
