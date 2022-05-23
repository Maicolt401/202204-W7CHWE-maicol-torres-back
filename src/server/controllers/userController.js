require("dotenv").config();
const bcrypt = require("bcrypt");
const debug = require("debug")("redsocial:server:controllers:login");
const jsonwebtoken = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const User = require("../../db/models/User");

const loginUser = async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) {
    const error = new Error();
    debug("username wrong");
    error.code = 403;
    error.message = "username or password incorrect";

    next(error);
  } else {
    const userData = {
      name: user.name,
      username: user.username,
      id: user.id,
    };
    const rigthPassword = await bcrypt.compare(password, user.password);

    if (!rigthPassword) {
      const error = new Error("password incorrect");
      error.message = "username or password incorrect ";
      error.code = 403;

      next(error);
    } else {
      const token = jsonwebtoken.sign(userData, process.env.JWT_SECRET);
      res.status(200).json({ token });
    }
  }
};

const encryptPassword = (password) => bcrypt.hash(password, 10);

const userRegister = async (req, res, next) => {
  const { name, username, password } = req.body;
  const { file } = req;
  const user = await User.findOne({ username });

  if (user) {
    const error = new Error();
    error.statusCode = 409;
    error.customMessage = "this user already exists";

    next(error);
  }

  const newImage = `${Date.now()}${file.originalname}`;

  fs.rename(
    path.join("uploads", "images", file.filename),
    path.join("uploads", "images", newImage),
    async (error) => {
      if (error) {
        debug("you can`t");
        next(error);
      } else {
        debug("file renamed");
      }
    }
  );

  const encryptedPassword = await encryptPassword(password);

  try {
    const newUser = await User.create({
      name,
      username,
      password: encryptedPassword,
      image: path.join("images", newImage),
    });

    res.status(201).json(newUser);
  } catch {
    const error = new Error();
    error.statusCode = 400;
    error.customMessage = "bad request";
    next(error);
  }
};

module.exports = { loginUser, userRegister };
