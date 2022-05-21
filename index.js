require("dotenv").config();
const debug = require("debug")("socialRed:root");
const chalk = require("chalk");
const connectDb = require("./db");
const initialServer = require("./server/initialServer");

(async () => {
  try {
    await connectDb(process.env.MONGO_DATABASE);
    await initialServer(process.env.PORT || 4000);
    debug(chalk.yellow("connect"));
  } catch (error) {
    debug(chalk.red("error to connect"));
  }
})();
