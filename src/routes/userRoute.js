const express = require("express");
const userController = require("../controllers/userController");
const { userSchema, validateUserSchema } = require("../middleware/userSchema");

const userRouter = express.Router();

userRouter.get("/", userController.getUser);
userRouter.post("/request-owner", userController.requestOwnership);
userRouter.get("/profile", userController.getProfile);
userRouter.post("/logout", userController.logoutUser);
userRouter.get("/info", userController.getOneUser);
userRouter.post("/register", userController.registerUser);
userRouter.post("/login", userController.loginUser);
userRouter.put("/", userController.updateUser);
userRouter.put("/profile", userController.updateUserProfile);
userRouter.put("/reject-user", userController.rejectOwnershipRequest);
userRouter.delete(
  "/:userID",
  userController.checkUser,
  userController.deleteUser
);

module.exports = userRouter;
