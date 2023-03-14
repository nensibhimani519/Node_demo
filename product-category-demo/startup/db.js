import mongoose from "mongoose";
// import config from "../config/default.json";

export default () => {
  //   console.log(config, "coinfirf");
  const config = "mongodb://localhost:27017/product-category";
  if (config != "") {
    mongoose.set("strictQuery", false);
    mongoose.set("runValidators", true);

    let dbConnectionStr = config;

    mongoose.connect(
      dbConnectionStr,
      { autoIndex: true, autoCreate: true },
      function (err) {
        if (err) {
          console.error(err.message);
          process.exit(1);
        } else {
          console.log(`database connect on ${dbConnectionStr}`);
          // logger.info(`Connected to ${dbConnectionStr}...`);
        }
      }
    );
  } else {
    console.log("Config db is not set in config file.");
    process.exit(1);
  }
};
