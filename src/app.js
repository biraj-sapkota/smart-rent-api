const express = require("express");

const configureExpress = () => {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  return app;
};

module.exports = configureExpress;
