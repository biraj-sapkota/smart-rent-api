require("./seed");
const configureExpress = require("./app");
require("dotenv").config();
const http = require("http");

const startServer = async () => {
  const app = configureExpress();
  const server = http.createServer(app);
  
  server.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`);
  });
};

startServer().catch((err) => {
  console.log(err);
});
