const Contract = require("../models/Contract");
const Room = require("../models/Room");
const jwt = require("jsonwebtoken");
const Transaction = require("../models/Transaction");

exports.makeRoomBooking = (req, res) => {
  const { token } = req.cookies;

  if (!token) throw "User Must be logged in";
  try {
    jwt.verify(token, process.env.Secret_Key, {}, async (_err, userData) => {
      const { roomId, ownerId, payload, agreementDetails } = req.body;
      const contract = new Contract({
        tenant: userData._id,
        room: roomId,
        owner: ownerId,
        agreementDetails: agreementDetails,
      });
      const booking = await contract.save();

      const transaction = new Transaction({
        transactionAmount: payload.amount / 0.1,
        payor: userData._id,
        room: roomId,
        receiver: ownerId,
        khalti_idx: payload.idx,
      });
      await transaction.save();

      const room = await Room.findById(roomId);
      room.availability = false;
      room.tenant = userData._id;
      await room.save();

      res.status(200).json(booking);
    });
  } catch (error) {
    console.error("Error booking the room:", error);
    res.status(500).json({ error: "Failed to book the room" });
  }
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
