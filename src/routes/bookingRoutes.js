const express = require("express");
const router = express.Router();

const bookingController = require("../controllers/bookingController");

/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: Booking Management API
 */

/**
 * @swagger
 * /bookings:
 *   get:
 *     summary: Get all bookings
 *     description: Retrieve a list of all bookings.
 *     tags: [Bookings]
 *     responses:
 *       200:
 *         description: List of bookings retrieved successfully.
 */
router.get("/", bookingController.getBookings);

/**
 * @swagger
 * /bookings/{id}:
 *   get:
 *     summary: Get booking by ID
 *     description: Retrieve a booking by its ID.
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Booking ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Booking retrieved successfully.
 *       404:
 *         description: Booking not found.
 */
router.get("/:id", bookingController.getBooking);

/**
 * @swagger
 * /bookings:
 *   post:
 *     summary: Create a new booking
 *     description: Create a new movie booking.
 *     tags: [Bookings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - movie_id
 *               - watch_at
 *               - seat
 *               - ticket_qty
 *               - price
 *             properties:
 *               user_id:
 *                 type: integer
 *               movie_id:
 *                 type: integer
 *               watch_at:
 *                 type: string
 *                 format: date-time
 *               seat:
 *                 type: string
 *               ticket_qty:
 *                 type: integer
 *               price:
 *                 type: number
 *                 format: float
 *     responses:
 *       201:
 *         description: Booking created successfully.
 */
router.post("/", bookingController.createBooking);

/**
 * @swagger
 * /bookings/{id}:
 *   put:
 *     summary: Update booking
 *     description: Update booking information.
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Booking ID
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
 *               movie_id:
 *                 type: integer
 *               watch_at:
 *                 type: string
 *                 format: date-time
 *               seat:
 *                 type: string
 *               ticket_qty:
 *                 type: integer
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Booking updated successfully.
 *       404:
 *         description: Booking not found.
 */
router.put("/:id", bookingController.updateBooking);

/**
 * @swagger
 * /bookings/{id}:
 *   delete:
 *     summary: Delete booking
 *     description: Soft delete a booking.
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Booking ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Booking deleted successfully.
 *       404:
 *         description: Booking not found.
 */
router.delete("/:id", bookingController.deleteBooking);

module.exports = router;