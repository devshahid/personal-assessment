const PostModel = require("../models/post.schema");

exports.createPost = async (req, res) => {
  const { title, desc, image, tags } = req.body;
  console.log(req.body);
  if (!title || !desc || !image || !tags)
    return res.status(401).json({ msg: "Please fill all fields" });
  try {
    const newPost = new PostModel({
      title,
      desc,
      image,
      tags,
    });
    const createdPost = await newPost.save();
    console.log("created post", createdPost);
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
