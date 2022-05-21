require("dotenv").config();
const debug = require("debug")("robots:server:initialServer");
const chalk = require("chalk");
const app = require(".");

const initialServer = (port) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(chalk.yellow(`initialized server on port :${port}`));
      resolve();
    });

    server.on("error", (error) => {
      debug("error on server");
      if (error.code === "EADDRINUSE") {
        debug(`${port} used `);
      }
      reject();
    });
  });

module.exports = initialServer;
