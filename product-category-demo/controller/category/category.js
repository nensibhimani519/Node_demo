import _ from "lodash";
import { Category } from "../../models/category.js";

const addCategory = async (req, res) => {
  try {
    console.log("test");
    console.log(req);
    let category = new Category(_.pick, (req.body, ["category_name"]));
    const category_data = await category.save();
    res
      .status(200)
      .send({ success: true, msg: "add category", data: category_data });
  } catch (err) {
    console.log(err, "err");

    // res.status(400).send({ success: false, msg: err.message });
  }
};

export default { addCategory };
