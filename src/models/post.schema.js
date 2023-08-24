const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: String,
  desc: String,
  image: String,
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
});

module.exports = mongoose.model("Post", postSchema);
