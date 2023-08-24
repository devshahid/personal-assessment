const express = require("express");
const { createPost, getAllPosts } = require("../controllers/posts");
const router = express.Router();

router.post("/createPost", createPost);
router.get("/getAllPosts", getAllPosts);

module.exports = router;
