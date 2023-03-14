import _ from "lodash";

const index = async (req, res) => {
  res.status(200).json({ message: "The record has updated successfully." });
};

export default { index };
