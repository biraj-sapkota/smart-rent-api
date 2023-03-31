const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
  {
    members: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
        },
      ],
    },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
    },
  },
  { timestamps: true }
);

const Conversation = mongoose.model("Conversation", ConversationSchema);

module.exports = Conversation;
