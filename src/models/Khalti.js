const mongoose = require("mongoose");

const KhaltiSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    khaltiId: {
      type: String,
      required: [true, "khalti id is required"],
    },
    khaltiAmount: {
      type: Number,
      required: [true, "khalti amount is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("khalti", KhaltiSchema);
