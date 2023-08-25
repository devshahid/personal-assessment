const express = require("express");
const router = express.Router();

// for /api/tags tags-controller will handle the api's
router.use("/tags", require("./tags"));

// for /api/posts posts-controller will handle the api's
router.use("/posts", require("./posts"));

module.exports = router;
