const express = require("express");

const router = express.Router();

router.use("/auth", require("./authRoutes"));
router.use("/movies", require("./movieRoutes"));
router.use("/users", require("./userRoutes"));
router.use("/bookings", require("./bookingRoutes"));

module.exports = router;