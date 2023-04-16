const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userType = {
  Admin: "admin",
  Tenant: "tenant",
  Owner: "owner",
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
      default: userType.Tenant,
    },
    validDocument: {
      type: String,
    },
    remarks: {
      type: String,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.comparePassword = (password, hashPassword) => {
  return bcrypt.compareSync(password, hashPassword);
};

module.exports = mongoose.model("user", UserSchema);
