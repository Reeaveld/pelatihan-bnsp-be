const express = require("express");

const router = express.Router();

const movieController = require("../controllers/movieController");

/**
 * @swagger
 * tags:
 *   name: Movies
 *   description: Movie Management
 */

/**
 * @swagger
 * /movies:
 *   get:
 *     summary: Get All Movies
 *     tags: [Movies]
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/", movieController.getMovies);

/**
 * @swagger
 * /movies/{id}:
 *   get:
 *     summary: Get Movie By Id
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *             type: integer
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/:id", movieController.getMovie);

/**
 * @swagger
 * /movies:
 *   post:
 *     summary: Create Movie
 *     tags: [Movies]
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *             schema:
 *                type: object
 *                properties:
 *                    movie_name:
 *                        type: string
 *                    genre:
 *                        type: string
 *                    duration:
 *                        type: integer
 *                    release_date:
 *                        type: string
 *                    price:
 *                        type: number
 *                    image:
 *                        type: string
 *     responses:
 *        201:
 *            description: Created
 */
router.post("/", movieController.createMovie);

/**
 * @swagger
 * /movies/{id}:
 *   put:
 *     summary: Update Movie
 *     tags: [Movies]
 */
router.put("/:id", movieController.updateMovie);

/**
 * @swagger
 * /movies/{id}:
 *   delete:
 *     summary: Delete Movie
 *     tags: [Movies]
 */
router.delete("/:id", movieController.deleteMovie);

module.exports = router;