import mongoose from "mongoose";
import config from "config";

export default () => {
  if (config.has("dbUrl")) {
    const dbUrl: string = config.get("dbUrl");

    mongoose.set("strictQuery", false);
    mongoose.connect(dbUrl, (err: any) => {
      if (err) {
        process.exit(1);
      } else {
        console.log("Database connected successfully..!");
      }
    });
  } else {
    console.log("unable to connect database, please try again later");
    process.exit(1);
  }
};
