const express = require("express");
const contractController = require("../controllers/contractController");

const contractRouter = express.Router();

contractRouter.get("/", contractController.getContract);
contractRouter.post("/", contractController.createContract);
contractRouter.put("/:contractId", contractController.updateContract);
contractRouter.delete("/:contractId", contractController.deleteContract);

module.exports = contractRouter;
