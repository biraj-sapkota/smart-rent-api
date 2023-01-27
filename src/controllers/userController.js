const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
require("dotenv").config();

exports.registerUser = (req, res) => {
  const user = new UserModel(req.body);
  user.hashPassword = bcrypt.hashSync(req.body.password, 10);
  user.save((err, data) => {
    if (err) {
      res.status(400).send(err);
    } else {
      return res.json(data);
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
        res.send("Logged In");
      }
    }
  });
};

exports.updateUser = (req, res) => {
  UserModel.findOneAndUpdate(
    { _id: req.params.userID },
    req.body,
    { new: true, useFindAndModify: false },
    (err, data) => {
      if (err) res.status(500).send(err);
      res.json(data);
    }
  );
};

exports.deleteUser = (req, res) => {
  UserModel.deleteOne({ _id: req.params.userID }, (err) => {
    if (err) res.status(500).send(err);
    res.send("User Deleted Successfully!!");
  });
};

exports.getUser = (_req, res) => {
  UserModel.find({}, (err, data) => {
    if (err) res.status(500).send(err);
    res.json(data);
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
