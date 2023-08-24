const TagModel = require("../models/tags.schema");
const { filterTags } = require("../utils/filterExistingTags");

exports.createTags = async (req, res) => {
  const tags = req.body;
  try {
    if (!tags) {
      return res.status(401).json({
        message: "Tags not present",
      });
    }
    if (!tags.name) {
      return res.status(401).json({
        message: "Tags key with name not present",
      });
    }
    const tagsObjects = tags.name.map((tag) => ({ name: tag }));
    const newTags = await filterTags(tagsObjects);
    await TagModel.insertMany(newTags);
    return res.status(201).json({
      message: "Tag created successfully",
      tags: tags.name,
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
exports.deleteAllTags = async (req, res) => {
  try {
    const result = await TagModel.deleteMany({});
    console.log(result.deletedCount, "documents deleted");
    res
      .status(200)
      .json({ message: `${result.deletedCount} documents deleted` });
  } catch (error) {
    console.error("Error deleting documents:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};
