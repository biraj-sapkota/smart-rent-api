const express = require("express");
const userController = require("../controllers/userController");
const {userSchema, validateUserSchema} = require("../middleware/userSchema")

const userRouter = express.Router();

userRouter.get("/", userController.getUser);
userRouter.get("/profile", userController.getProfile);
userRouter.post("/logout", userController.logoutUser);
userRouter.get("/:userID", userController.checkUser, userController.getOneUser);
userRouter.post("/register", userSchema, validateUserSchema, userController.registerUser);
userRouter.post("/login", userController.loginUser);
userRouter.put("/:userID", userController.checkUser, userController.updateUser);
userRouter.delete(
  "/:userID",
  userController.checkUser,
  userController.deleteUser
);

module.exports = userRouter;
