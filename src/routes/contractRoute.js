const express = require("express");
const contractController = require("../controllers/contractController");

const contractRouter = express.Router();

contractRouter.get("/", contractController.getContract);
contractRouter.get("/signed", contractController.getContracts);
contractRouter.post("/", contractController.createContract);
contractRouter.put("/:contractID", contractController.updateContract);
contractRouter.delete("/:contractID", contractController.deleteContract);

module.exports = contractRouter;
