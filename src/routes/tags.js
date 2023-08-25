const express = require("express");
const {
  createTags,
  getAllTags,
  deleteAllTags,
} = require("../controllers/tags");
const router = express.Router();

/**
 * POST /api/tags/createTags handled by createTags Controller Function
 * Create new post in db with specific tag data.
 * @returns {posts{}} - An object of new created tag.
 */
router.post("/createTags", createTags);

/**
 * GET /api/tags/getAllTags handled by getAllTags Controller Function
 * Get all tags from the db.
 * @returns {tags[]} - An Array of Object having tags.
 */
router.get("/getAllTags", getAllTags);

/**
 * DELETE /api/tags/deleteAllTags handled by deleteAllTags Controller Function
 * Delete all tags from the db.
 * @returns {count} - A number of deleted objects.
 */
router.delete("/deleteAllTags", deleteAllTags);

module.exports = router;
