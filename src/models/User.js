const mongoose = require("mongoose");

const userType = {
  Admin: "admin",
  Tenant: "tenant",
  Owner: "owner",
  Visitor: "visitor",
};

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      min: 5,
      required: [true, "Name is required"],
      trim: true,
    },
    DOB: {
      type: Date,
      trim: true,
      required: [true, "Date of Birth is required"],
    },
    contact: {
      type: Number,
      required: [true, "Contact is required"],
      unique: true,
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    gender: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    hashPassword: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      default: userType.Visitor,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", UserSchema);
