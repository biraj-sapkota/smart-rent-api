const express = require("express");
const userController = require("../controllers/userController");

const userRouter = express.Router();

userRouter.get("/", userController.getUser);
userRouter.put("/:userId", userController.updateUser);
userRouter.delete("/:userId", userController.deleteUser);

module.exports = userRouter;
