const express = require("express");
const {
  createPost,
  getAllPosts,
  deleteAllPosts,
  getPostById,
} = require("../controllers/posts");
const router = express.Router();

// using upload middleware to handle the file uploaded by client
const { upload } = require("../middlewares/uploadImage");

/**
 * POST /api/post/createPost handled by createPost Controller Function
 * Create new post in db with specific post data.
 * @returns {posts{}} - An object of new created post.
 */
router.post("/createPost", upload.single("selectedImage"), createPost);

/**
 * GET /api/post/getAllPosts handled by getAllPosts Controller Function
 * Get all posts from the db.
 * @returns {posts[]} - An Array of Object having posts.
 */
router.get("/getAllPosts", getAllPosts);

/**
 * GET /api/post/getpostbyid handled by getpostbyid Controller Function
 * Get a list of posts by tagids.
 * @returns {posts[]} - An array of posts objects.
 */
router.get("/getpostbyid/:tagid", getPostById);

/**
 * DELETE /api/post/deleteAllPosts handled by deleteAllPosts Controller Function
 * Delete all posts from the db.
 * @returns {count} - A number of deleted objects.
 */
router.delete("/deleteAllPosts", deleteAllPosts);

module.exports = router;
