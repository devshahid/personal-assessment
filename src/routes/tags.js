const express = require("express");
const {
  createTags,
  getAllTags,
  deleteAllTags,
} = require("../controllers/tags");
const router = express.Router();
router.post("/createTags", createTags);
router.get("/getAllTags", getAllTags);
router.get("/deleteAllTags", deleteAllTags);

module.exports = router;
