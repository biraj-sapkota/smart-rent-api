const RoomBooking = require("../models/RoomBooking");
const jwt = require("jsonwebtoken");

exports.makeRoomBooking = (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, process.env.Secret_Key, {}, async (err, userData) => {
    if (err) throw err;
    const { room } = req.body;
    RoomBooking.create({ user: userData._id, room })
      .then((doc) => {
        res.json(doc);
      })
      .catch((err) => {
        throw err;
      });
  });
};

exports.updateRoomBooking = (req, res) => {
  RoomBooking.findOneAndUpdate(
    { _id: req.params.roomBookingID },
    req.body,
    { new: true, useFindAndModify: false },
    (err, data) => {
      if (err) res.status(500).send(err);
      res.json(data);
    }
  );
};

exports.deleteRoomBooking = (req, res) => {
  RoomBooking.deleteOne({ _id: req.params.roomBookingID }, (err) => {
    if (err) res.status(500).send(err);
    res.send("RoomBooking cancelled Successfully!!");
  });
};

exports.getRoomBooking = async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, process.env.Secret_Key, {}, async (err, userData) => {
    if (err) throw err;
    res.json(await RoomBooking.find({ user: userData._id }).populate("room"));
  });
};

exports.getSingleRoomBooking = (req, res) => {
  RoomBooking.findById(req.params.roomBookingID, (err, data) => {
    if (err) res.status(500).send(err);
    res.json(data);
  });
};
