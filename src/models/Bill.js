const mongoose = require("mongoose");

const BillSchema = new mongoose.Schema(
  {
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
    },
    generator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    billAmount: {
      type: Number,
      required: [true, "Amount is required."],
    },
    electricityUnits: {
      type: Number,
      required: [true, "Electricity units are required."],
    },
    waterUnits: {
      type: Number,
      required: [true, "Water units are required."],
    },
    garbageRate: {
      type: Number,
      required: [true, "Garbage rate is required."],
    },
    extraCharges: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
    },
    billDate: {
      type: Date,
      default: Date.now,
      get: (date) => {
        return new Date(date).toISOString().slice(0, 7);
      },
    },
    paidStatus: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Bill", BillSchema);
