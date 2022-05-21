const debug = require("debug")("socialRed:middlewares:errors");

const notFoundError = (req, res) => {
  res.status(404).json({ msg: "404 endpoint Not Found" });
  debug("Received a request for an unexisting endpoint");
};

// eslint-disable-next-line no-unused-vars
const generalError = (error, re, res, next) => {
  res.status(500).json({ msg: "server error" });
  debug(`server error: ${error.message}`);
};

module.exports = { notFoundError, generalError };
