const express = require("express");
const router = express.Router();

// Define index route -- get all posts
router.get("/", (req, res) => {
    res.send("All Posts");
});

module.exports = router;