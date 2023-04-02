const express = require("express");
const billController = require("../controllers/billController");

const billRouter = express.Router();

billRouter.get("/", billController.getBill);
billRouter.get("/:userId", billController.getTenantDetails);
billRouter.get("/:billID", billController.getSingleBill);
billRouter.post("/", billController.createBill);
billRouter.put("/:billID", billController.updateBill);
billRouter.delete("/:billID", billController.deleteBill);

module.exports = billRouter;
