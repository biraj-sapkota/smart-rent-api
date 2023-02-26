const express = require("express");
const userController = require("../controllers/userController");

const userRouter = express.Router();

userRouter.get("/", userController.checkUser, userController.getUser);
userRouter.get("/profile", userController.getProfile);
userRouter.get("/:userID", userController.checkUser, userController.getOneUser);
userRouter.post("/register", userController.registerUser);
userRouter.post("/login", userController.loginUser);
userRouter.put("/:userID", userController.checkUser, userController.updateUser);
userRouter.delete(
  "/:userID",
  userController.checkUser,
  userController.deleteUser
);

module.exports = userRouter;
