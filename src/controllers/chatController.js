// Import required modules
const Chat = require("../models/Chat");
const Conversation = require("../models/Conversation");
const jwt = require("jsonwebtoken");

let io;

const findConversation = async (req, _res, next) => {
  const { roomId, ownerId, userId } = req.query;
  let conversation = await Conversation.findOne({
    ownerId,
    userId,
    roomId,
  });
  if (conversation) {
    req.conversationId = conversation._id;
    next();
  }
};

const createConversation = async (req, res, next) => {
  try {
    const conversation = await Conversation.findOneAndUpdate(
      {
        ownerId: req.body.ownerId,
        userId: req.body.userId,
        roomId: req.body.roomId,
      },
      {},
      { upsert: true, new: true }
    );

    req.conversationId = conversation._id;
    next();
  } catch (err) {
    console.log(err);
    res.status(400).json(err.message);
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
    res.json(savedMessage);
    // Emit the message event to all sockets in the conversation
    io.in(conversationId).emit("message", {
      conversationId,
      userId,
      message: savedMessage.message, // Use the 'message' property of the saved message
    });
  } catch (error) {
    console.error("Error posting message:", error);
    return res.status(500).json({ error: "Failed to post message" });
  }
};

const setIO = (socketIO) => {
  io = socketIO;
};

// Get messages for a conversation
const getMessages = async (req, res) => {
  const conversationId = req.conversationId;
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
