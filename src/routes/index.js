const user = require("./userRoute");

const routesSetup = (app) => {
  app.get("/", (_req, res) => res.send("Welcome - Smart Rent API!!"));
  app.use("/api/user", user);
};

module.exports = routesSetup;
