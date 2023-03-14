import { Request, Response } from "express";
import Joi from "joi";
import _ from "lodash";
import { Collections } from "../../../models/collections";
import { typeArray } from "../../../models/specifications";
import { deleteImage, fileUpload } from '../../../helper/upload'
import { statusArray } from "../../../models/collections";

const validate = (data: Request) => {
  const schema = Joi.object({
      name: Joi.string().required().max(50).label('Name'),
      categories: Joi.array().items(Joi.string().hex().length(24)).label('Categories'),
      specifications: Joi.array().items(Joi.string().hex().length(24)).label('Specifications'),
      specification_options: Joi.array().items(Joi.string().hex().length(24)).label('Specifications Options'),
      product_filter_tags: Joi.array().items(Joi.string().hex().length(24)).label('Product Filter Tags'),
      min_rate: Joi.number().empty(0).label('Min Rate'),
      max_rate: Joi.number().empty(0).label('Max Rate'),
      disc_perc: Joi.number().empty(0).label('Disc Perc'),
      description: Joi.string().empty("").label('Description'),
      meta_title: Joi.string().empty("").max(100).label('Meta Title'),
      meta_desc: Joi.string().empty("").max(200).label('Meta Description'),
      url_keyword: Joi.string().empty("").label('URL Keyword'),
  });
  return schema.validate(data, { abortEarly: false, allowUnknown: true });
};

// const validateBanner = (data: Request) => {
//   const schema = Joi.object({
//       collections: Joi.string().required().max(50).label('Collection Id'),
//   });
//   return schema.validate(data, { abortEarly: false, allowUnknown: true });
// };

const collectionView = async (collection: any) => {
  collection = await collection.populate("categories", { name: 1 });
  collection = await collection.populate("banner", { name: 1, image: 1, image_height_ratio: 1, link: 1, position: 1, status: 1 });
  collection = await collection.populate("specifications", { name: 1, type: 1, is_variant: 1, options: 1 });
  // collection = await collection.populate("product_filter_tags", { name: 1 });
  collection = _.pick(collection, ["_id", "name", "categories", "specifications", "specification_options", "product_filter_tags", "min_rate", "max_rate", "disc_perc", "banner", "description", "meta_title", "meta_desc", "url_keyword", "cid"]);
  collection.specifications = collection.specifications.map((el: any) => {
    el = _.pick(el, ["_id", "name", "type", "is_variant", "options"]);
    el.type = { _id: el.type, name: typeArray[el.type] };
    return el;
  });
  return collection;
};

const collectionsBannerView = async ( banner: any) => {
  banner = banner.map((el: any) => {
    el = _.pick(el, ["_id", "image", "image_height_ratio", "link", "position", "status"]);
    // el = _.pick(el, [  "status"]);
    el.status = { _id: el.status, name: statusArray[el.status] };
    return el;
  });
  return  banner;
};

const index = async (req: Request, res: Response) => {
    let skipNumber: number = req.body.skip_number ? req.body.skip_number : 1;
    let recordPerPage: number = req.body.record_per_page ? req.body.record_per_page : 5;
    let sortBy: string = req.body.sort_by ? req.body.sort_by : "_id";
    let sortType: number = req.body.sort_type ? req.body.sort_type : -1;

    let allowSortBy: string[] = ["name"];
    sortBy = allowSortBy.includes(sortBy) ? sortBy : "_id";

    let sort: any = {};
    sort[sortBy] = sortType;
    let skip: number = (skipNumber - 1) * recordPerPage;
    let limit: number = recordPerPage;

   
    let filter: any = new Object();
    if (req.body.name) filter["name"] = new RegExp(req.body.name, "i");
      
    let result: any = {};
    if (skipNumber == 1) {
        let totalRecords: number = await Collections.find({ $and: [filter] }).countDocuments();
        result.total_records = totalRecords;
    }
  result.data = await Collections.find({ $and: [filter] }).select({ name: 1 }).sort(sort).skip(skip).limit(limit).lean();
    res.status(200).json(result);   
}; 

const add = async (req: Request, res: Response) => {
  const { error } = validate(req.body);
  if (error) throw error;

  let collection: any = new Collections(_.pick(req.body, ["name", "categories", "specifications", "specification_options", "product_filter_tags", "min_rate", "max_rate", "disc_perc", "description", "meta_title", "meta_desc", "url_keyword"]));
  let lastCid: any = await Collections.findOne().sort({ cid: -1 });
  collection.cid = lastCid ? lastCid.cid + 1 : 1;
  collection = await collection.save();
  collection = await collectionView(collection);

  collection = collection;

  res.status(200).json({ message: "The record has saved successfully.", data: collection });
};

