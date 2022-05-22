require("dotenv").config();
const debug = require("debug")("socialRed:server:initialServer");
const chalk = require("chalk");
const app = require(".");

const initialServer = (port) => {
  const server = app.listen(port, () => {
    debug(chalk.yellow(`initialized server on port : ${port}`));
  });

  server.on("error", (error) => {
    debug("error on server");
    if (error.code === "EADDRINUSE") {
      debug(`${port} used `);
    }
  });
};

module.exports = initialServer;
