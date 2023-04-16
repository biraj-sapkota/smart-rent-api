const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const {
  generateVerificationToken,
  sendVerificationEmail,
} = require("./verificationController");

exports.registerUser = (req, res) => {
  const user = new UserModel(req.body);
  user.verificationToken = generateVerificationToken();
  user.hashPassword = bcrypt.hashSync(req.body.password, 10);
  user.save((err, _data) => {
    if (err) {
      res.status(400).send(err);
    } else {
      sendVerificationEmail(user.email, user.verificationToken);
      return res.json("User Registered with email: " + user.email);
    }
  });
};

exports.addAdmin = (req, res) => {
  const values = req.body;
  const user = new UserModel(values);
  user.hashPassword = bcrypt.hashSync(values.password, 10);
  user.save((err, _data) => {
    if (err) {
      res.status(400).send(err);
    } else {
      return res.json("Admin Added with email: " + user.email);
    }
  });
};

exports.loginUser = (req, res) => {
  UserModel.findOne({ email: req.body.email }, (err, data) => {
    if (err) throw err;

    if (!data) {
      res.status(404).send("User Not Found!!");
    } else if (data) {
      if (!data.comparePassword(req.body.password, data.hashPassword)) {
        res.status(401).send("Wrong Password!!");
      } else {
        if (!data.verified) {
          res.status(403).send("Email not verified. Please verify your email.");
        } else {
          const user = {
            email: data.email,
            userType: data.userType,
            DOB: data.DOB,
            contact: data.contact,
            address: data.address,
            gender: data.gender,
            _id: data.id,
            name: data.name,
            validDocument: data.validDocument,
          };

          jwt.sign(user, process.env.Secret_Key, {}, (err, token) => {
            if (err) throw err;
            res.cookie("token", token).json(user);
          });
        }
      }
    }
  });
};

exports.logoutUser = (req, res) => {
  res.cookie("token", "").json("Logged Out!!");
};

exports.updateUser = async (req, res) => {
  const { userId } = req.body;
  try {
    // Find the user by userId
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.userType = "owner";
    const updatedUser = await user.save();
    res.status(200).json(updatedUser._id);
  } catch (error) {
    console.error("Error approving request:", error);
    res.status(500).json({ error: "Failed to approve user." });
  }
};

exports.rejectOwnershipRequest = async (req, res) => {
  const { userId } = req.body;
  try {
    // Find the user by userId
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.validDocument = null;

    const updatedUser = await user.save();
    res.status(200).json(updatedUser._id);
  } catch (error) {
    console.error("Error approving request:", error);
    res.status(500).json({ error: "Failed to approve user." });
  }
};

exports.deleteUser = (req, res) => {
  UserModel.deleteOne({ _id: req.params.userId }, (err) => {
    if (err) res.status(500).send(err);
    res.send("User Deleted Successfully!!");
  });
};

exports.getUser = (_req, res) => {
  UserModel.find({}, "-hashPassword", (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(data);
    }
  });
};

exports.getOneUser = (req, res) => {
  const { userId } = req.query;
  UserModel.findById(userId, "-hashPassword", (err, data) => {
    if (err) res.status(500).send(err);
    res.json(data);
  });
};

exports.checkUser = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.status(401).send("Unauthorized User!!");
  }
};

exports.getProfile = (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.Secret_Key, {}, async (err, user) => {
      if (err) throw err;
      res.json(user);
    });
  } else {
    res.json(null);
  }
};

exports.requestOwnership = async (req, res) => {
  const { userId, images, remarks } = req.body;
  try {
    // Find the user by userId
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Add the provided images to the validDocument array
    user.validDocument = images;
    user.remarks = remarks;

    // Save the updated user document
    const updatedUser = await user.save();

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error adding valid documents:", error);
    res.status(500).json({ error: "Failed to add valid documents" });
  }
};

exports.updateUserProfile = async (req, res) => {
  const { userId, values } = req.body;
  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!user.comparePassword(values.password, user.hashPassword)) {
      return res.status(401).send("Wrong Password!!");
    }

    user.name = values.name;
    user.DOB = values.DOB;
    user.contact = values.contact;
    user.address = values.address;
    user.gender = values.gender;

    if (values.newPassword) {
      user.hashPassword = bcrypt.hashSync(values.newPassword, 10);
    }
    const updatedUser = await user.save();
    res.status(200).json(updatedUser._id);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Failed to update user." });
  }
};
