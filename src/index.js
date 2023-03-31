const connectToMongo = require("./config/dbConnection");
const configureExpress = require("./app");
require("dotenv").config();
const chatController = require("./controllers/chatController");
const socketIO = require("socket.io");
const http = require("http");

const startServer = async () => {
  await connectToMongo();

  const app = configureExpress();
  const server = http.createServer(app);
  const io = socketIO(server);
  chatController.setIO(io);

  server.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`);
  });
};

startServer().catch((err) => {
  console.log(err);
});
