const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    title: {
      type: String,
      reqired: true,
    },
    imageUrl: {
      type: String,
      reqired: true,
    },
    content: {
      type: String,
      reqired: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      reqired: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
