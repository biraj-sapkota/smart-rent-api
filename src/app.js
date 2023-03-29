const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const routesSetup = require("./routes/index");
// const corsOptions = require("./config/corsOptions");
var cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const configureExpress = () => {
  const app = express();

  app.use(
    cors({
      origin: ["http://localhost:3000", " http://192.168.1.72:3000"],
      credentials: true,
    })
  );
  app.use("/uploads", express.static(__dirname + "/controllers/uploads"));
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
