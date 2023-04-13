require("./seed");
const configureExpress = require("./app");
require("dotenv").config();
const socketIO = require("socket.io");
const http = require("http");
const configureSocketEvents = require("./socketEvents");

const startServer = async () => {
  const app = configureExpress();
  const server = http.createServer(app);
  const io = socketIO(server, {
    cors: {
      origin: ["http://localhost:3000", "http://192.168.1.72:3000"],
      credentials: true,
    },
  });

  configureSocketEvents(io);

  server.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`);
  });
};

startServer().catch((err) => {
  console.log(err);
});
