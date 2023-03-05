const express = require("express");
const roomController = require("../controllers/roomController");

const roomRouter = express.Router();

roomRouter.get("/", roomController.getRoom);
roomRouter.get("/user-room", roomController.getRoomByUser);
roomRouter.post("/upload-by-link", roomController.uploadPhotoByLink);
roomRouter.post(
  "/upload",
  roomController.photosMiddleware.array("photos", 10),
  roomController.uploadPhoto
);
roomRouter.get("/:roomID", roomController.getOneRoom);
roomRouter.post("/", roomController.createRoom);
roomRouter.put("/:roomID", roomController.updateRoom);
roomRouter.delete("/:roomID", roomController.deleteRoom);

module.exports = roomRouter;
