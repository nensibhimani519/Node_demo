import _ from "lodash";
import { Product, validate } from "../../models/validation/product";
import { Request, Response } from "express";

const productList = async (req: Request, res: Response) => {
  const totalItems = await Product.find().countDocuments();
  const products = await Product.find();

  res.status(200).json({
    message: "product get Sucessfully!",
    totalRecords: totalItems,
    data: products,
  });
};

const addProduct = async (req: Request, res: Response) => {
  const { error } = validate(req.body);
  if (error) throw error;

  let uniqueName: any = await Product.findOne({
    name: req.body.name,
  });
  if (uniqueName)
    return res.status(400).json({ message: "Product name already Exist." });

  let product = new Product(_.pick(req.body, ["name", "price"]));
  const product_data = await product.save();

  res.status(200).json({
    message: "product add Sucessfully!",
    data: product_data,
  });
};

const editProduct = async (req: Request, res: Response) => {
  const { error } = validate(req.body);
  if (error) throw error;

  let uniqueName: any = await Product.findOne({
    name: req.body.name,
    _id: { $ne: req.body._id },
  });
  if (uniqueName)
    return res.status(400).json({ message: "Product name already Exist." });

  const productId: any = await Product.findOne({ _id: req.body._id });
  if (!productId) {
    return res.status(404).json({ message: "Product Not Found!" });
  }

  const product = _.assign(productId, _.pick(req.body, ["name", "price"]));
  product.updated_on = new Date().toISOString();
  product.save();

  return res
    .status(200)
    .json({ message: "Product Updated successfully!!", data: product });
};

const deleteProduct = async (req: Request, res: Response) => {
  let product = await Product.findOneAndRemove({ _id: req.body._id });
  if (!product) {
    return res.status(404).json({ message: "Product Not Found!" });
  }

  return res.status(200).json({ message: "Product Deleted successfully!!" });
};

export default { productList, addProduct, editProduct, deleteProduct };
