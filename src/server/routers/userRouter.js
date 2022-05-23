const express = require("express");
const multer = require("multer");
const path = require("path");
const { loginUser, userRegister } = require("../controllers/userController");

const userRouter = express.Router();

const upload = multer({
  dest: path.join("uploads", "images"),
});

userRouter.post("/login", loginUser);
userRouter.post("/register", upload.single("image"), userRegister);
module.exports = userRouter;
