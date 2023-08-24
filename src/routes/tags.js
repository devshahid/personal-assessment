const express = require("express");
const { createTags, getAllTags } = require("../controllers/tags");
const router = express.Router();
router.post("/createTags", createTags);
router.get("/getAllTags", getAllTags);

module.exports = router;
