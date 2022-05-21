const chalk = require("chalk");
const mongoose = require("mongoose");
const debug = require("debug")("socialRed:db:root");

const connectDb = (conectString) =>
  new Promise((resolve, reject) => {
    mongoose.set("debug", true);
    mongoose.connect(conectString, (error) => {
      if (error) {
        debug(chalk.red("error in data base", error.message));
        reject();
        return;
      }
      debug(chalk.yellow("connect to data base"));
      resolve();
    });
  });

module.exports = connectDb;
