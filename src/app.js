const express = require("express");
const cors = require("cors");
const routesSetup = require("./routes/index");
const corsOptions = require("./config/corsOptions");

const configureExpress = () => {
  const app = express();

  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  routesSetup(app);
  return app;
};

module.exports = configureExpress;
