const express = require("express");
const roomBookingController = require("../controllers/roomBookingController");

const roomBookingRouter = express.Router();

roomBookingRouter.get("/", roomBookingController.getRoomBooking);
roomBookingRouter.get("/:roomBookingID", roomBookingController.getSingleRoomBooking);
roomBookingRouter.post("/", roomBookingController.makeRoomBooking);
roomBookingRouter.put("/:roomBookingID", roomBookingController.updateRoomBooking);
roomBookingRouter.delete("/:roomBookingID", roomBookingController.deleteRoomBooking);

module.exports = roomBookingRouter;