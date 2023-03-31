const RoomBooking = require("../models/RoomBooking");
const Room = require("../models/Room");
const jwt = require("jsonwebtoken");

exports.makeRoomBooking = (req, res) => {
  const { token } = req.cookies;

  if (!token) throw "User Must be logged in";
  jwt.verify(token, process.env.Secret_Key, {}, async (err, userData) => {
    if (err) throw err;
    const { room } = req.body;
    await RoomBooking.create({ user: userData._id, room })
      .then((doc) => {
        Room.findOneAndUpdate(
          { _id: room },
          { availability: false },
          { new: true }
        ).then(() => {
          res.json(doc);
        });
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
  try {
    const userData = jwt.verify(token, process.env.Secret_Key);
    const roomBookings = await RoomBooking.find({
      user: userData._id,
    }).populate("room");
    res.json(roomBookings);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.getSingleRoomBooking = (req, res) => {
  RoomBooking.findById(req.params.roomBookingID, (err, data) => {
    if (err) res.status(500).send(err);
    res.json(data);
  });
};
