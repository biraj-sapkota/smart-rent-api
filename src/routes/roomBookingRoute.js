const express = require("express");
const roomBookingController = require("../controllers/roomBookingController");

const roomBookingRouter = express.Router();

roomBookingRouter.get("/", roomBookingController.getRoomBooking);
roomBookingRouter.get("/:roomBookingId", roomBookingController.getSingleRoomBooking);
roomBookingRouter.post("/", roomBookingController.makeRoomBooking);
roomBookingRouter.put("/:roomBookingId", roomBookingController.updateRoomBooking);
roomBookingRouter.delete("/:roomBookingId", roomBookingController.deleteRoomBooking);

module.exports = roomBookingRouter;