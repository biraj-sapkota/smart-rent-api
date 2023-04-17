const express = require("express");
const userController = require("../controllers/userController");
const { verifyEmail } = require("../controllers/verificationController");
const {
  forgotPassword,
  resetPassword,
} = require("../controllers/passwordController");
const { userSchema, validateUserSchema } = require("../middleware/userSchema");

const userRouter = express.Router();

userRouter.get("/", userController.getUser);
userRouter.post("/request-owner", userController.requestOwnership);
userRouter.get("/profile", userController.getProfile);
userRouter.post("/logout", userController.logoutUser);
userRouter.get("/info", userController.getOneUser);
userRouter.post("/register", userController.registerUser);
userRouter.post("/addowner", userController.addAdmin);
userRouter.post("/login", userController.loginUser);
userRouter.post("/verifyUser", verifyEmail);
userRouter.post("/forgotPassword", forgotPassword);
userRouter.post("/resetPassword", resetPassword);
userRouter.put("/", userController.updateUser);
userRouter.put("/profile", userController.updateUserProfile);
userRouter.put("/reject-user", userController.rejectOwnershipRequest);
userRouter.delete("/:userId", userController.deleteUser);

module.exports = userRouter;
