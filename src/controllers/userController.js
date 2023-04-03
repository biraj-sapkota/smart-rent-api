const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const Cloudinary = require("../Cloudinary");
const fs = require("fs");

exports.registerUser = (req, res) => {
  const user = new UserModel(req.body);
  user.hashPassword = bcrypt.hashSync(req.body.password, 10);
  user.save((err, data) => {
    if (err) {
      res.status(400).send(err);
    } else {
      return res.json("User Registered with email: " + user.email);
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
        jwt.sign(
          {
            email: data.email,
            userType: data.userType,
            DOB: data.DOB,
            contact: data.contact,
            address: data.address,
            gender: data.gender,
            _id: data.id,
            name: data.name,
            validDocument: data.validDocument,
          },
          process.env.Secret_Key,
          {},
          (err, token) => {
            if (err) throw err;
            res.cookie("token", token).json(data);
          }
        );
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

exports.deleteUser = (req, res) => {
  UserModel.deleteOne({ _id: req.params.userID }, (err) => {
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
  UserModel.findById(req.params.userID, (err, data) => {
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
