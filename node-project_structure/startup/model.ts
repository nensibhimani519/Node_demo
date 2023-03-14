import mongoose from "mongoose";

import { moduleSchema } from "../models/module";

export default () => {
  mongoose.model("Module", moduleSchema);
};
