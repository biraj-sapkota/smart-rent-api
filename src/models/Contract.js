const mongoose = require("mongoose");

const ContractSchema = new mongoose.Schema(
  {
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    tenant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    agreementDetails: {
      type: String,
      required: [true, "agreement details is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("contract", ContractSchema);
