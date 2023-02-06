const user = require("./userRoute");
const room = require("./roomRoute");

const routesSetup = (app) => {
  app.get("/", (_req, res) => res.send("Welcome - Smart Rent API!!"));
  app.use("/api/user", user);
  app.use("/api/room", room);
};

module.exports = routesSetup;
