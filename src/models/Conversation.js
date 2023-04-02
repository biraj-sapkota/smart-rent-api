const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
});

conversationSchema.index(
  { ownerId: 1, userId: 1, roomId: 1 },
  { unique: true }
);

const Conversation = mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;
