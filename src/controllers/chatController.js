// Import required modules
const Chat = require("../models/Chat");
const Conversation = require("../models/Conversation");
const jwt = require("jsonwebtoken");

let io;

const findConversation = async (req, res, next) => {
  const { roomId, ownerId, userId } = req.query;
  let conversation = await Conversation.findOne({
    members: { $all: [ownerId, userId] },
    room: roomId,
  }).populate("members");
  console.log(conversation);
  if (conversation) {
    req.conversationId = conversation._id;
    next();
  }
};

const createConversation = async (req, res, next) => {
  let conversation = await Conversation.findOne({
    members: { $all: [req.body.ownerId, req.body.userId] },
    room: req.body.roomId,
  }).populate("members");
  console.log(conversation);
  if (!conversation) {
    const newConversation = new Conversation({
      members: [req.body.ownerId, req.body.userId],
      room: req.body.roomId,
    });
    try {
      newConversation.save().then(async (savedConversation) => {
        await savedConversation.populate("members");

        req.conversationId = savedConversation._id;
        res.status(200).json(savedConversation);
        next();
      });
    } catch (err) {
      console.log(err);
      res.status(400).json(err.message);
    }
  } else {
    req.conversationId = conversation._id;
    next();
  }
};

// Post a new message
const postMessage = async (req, res) => {
  const { userId, message } = req.body;
  const conversationId = req.conversationId;
  try {
    // Create a new chat message
    const chat = new Chat({
      conversationId,
      sender: userId,
      message,
    });

    // Save the chat message
    const savedMessage = await chat.save();

    // Emit the message event to all sockets in the conversation
    io.in(conversationId).emit("message", {
      conversationId,
      userId,
      message: savedMessage.message, // Use the 'message' property of the saved message
    });

    // Send the saved message as the response
    res.json(savedMessage);
  } catch (error) {
    console.error("Error posting message:", error);
    res.status(500).json({ error: "Failed to post message" });
  }
};

const setIO = (socketIO) => {
  io = socketIO;
};

// Get messages for a conversation
const getMessages = async (req, res) => {
  const conversationId = req.conversationId;
  console.log(conversationId);
  try {
    // Retrieve all chat messages for the given conversation
    const messages = await Chat.find({
      conversationId,
    });
    res.json(messages);
  } catch (error) {
    console.error("Error getting messages:", error);
    res.status(500).json({ error: "Failed to get messages" });
  }
};

const verifyToken = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ error: "Token not found" });
  }

  try {
    const decoded = jwt.verify(token, process.env.Secret_Key);
    req.userData = decoded;
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = {
  postMessage: [verifyToken, postMessage],
  getMessages: [verifyToken, getMessages],
  createConversation,
  findConversation,
  setIO,
};
