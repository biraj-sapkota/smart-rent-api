const express = require("express");
const userController = require("../controllers/userController");

const userRouter = express.Router();

userRouter.get("/", userController.checkUser, userController.getUser);
userRouter.get("/:userId", userController.checkUser, userController.getOneUser);
userRouter.post("/register", userController.registerUser);
userRouter.post("/login", userController.loginUser);
userRouter.put("/:userId", userController.checkUser, userController.updateUser);
userRouter.delete(
  "/:userId",
  userController.checkUser,
  userController.deleteUser
);

module.exports = userRouter;