const view = async (req: Request, res: Response) => {
  let collection: any = await Collections.findOne({ _id: req.body._id });
  if (!collection) return res.status(404).json({ message: "No record found." });

  collection = await collectionView(collection);
  res.status(200).json({ message: "The reacord has fetch successfully.", data: collection });
};

const edit = async (req: Request, res: Response) => {
  const { error } = validate(req.body);
  if (error) throw error;

  let collection: any = await Collections.findOne({ _id: req.body._id });
  if (!collection) res.status(404).json({ message: "No record found." });

  collection = _.assign(collection, _.pick(req.body, ["name", "categories", "specifications", "specification_options", "product_filter_tags", "min_rate", "max_rate", "disc_perc", "description", "meta_title", "meta_desc", "url_keyword"]));
  collection = await collection.save();
  collection = await collectionView(collection);

  res.status(200).json({ message: "The record has updated successfully.", data: collection });
};

const remove = async (req: Request, res: Response) => {
  let collection: any = await Collections.findOneAndRemove({ _id: req.body._id });
  if (!collection) return res.status(404).json({ message: "No recored found." });

  res.status(200).json({ message: "The record has deleted successfully." });
};

const bannerAdd = async (req: Request, res: Response) => {
  await fileUpload(req, res, async (err: any) => {
    if (err) return res.status(404).json({ message: err.message });

    let collections = await Collections.findOne({ _id: req.body.collections});
    if (!collections) return res.status(404).json({ message: "No record found." });

    let data: any = _.pick(req.body, ['collections', 'image', 'image_height_ratio', 'link']);
    collections.banner.unshift(data);
    collections = await collections.save();

    res.status(200).json({message: "The banner has saved successfully.", data: collections});
  });
};

const bannerEdit = async (req: Request, res: Response) => {        
    let collections = await Collections.findOne({ _id: req.body.collections});
    if (!collections) return res.status(404).json({ message: "No record found." });
  
    collections.banner =  collections.banner.map((item: any) => {
      if(item._id == req.body._id) {
          item.image = item.image,
          item.image_height_ratio = item.image_height_ratio,
          item.link = req.body.link ? req.body.link : item.link,
          item.position = item.position,
          item.status = item.status
      } 
      return item;
    });   
    collections = await collections.save();    
    let result: any = {};
    result._id = collections._id;
    let banner = collections.banner;        
    result.banner = await collectionsBannerView(banner);   
    res.status(200).json({message: "The banner has saved successfully.", data: result});
  };

const bannerDelete = async (req: Request, res: Response) => {
  let collections: any = await Collections.findOne({_id: req.body.collections});
    if(!collections) return res.status(404).json({ message: 'No record found.'});

    collections.banner = collections.banner.filter((item: any) =>  {
        if(item._id.toString() === req.body._id)  {
          deleteImage(item.image);
        }
        return  item._id.toString() !== req.body._id
    } );       
    collections = await collections.save();

  res.status(200).json({ message: "The record has deleted successfully." });
};

// const bannerStatus = async (req: Request, res: Response) => {
//   const { error } = validateBanner(req.body);
//   if (error) throw error;

//   let collections: any = await Collections.findOne({ _id: req.body.collections });
//   if (!collections) return res.status(404).json({ message: "No recored found." });

//   collections.banner =  collections.banner.map((item: any) => {
//     if(item._id == req.body._id) {
//         item.image = item.image,
//         item.image_height_ratio = item.image_height_ratio,
//         item.link = req.body.link ? req.body.link : item.link,
//         item.position = item.position,
//         item.status = item.status
//     } 
//     return item;
//   }); 
  
//   collections = await collections.save();
//     let result: any = {};
//     result._id = collections._id;
//   let banner = collections.banner;       
//   banner.status = !banner.status;
//     result.banner = await collectionsBannerView(banner); 

//   // collections.updated_on = new Date().toISOString();
//   // collections = collections.save();
//   // let banner = collections.banner;        
//   // collections.banner = await collectionsBannerView(banner);  

//   res.status(200).json({ message: "The status has changed successfully.", data: result });
// };

export default { index, add, view, edit, remove, bannerDelete, bannerAdd, bannerEdit }