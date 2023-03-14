import { Request, Response } from "express";
import _ from "lodash";

const index = async (req: Request, res: Response) => {
  res.status(200).json({ message: "The record has updated successfully." });
};

export default { index };
