import { Request, Response } from "express";
import { Category, validate } from "../../../models/validation/category";
import _ from "lodash";

const categoryView = async (category: any) => {
  category = _.pick(category, [
    "_id",
    "name",
    "status",
    "created_on",
    "updated_on",
  ]);
  return category;
};

const index = async (req: Request, res: Response) => {
  let skipNumber: number = req.body.skip_number ? req.body.skip_number : 0;
  let recordPerPage: number = req.body.record_per_page
    ? req.body.record_per_page
    : 20;
  let sortBy: string = req.body.sort_by ? req.body.sort_by : "_id";
  let sortType: number = req.body.sort_type ? req.body.sort_type : -1;

  let allowSortBy: string[] = ["name", "status"];
  sortBy = allowSortBy.includes(sortBy) ? sortBy : "_id";

  let sort: any = {};
  sort[sortBy] = sortType;
  let skip: number = skipNumber;
  let limit: number = recordPerPage;

  let filter: any = new Object();
  if (req.body.name) {
    filter["name"] = new RegExp(req.body.name, "i");
  }

  let result: any = {};
  if (skipNumber == 0) {
    let totalRecords: number = await Category.find({
      $and: [filter],
    }).countDocuments();
    result.total_records = totalRecords;
  }

  result.data = await Category.find({ $and: [filter] })
    .select({ name: 1, status: 1 })
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .lean();

  res.status(200).json(result);
};

const add = async (req: Request, res: Response) => {
  const { error } = await validate(req.body);
  if (error) throw error;

  let category: any = new Category(_.pick(req.body, ["name"]));
  (category.created_on = new Date().toISOString()),
    (category.updated_on = new Date().toISOString()),
    (category = await category.save());
  category = await categoryView(category);

  res.status(200).json({
    message: "The record has saved successfully.",
    data: category,
  });
};

const view = async (req: Request, res: Response) => {
  let category: any = await Category.findOne({ _id: req.body._id });
  if (!category) return res.status(404).json({ message: "No record found." });

  category = await categoryView(category);
  res.status(200).json({
    data: category,
  });
};

const edit = async (req: Request, res: Response) => {
  const { error } = validate(req.body);
  if (error) {
    throw error;
  }

  let category: any = await Category.findOne({ _id: req.body._id });
  if (!category) return res.status(404).json({ message: "No record found." });

  category.updated_on = new Date().toISOString();
  category = category.save();
  category = await categoryView(category);

  res.status(201).json({message: "The record has udpated successfully.",data: category});
};

const remove = async (req: Request, res: Response) => {
  let category: any = await Category.findOneAndRemove({ _id: req.body._id });
  if (!category) return res.status(404).json({ message: "No recored found." });

  res.status(200).json({ message: "The record has deleted successfully." });
};

const status = async (req: Request, res: Response) => {
  let category: any = await Category.findOne({ _id: req.body._id });
  if (!category) return res.status(404).json({ message: "No recored found." });

  category.status = !category.status;
  category.updated_on = new Date().toISOString();
  category = category.save();

  res.status(200).json({ message: "The status has changed successfully." });
};

export default { index, add, view, edit, remove, status };
