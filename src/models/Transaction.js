const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
  {
    transactionAmount: {
      type: Number,
      required: [true, "amount is required."],
    },
    payor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    bill: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bill",
    },
    khalti: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Khalti",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("transaction", TransactionSchema);
