const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, 'movie_' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

/**
 * @swagger
 * tags:
 *   name: Movies
 *   description: Movie Management
 */

router.get("/", movieController.getMovies);
router.get("/:id", movieController.getMovie);
router.post("/", upload.single("image"), movieController.createMovie);
router.put("/:id", upload.single("image"), movieController.updateMovie);
router.delete("/:id", movieController.deleteMovie);

module.exports = router;