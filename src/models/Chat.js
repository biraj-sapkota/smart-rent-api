const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema(
  {
    user1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    user2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    message: {
      type: String,
      required: [true, "message is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("chat", ChatSchema);
