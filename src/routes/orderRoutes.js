const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

/**
 * @swagger
 * tags:
 *   - name: Orders
 *     description: API for orders and booking history
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get Purchase History
 *     tags: [Orders]
 *     parameters:
 *       - in: query
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/", orderController.getHistory);

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create an Order
 *     tags: [Orders]
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *               movie_name:
 *                 type: string
 *               watch_at:
 *                 type: string
 *                 format: time
 *               seat:
 *                 type: string
 *               ticket:
 *                 type: integer
 *               price:
 *                 type: integer
 *               payment_proof:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Created
 */
router.post("/", upload.single("payment_proof"), orderController.createOrder);

/**
 * @swagger
 * /orders/{id}/cancel:
 *   post:
 *     summary: Cancel Order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Success
 */
router.post("/:id/cancel", orderController.cancelOrder);

module.exports = router;
