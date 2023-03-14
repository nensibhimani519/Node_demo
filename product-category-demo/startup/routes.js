import cors from "cors";
import helmet from "helmet";
// import { errorHandler } from "../middleware/error";
import router from "../controller/_router.js";

export default (app) => {
  app.use(helmet());
  // app.use(json());
  app.use(cors());

  // token or not
  // app.use((req, res, next) => {
  //   res.header("Access-Control-Expose-Headers", "x-auth-token");
  //   next();
  // });

  // define all routes
  app.use("/", router);

  // error handling like url
  app.use((req, res, next) => {
    res.status(404).json({ message: "URL not found." });
  });

  //   app.use(errorHandler);
};
