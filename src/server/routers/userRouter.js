const express = require("express");
const { loginUser, userRegister } = require("../controllers/userController");

const userRouter = express.Router();

userRouter.post("/login", loginUser);
userRouter.post("/register", userRegister);
module.exports = userRouter;
