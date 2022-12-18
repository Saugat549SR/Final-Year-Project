const { sendOTPVerificationEmail } = require('./sendEmail');
var bcrypt = require('bcryptjs');
const UserOTPVerification = require('../models/UserOTPVerification');
const router = require('express').Router();
const { User, validate } = require('../models/user');

router.post('/verifyOTP', async (req, res) => {
  try {
    let { userId, otp } = req.body;
    if (!userId || !otp) {
      throw Error('Empty otp details are not allowed');
    } else {
      const UserOTPVerificationRecords = await UserOTPVerification.find({
        userId,
      });
      if (UserOTPVerificationRecords.length <= 0) {
        //no record found
        throw new Error(
          "Account record doesn't exist or has been verified already. please sign up or log in."
        );
      } else {
        const { expiresAt } = UserOTPVerificationRecords[0];
        const hashedOTP = UserOTPVerificationRecords[0].otp;

        if (expiresAt < Date.now()) {
          await UserOTPVerification.deleteMany({ userId });
          throw new Error('Code has expired. please request again.');
        } else {
          const validOTP = await bcrypt.compare(otp, hashedOTP);

          if (!validOTP) {
            throw new Error('Invalid code passed. Check yor inbox.');
          } else {
            // await User.updateOne({ _id: userId }, { verified: true });
            await UserOTPVerification.deleteMany({ userId });
            res.json({
              status: 'VERIFIED',
              message: `User email verified Successfully.`,
            });
          }
        }
      }
    }
  } catch (error) {
    res.json({
      status: 'FAILED',
      message: error.message,
    });
  }
});

router.post('/register', async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (user)
      return res
        .status(409)
        .send({ message: 'User with given email already Exist!' });

    // const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const salt = 10;
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    req.body.password = hashPassword;
    const savedUser = new User(req.body);

    await sendOTPVerificationEmail(
      { _id: savedUser._id, email: savedUser.email },
      res
    );

    const ss = await savedUser.save();
    return res.status(201).send({
      user: ss,
      message: 'User created successfully',
    });
  } catch (error) {
    return res.status(500).send({
      msg: error.message,
      message: 'Internal Server Error',
    });
  }
});

module.exports = router;