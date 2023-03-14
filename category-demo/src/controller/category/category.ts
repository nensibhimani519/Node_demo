import { Request, Response } from "express";
import { Category, validate } from "../../models/validation/category";
import _ from "lodash";

const categoryList = async (req: Request, res: Response) => {
  const totalItems = await Category.find().countDocuments();
  const categories = await Category.find().sort({ name: 1 });

  res.status(200).json({
    message: "category get Sucessfully!",
    totalRecords: totalItems,
    data: categories,
  });
};

const addCategory = async (req: Request, res: Response) => {
  const { error } = validate(req.body);
  if (error) throw error;

  let uniqueName: any = await Category.findOne({
    category_name: req.body.category_name,
  });
  if (uniqueName)
    return res.status(400).json({ message: "Wishlist name already Exist." });

  let category = new Category(_.pick(req.body, ["category_name"]));
  const category_data = await category.save();

  res.status(200).json({
    message: "category add Sucessfully!",
    data: category_data,
  });
};

const getByIdCategory = async (req: Request, res: Response) => {
  let category1 = await Category.findOne({ _id: req.body._id });
  if (!category1)
    return res.status(404).json({ message: "Category Not Found!" });

  return res.status(200).json({ message: "Category Fetch successfully!!" });
};

const deleteCategory = async (req: Request, res: Response) => {
  let category = await Category.findOneAndRemove({ _id: req.body._id });
  if (!category)
    return res.status(404).json({ message: "Category Not Found!" });

  return res.status(200).json({ message: "Category Deleted successfully!!" });
};

export default { addCategory, categoryList, deleteCategory, getByIdCategory };
