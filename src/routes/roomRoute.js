const express = require("express");
const roomController = require("../controllers/roomController");

const roomRouter = express.Router();

roomRouter.get("/", roomController.getRoom);
roomRouter.get("/:roomID", roomController.getOneRoom);
roomRouter.post("/", roomController.createRoom);
roomRouter.put("/:roomID", roomController.updateRoom);
roomRouter.delete("/:roomID", roomController.deleteRoom);

module.exports = roomRouter;
