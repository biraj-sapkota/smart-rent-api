const UserModel = require("../models/User");
require("dotenv").config();

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
