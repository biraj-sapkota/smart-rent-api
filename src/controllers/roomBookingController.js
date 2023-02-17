const RoomBooking = require("../models/RoomBooking");

exports.makeRoomBooking = (req, res) => {
  const roomBooking = new RoomBooking(req.body);

  roomBooking
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((_err) => {
      res.status(500).send("Unable to make the booking.");
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

exports.getRoomBooking = (_req, res) => {
  RoomBooking.find({}, (err, data) => {
    if (err) res.status(500).send(err);
    res.json(data);
  });
};

exports.getSingleRoomBooking = (req, res) => {
  RoomBooking.findById(req.params.roomBookingID, (err, data) => {
    if (err) res.status(500).send(err);
    res.json(data);
  });
};
