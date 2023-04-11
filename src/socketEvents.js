const chatController = require("./controllers/chatController");

const configureSocketEvents = (io) => {
  io.on("connection", (socket) => {
    socket.on("message", (data) => {
      const { conversationId, userId, message } = data;
      socket.to(conversationId).emit("message", {
        conversationId,
        userId,
        message,
      });
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });

  chatController.setIO(io);
};

module.exports = configureSocketEvents;
