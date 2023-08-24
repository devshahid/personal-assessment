const TagModel = require("../models/tags.schema");

exports.createTags = async (req, res) => {
  const tags = req.body;
  try {
    if (!tags) {
      return res.status(401).json({
        message: "Tags not present",
      });
    }
    await TagModel.insertMany(tags);
    return res.status(201).send({
      message: "Tag created successfully",
    });
  } catch (error) {
    console.log("Error in creating tag", error);
    return res.status(503).json({ message: "Internal Server Error" });
    // throw new ErrorHandler(503, "Internal Server Error");
  }
};
exports.getAllTags = async (req, res) => {
  const tags = await TagModel.find({}, { name: 1 });
  return res.json({ tags });
};
