const express = require("express");
const transactionController = require("../controllers/transactionController");

const transactionRouter = express.Router();

transactionRouter.get("/", transactionController.getTransaction);
transactionRouter.get(
  "/:transactionID",
  transactionController.getSingleTransaction
);
transactionRouter.post("/", transactionController.createTransaction);
transactionRouter.delete(
  "/:transactionID",
  transactionController.deleteTransaction
);

module.exports = transactionRouter;
