const express = require("express");
const chatController = require("../controllers/chatController");

const chatRouter = express.Router();

chatRouter.get(
  "/",
  chatController.findConversation,
  chatController.getMessages
);
chatRouter.post(
  "/",
  chatController.createConversation,
  chatController.postMessage
);

module.exports = chatRouter;
