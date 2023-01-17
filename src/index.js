const connectToMongo = require("./config/dbConnection");
const configureExpress = require("./app");
require("dotenv").config();

const startServer = async () => {
  await connectToMongo();

  const app = configureExpress();
  app.listen(process.env.port, () => {
    console.log(`Server running at http://localhost:${process.env.port}`);
  });
};

startServer().catch((err) => {
  console.log(err);
});
