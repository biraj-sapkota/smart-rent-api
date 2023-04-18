const mongoose = require("mongoose");

const KhaltiSchema = new mongoose.Schema(
  {
    idx: {
      type: String,
      required: [true, "khalti idx is required"],
    },
    user: {
      type: String,
      required: [true, "User is required"],
    },
    paymentType: {
      type: String,
      required: [true, "payment type is required"],
    },
    token: {
      type: String,
      required: [true, "token is required"],
    },
    amount: {
      type: Number,
      required: [true, "khalti amount is required"],
    },
    paidDate: {
      type: Date,
      required: [true, "paid date is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("khalti", KhaltiSchema);
