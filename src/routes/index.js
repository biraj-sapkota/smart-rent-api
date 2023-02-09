const user = require("./userRoute");
const room = require("./roomRoute");
const bill = require("./billRoute");

const routesSetup = (app) => {
  app.get("/", (_req, res) => res.send("Welcome - Smart Rent API!!"));
  app.use("/api/user", user);
  app.use("/api/room", room);
  app.use("/api/bill", bill);
};

module.exports = routesSetup;
