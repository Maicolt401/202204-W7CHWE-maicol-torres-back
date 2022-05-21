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
      res.json({ token });
    }
  }
};

module.exports = { loginUser };
