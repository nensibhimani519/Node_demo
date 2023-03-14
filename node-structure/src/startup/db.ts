import mongoose from "mongoose";
import config from "config";

export default () => {
  if (config.has("dbUrl")) {
    const dbUrl: string = config.get("dbUrl");
    console.log(dbUrl, "dbUrl");

    const dbOptions: object = {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    };
    mongoose.connect(dbUrl, dbOptions, (err: any) => {
      if (err) {
        console.log(err.message);
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
