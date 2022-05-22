require("dotenv").config();
const debug = require("debug")("socialRed:root");
const chalk = require("chalk");
const connectDb = require("./src/db");
const initialServer = require("./src/server/initialServer");

(async () => {
  try {
    await connectDb(process.env.MONGO_DATABASE);
    await initialServer(process.env.PORT || 4000);
  } catch (error) {
    debug(chalk.red("error to connect"));
  }
})();
