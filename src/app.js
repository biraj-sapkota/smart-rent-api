const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const routesSetup = require("./routes/index");
// const corsOptions = require("./config/corsOptions");

const configureExpress = () => {
  const app = express();

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
  app.use(express.json());
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true }));

  app.use((req, _res, next) => {
    if (
      req.headers &&
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "bearer"
    ) {
      jwt.verify(
        req.headers.authorization.split(" ")[1],
        process.env.Secret_Key,
        (err, data) => {
          if (err) req.user = undefined;

          req.user = data;
          next();
        }
      );
    } else {
      req.user = undefined;
      next();
    }
  });

  routesSetup(app);
  return app;
};

module.exports = configureExpress;
