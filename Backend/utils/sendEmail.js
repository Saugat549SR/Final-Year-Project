const nodeMailer = require('nodemailer');

const sendEmail = async (Options) => {
  const transporter = nodeMailer.createTransport({
    service: process.env.SERVICE,
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });
  const mailOptions = {
    from: process.env.USER,
    to: Options.email,
    subject: Options.subject,
    text: Options.message,
  };

  await transporter.sendMail(mailOptions);
};
module.exports = sendEmail;
