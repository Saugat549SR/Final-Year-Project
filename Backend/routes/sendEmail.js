const router = require('express').Router();

//password handler
var bcrypt = require('bcryptjs');

//user model
const UserOTPVerification = require('../models/UserOTPVerification');

//email handler
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  host: process.env.HOST,
  service: process.env.SERVICE,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Ready for messages');
    console.log(success);
  }
});

//signup
// router.post('/signup', (req, res));

const sendOTPVerificationEmail = async ({ _id, email }, res) => {
  try {
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
    console.log(otp);
    const mailOptions = {
      from: process.env.USER,
      to: email,
      subject: 'Verify Your Email',
      html: `<p>Enter <b>${otp}</b> in the app to verify your email address and complete the site</p>
      <p>This code <b>Expires in 1 hour</b>.</p>`,
    };

    const hashedOTP = await bcrypt.hash(otp, 10);
    const newOTPVerification = await new UserOTPVerification({
      userId: _id,
      otp: hashedOTP,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000,
    });
    console.log(newOTPVerification);
    //save otp record
    await newOTPVerification.save();
    await transporter.sendMail(mailOptions);
    res.json({
      status: 'PENDING',
      message: 'Verification otp email sent',
      data: {
        userId: _id,
        email,
      },
    });
  } catch (error) {
    return res.json({
      status: 'FAILED',
      message: error.message,
    });
  }
};

//resend OTP
router.post('/resendOTPVerification', async (req, res) => {
  try {
    let { userId, email } = req.body;

    if (!userId || !email) {
      throw Error('Empty user details are not allowed');
    } else {
      await UserOTPVerification.deleteMany({ userId });
      sendOTPVerificationEmail({ _id: userId, email }, res);
    }
  } catch (error) {
    res.json({
      status: 'FAILED',
      message: error.message,
    });
  }
});

module.exports = { sendOTPVerificationEmail };