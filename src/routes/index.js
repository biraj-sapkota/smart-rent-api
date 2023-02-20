const user = require("./userRoute");
const room = require("./roomRoute");
const bill = require("./billRoute");
const contract = require("./contractRoute");
const transaction = require("./transactionRoute");
const roomBooking = require("./roomBookingRoute");

const routesSetup = (app) => {
  app.get("/", (_req, res) => res.send("Welcome - Smart Rent API!!"));
  app.use("/api/user", user);
  app.use("/api/room", room);
  app.use("/api/bill", bill);
  app.use("/api/contract", contract);
  app.use("/api/transaction", transaction);
  app.use("/api/roombooking", roomBooking);
};

module.exports = routesSetup;
