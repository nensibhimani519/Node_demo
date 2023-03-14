import { Request, Response } from "express";
import _ from "lodash";
import Category from "../../models/category";

// const index = async (req: Request, res: Response) => {
//   res.status(200).json({ message: "The record has updated successfully." });
// };

const addCategory = async (req: Request, res: Response) => {
  try {
    const category: any = new Category({
      category_name: req.body.category_name,
    });
    const cat_data: any = await category.save();
    res
      .status(200)
      .send({ success: true, msg: "add category", data: cat_data });
  } catch (err) {
    console.log(err, "err");

    // res.status(400).send({ success: false, msg: err.message });
  }
};
6;

export default { addCategory };
