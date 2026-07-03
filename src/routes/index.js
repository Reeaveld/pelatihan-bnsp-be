const express = require("express");

const router = express.Router();

router.use("/auth", require("./authRoutes"));
router.use("/movies", require("./movieRoutes"));
router.use("/users", require("./userRoutes"));
router.use("/orders", require("./orderRoutes"));

module.exports = router;