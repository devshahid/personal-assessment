const PostModel = require("../models/post.schema");
const { uploadImageToS3 } = require("../middlewares/uploadImage");
const { default: mongoose } = require("mongoose");

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
    // Apply filters
    if (req.query.filter) {
      // Apply your filter logic here
    }

    // Apply sorting
    if (req.query.sortBy) {
      // Apply your sorting logic here
    }

    // Apply pagination
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
    if (posts.length > 0) {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 2;
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const paginatedPosts = posts.slice(startIndex, endIndex);
      return res.json({
        posts: paginatedPosts,
        currentPage: page,
        totalPages: Math.ceil(posts.length / limit),
      });
    } else {
      return res.json({
        message: "No post available",
        posts: 0,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
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
exports.getPostById = async (req, res) => {
  if (!req.params.tagid) {
    return res.status(404).json({ message: "Tag id required" });
  }
  try {
    const tagId = new mongoose.Types.ObjectId(req.params.tagid);
    const updatedPosts = await PostModel.aggregate([
      {
        $match: {
          tags: {
            $in: [tagId],
          },
        },
      },
      {
        $lookup: {
          from: "tags",
          localField: "tags",
          foreignField: "_id",
          as: "tagDetails",
        },
      },
      {
        $addFields: {
          tags: {
            $map: {
              input: "$tagDetails",
              as: "tagDetail",
              in: "$$tagDetail.name",
            },
          },
        },
      },
      {
        $project: {
          tagDetails: 0,
        },
      },
    ]);
    return res
      .status(200)
      .json({ posts: updatedPosts, message: "Post Fetched" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
