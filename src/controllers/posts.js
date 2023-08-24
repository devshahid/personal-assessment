const PostModel = require("../models/post.schema");
const { uploadImageToS3 } = require("../middlewares/uploadImage");
const mongoose = require("mongoose");
const TagModal = require("../models/tags.schema");
exports.createPost = async (req, res) => {
  const { title, desc, tags } = req.body;
  if (!title || !desc || !tags || !req.file)
    return res.status(401).json({ msg: "Please fill all fields" });
  try {
    const imgUrl = await uploadImageToS3(req.file);
    const tagIds =
      JSON.parse(tags).length > 0 && JSON.parse(tags).map((tag) => tag._id);
    const newPost = new PostModel({
      title,
      desc,
      image: imgUrl,
      tags: tagIds,
    });
    const createdPost = await newPost.save();
    res.status(201).json({
      message: "Post created successfully",
      postData: createdPost,
    });
  } catch (error) {
    console.log(error);
    return res.status(501).json({ message: error });
  }
};
exports.getAllPosts = async (req, res) => {
  try {
    const pipeline = [
      {
        $lookup: {
          from: "tags", // Name of the tags collection
          localField: "tags", // Field in the posts collection
          foreignField: "_id", // Field in the tags collection
          as: "tags", // Alias for the joined tags data
        },
      },
      {
        $addFields: {
          tags: "$tags.name", // Extract tag names from the joined data
        },
      },
      {
        $project: {
          __v: 0,
        },
      },
    ];
    const posts = await PostModel.aggregate(pipeline);
    return res
      .status(200)
      .json({ posts, message: "Completely send the posts to client" });
  } catch (error) {
    return res.status(500).json({
      message: "There is some problem with happened",
      error,
    });
  }
};
exports.deleteAllPosts = async (req, res) => {
  try {
    const result = await PostModel.deleteMany({});
    res
      .status(200)
      .json({ message: `${result.deletedCount} documents deleted` });
  } catch (error) {
    console.error("Error deleting documents:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};
