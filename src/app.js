const express = require("express");
const routesSetup = require("./routes/index");

const configureExpress = () => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  routesSetup(app);
  return app;
};

module.exports = configureExpress;
