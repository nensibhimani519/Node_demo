import _ from "lodash";
import { Request, Response } from "express";
import { Wishlist, validate } from "../../models/validation/wishlist";

const wishlistList = async (req: Request, res: Response) => {
  const totalItems = await Wishlist.find().countDocuments();
  const wishlists = await Wishlist.find();

  res.status(200).json({
    message: "wishlist get Sucessfully!",
    totalRecords: totalItems,
    data: wishlists,
  });
};

const getWishlistProduct = async (req: Request, res: Response) => {
  let page: any = req.body.page || 1;
  let limit: any = req.body.limit || 10;

  const wishlists = await Wishlist.find()
    .skip((page - 1) * limit)
    .limit();

  res.status(200).json({
    message: "get Sucessfully!",
    data: wishlists,
  });
};

const addWishlist = async (req: Request, res: Response) => {
  const { error } = validate(req.body);
  if (error) throw error;

  let uniqueName: any = await Wishlist.findOne({
    wishlist_name: req.body.wishlist_name,
  });
  if (uniqueName)
    return res.status(400).json({ message: "Wishlist name already Exist." });

  let wishlist: any = new Wishlist(
    _.pick(req.body, ["wishlist_name", "products", "userId"])
  );
  const wishlist_data: any = await wishlist.save();

  res.status(200).json({
    message: "wishlist add Sucessfully!",
    data: wishlist_data,
  });
};

const editWishlist = async (req: Request, res: Response) => {
  const { error } = validate(req.body);
  if (error) throw error;

  const existingWishlist: any = await Wishlist.findOne({
    _id: req.body._id,
  });
  if (!existingWishlist) {
    return res.status(404).json({ message: "No record found." });
  }

  const wishlist = _.assign(
    existingWishlist,
    _.pick(req.body, ["whislist_name", "products"])
  );

  wishlist.updated_on = new Date().toISOString();
  wishlist.save();

  return res.status(200).json({
    message: "The record has updated successfully.",
    data: wishlist,
  });
};

const deleteWishlist = async (req: Request, res: Response) => {
  let wishlist = await Wishlist.findOneAndRemove({ _id: req.body._id });
  if (!wishlist) {
    return res.status(404).json({ message: "Wishlist Not Found!" });
  }

  return res.status(200).json({ message: "Wishlist Deleted successfully!!" });
};

export default {
  wishlistList,
  getWishlistProduct,
  addWishlist,
  editWishlist,
  deleteWishlist,
};
