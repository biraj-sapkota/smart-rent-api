const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema(
  {
    street: {
      type: String,
      trim: true,
      required: [true, "street is required in address."],
    },
    city: {
      type: String,
      trim: true,
      required: [true, "city is required in address."],
    },
    district: {
      type: String,
      trim: true,
      required: [true, "district is required in address."],
    },
  },
  { _id: false }
);

const RoomDescriptionSchema = new mongoose.Schema(
  {
    roomType: {
      type: String,
      trim: true,
      required: [true, "room type is required in description."],
    },
    numberOfrooms: {
      type: Number,
      trim: true,
      required: [true, "number of rooms is required in description."],
    },
    rentAmount: {
      type: Number,
      trim: true,
      required: [true, "rent amount is required in description."],
    },
  },
  { _id: false }
);

const RoomSchema = new mongoose.Schema(
  {
    roomImages: {
      type: String,
      required: [true, "image is required."],
    },
    roomDescription: {
      type: RoomDescriptionSchema,
      required: [true, "description is required."],
    },
    address: {
      type: AddressSchema,
      required: [true, "address is required."],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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

module.exports = mongoose.model("room", RoomSchema);
