const express = require("express");
const userController = require("../controllers/userController");
const { userSchema, validateUserSchema } = require("../middleware/userSchema");

const userRouter = express.Router();

userRouter.get("/", userController.getUser);
userRouter.post("/request-owner", userController.requestOwnership);
userRouter.get("/profile", userController.getProfile);
userRouter.post("/logout", userController.logoutUser);
userRouter.get("/:userID", userController.checkUser, userController.getOneUser);
userRouter.post("/register", userController.registerUser);
userRouter.post("/login", userController.loginUser);
userRouter.put("/", userController.updateUser);
userRouter.delete(
  "/:userID",
  userController.checkUser,
  userController.deleteUser
);

module.exports = userRouter;
