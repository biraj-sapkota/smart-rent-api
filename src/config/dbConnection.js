const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("strictQuery", false);

const connectToMongo = () => {
  mongoose
    .connect(process.env.mongoURI, {
      useNewUrlParser: true,
    })
    .then(() => {
      console.log("Successful Connection to Database.");
    })
    .catch((_err) => {
      console.log("Can't Connect to Database!!");
      process.exit();
    });
};

module.exports = connectToMongo;
