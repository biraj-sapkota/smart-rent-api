const express = require("express");
const roomController = require("../controllers/roomController");

const roomRouter = express.Router();

roomRouter.get("/", roomController.getRoom);
roomRouter.get("/:roomId", roomController.getOneRoom);
roomRouter.post("/", roomController.createRoom);
roomRouter.put("/:roomId", roomController.updateRoom);
roomRouter.delete("/:roomId", roomController.deleteRoom);

module.exports = roomRouter;
