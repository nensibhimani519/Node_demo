const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  products: [
    {
      product: { type: Object, reuired: true },
      quantity: { type: Number, reuired: true },
    },
  ],
  user: {
    // name: {
    //   type: String,
    //   reuired: true,
    // },
    email: {
      type: String,
      reuired: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      reuired: true,
      ref: "User",
    },
  },
});

module.exports = mongoose.model("Order", orderSchema);
