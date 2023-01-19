const routesSetup = (app) => {
  app.get("/", (_req, res) => res.send("Welcome - Smart Rent API!!"));
};

module.exports = routesSetup;
