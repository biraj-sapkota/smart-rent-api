const mongoose = require("mongoose");

const roomType = {
  Standard: "Standard",
  VIP: "VIP",
  Deluxe: "Deluxe",
  Suite: "Suite",
  Executive: "Executive",
  Family: "Family",
  OceanView: "Ocean View",
  Poolside: "Poolside",
};

const RoomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required."],
    },
    roomImages: {
      type: [String],
      required: [true, "image is required."],
    },
    roomDescription: {
      type: String,
      required: [true, "description is required."],
    },
    roomType: {
      type: String,
      trim: true,
      required: [true, "Room type is required in description."],
      enum: Object.values(roomType),
    },
    numberOfrooms: {
      type: Number,
      trim: true,
      required: [true, "number of rooms is required in description."],
    },
    address: {
      type: String,
      required: [true, "address is required."],
    },
    rentAmount: {
      type: Number,
      trim: true,
      required: [true, "rent amount is required in description."],
    },
    contract: {
      type: [String],
      required: [true, "agreement details is required"],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    tenant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    availability: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = {
  roomType,
  Room: mongoose.model("room", RoomSchema),
};
