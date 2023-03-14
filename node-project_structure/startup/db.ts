import mongoose, { Connection } from "mongoose";
import config from "../config/default.json";

export default () => {
  if (config.dbConfig && config.dbConfig.db != "") {
    mongoose.set("strictQuery", false);
    mongoose.set("runValidators", true);

    let dbConnectionStr: string = config.dbConfig.db;

    mongoose.connect(
      dbConnectionStr,
      { autoIndex: true, autoCreate: true },
      function (err) {
        if (err) {
          console.error(err.message);
          process.exit(1);
        } else {
          // logger.info(`Connected to ${dbConnectionStr}...`);
        }
      }
    );
  } else {
    console.log("Config db is not set in config file.");
    process.exit(1);
  }
  return new Promise<Connection>((resolve, reject) => {});
};
