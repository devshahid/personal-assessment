const TagModal = require("../models/tags.schema");

exports.filterTags = async (tags) => {
  const newTags = [];
  for (let tag of tags) {
    const isExist = await TagModal.findOne({ name: tag.name });
    if (!isExist) {
      newTags.push(tag);
    }
  }
  return newTags;
};
