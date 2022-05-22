const bcrypt = require("bcrypt");
const debug = require("debug")("redsocial:server:controllers:login");
const jsonwebtoken = require("jsonwebtoken");
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

const userRegister = async (req, res, next) => {
  const { name, username, password, image } = req.body;
  const encryptedPassword = await bcrypt.hash(password, 10);

  try {
    await User.create({
      name,
      username,
      password: encryptedPassword,
      image,
    });
    res.status(201).jason(req.body);
  } catch (error) {
    error.statusCode = 400;
    error.customMessage = "bad request";

    next(error);
  }
};

module.exports = { loginUser, userRegister };
