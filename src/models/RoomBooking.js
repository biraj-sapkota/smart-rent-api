const mongoose = require("mongoose");

const RoomBookingSchema = new mongoose.Schema(
  {
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "room",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    // contract: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Contract",
    // },
    // transaction: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Transaction",
    // },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("roomBooking", RoomBookingSchema);
