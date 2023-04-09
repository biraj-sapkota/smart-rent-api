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
chatRouter.post("/owner", chatController.postMessageByOwner);
chatRouter.get("/owner", chatController.getConversation);

module.exports = chatRouter;
