const express = require("express");
const {
  createPost,
  getAllPosts,
  deleteAllPosts,
} = require("../controllers/posts");
const router = express.Router();
const { upload } = require("../middlewares/uploadImage");
router.post("/createPost", upload.single("selectedImage"), createPost);
router.get("/getAllPosts", getAllPosts);
router.get("/deleteAllPosts", deleteAllPosts);

module.exports = router;
