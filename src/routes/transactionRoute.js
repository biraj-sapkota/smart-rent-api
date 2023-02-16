const express = require("express");
const transactionController = require("../controllers/transactionController");

const transactionRouter = express.Router();

transactionRouter.get("/", transactionController.getTransaction);
transactionRouter.get(
  "/:transactionId",
  transactionController.getSingleTransaction
);
transactionRouter.post("/", transactionController.createTransaction);
transactionRouter.delete(
  "/:transactionId",
  transactionController.deleteTransaction
);

module.exports = transactionRouter;
