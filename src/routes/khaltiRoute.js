const express = require("express");
const { getKhaltiDetails } = require("../controllers/khaltiController");

const khaltiRouter = express.Router();

khaltiRouter.get("/", getKhaltiDetails);

module.exports = khaltiRouter;
