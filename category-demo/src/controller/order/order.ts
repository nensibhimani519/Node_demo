import { Request, Response } from "express";
import { Order } from "../../models/validation/order";
import { Prod } from "../../models/validation/prod";

import _ from "lodash";

const prodList = async (req: Request, res: Response) => {
  const totalItems = await Prod.find().countDocuments();
  const prod = await Prod.find({});

  res.status(200).json({
    message: "product get Sucessfully!",
    totalRecords: totalItems,
    data: prod,
  });
};

const orderList = async (req: Request, res: Response) => {
  const totalItems = await Order.find().countDocuments();
  const order = await Order.find({});

  res.status(200).json({
    message: "order get Sucessfully!",
    totalRecords: totalItems,
    data: order,
  });
};

const orderInventory = async (req: Request, res: Response) => {
  let order: any = await Order.find({});
  let prod: any = await Prod.find({});

  let completedArr: any = [];
  let cancelArr: any = [];

  for (let i = 0; i < prod.length; i++) {
    let pCode = await Order.find({ p_code: prod[i].p_code }).lean();
    for (let j = 0; j < pCode.length; j++) {
      if (prod[i].stock >= pCode[j].qty) {
        prod[i].stock -= pCode[j].qty;
        completedArr.push(pCode[j]._id);
      } else {
        cancelArr.push(pCode[j]._id);
      }
    }
    await Order.updateMany(
      {
        p_code: prod[i].p_code,
      },
      [
        {
          $set: {
            status: {
              $cond: {
                if: { $in: ["$_id", completedArr] },
                then: "Completed",
                else: "Cancel",
              },
            },
          },
        },
      ]
    );

    await Prod.updateOne(
      { _id: prod[i]._id },
      {
        $set: {
          stock: prod[i].stock,
        },
      }
    );
  }

  res.status(200).json({
    message: "order get Sucessfully!",
    // totalRecords: totalItems,
    order_data: order,
    prod_data: prod,
  });
};

export default { prodList, orderList, orderInventory };
