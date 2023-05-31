const UserModel = require("../models/User");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
require("dotenv").config();

const generateVerificationToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

const sendVerificationEmail = (email, token) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.Google_UserName,
      pass: process.env.Google_Password,
    },
  });

  const verificationLink = `${process.env.Front_URL}/verify-email?token=${token}`;

  const mailOptions = {
    from: process.env.Google_UserName,
    to: email,
    subject: "Email Verification",
    html: `<p>Please click the following link to verify your email: <a href="${verificationLink}">${verificationLink}</a></p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending verification email:", error);
    } else {
      console.log("Verification email sent:", info.response);
    }
  });
};

const verifyEmail = (req, res) => {
  const { token } = req.body;
  UserModel.findOne({ verificationToken: token }, (err, user) => {
    if (err) {
      res.status(500).json({ error: "Internal Server Error" });
    } else if (!user) {
      res.status(400).json({ error: "Invalid verification token" });
    } else {
      user.verified = true;
      user.verificationToken = "";
      user.save((err) => {
        if (err) {
          res.status(500).json({ error: "Internal Server Error" });
        } else {
          res.status(200).json({ message: "Email verified successfully" });
        }
      });
    }
  });
};

module.exports = {
  generateVerificationToken,
  sendVerificationEmail,
  verifyEmail,
};
