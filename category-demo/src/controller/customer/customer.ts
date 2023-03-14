import _ from "lodash";
import { Request, Response } from "express";
import { Customer, validate } from "../../models/validation/customer";

const customerList = async (req: Request, res: Response) => {
  const customers = await Customer.find();

  res.status(200).json({
    message: "customer get Sucessfully!",
    data: customers,
  });
};

const addCustomer = async (req: Request, res: Response) => {
  const { error } = await validate(req.body);
  if (error) throw error;

  let uniqueName: any = await Customer.findOne({
    name: req.body.name,
  });
  if (uniqueName)
    return res.status(400).json({ message: "Customer name already Exist." });

  let customer: any = new Customer(_.pick(req.body, ["name", "email"]));
  const customer_data = await customer.save();

  res.status(200).json({
    message: "customer add Sucessfully!",
    data: customer_data,
  });
};

export default { addCustomer, customerList };
