const express = require("express");
const billController = require("../controllers/billController");

const billRouter = express.Router();

billRouter.get("/", billController.getBill);
billRouter.get("/:billId", billController.getSingleBill);
billRouter.post("/", billController.createBill);
billRouter.put("/:billId", billController.updateBill);
billRouter.delete("/:billId", billController.deleteBill);

module.exports = billRouter;
