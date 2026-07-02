const Booking = require("../models/bookingModel");

// GET /api/bookings
const getBookings = async (req, res) => {
    try {
        const bookings = await Booking.findAll();
        res.status(200).json({
            success: true,
            data: bookings
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// GET /api/bookings/:id
const getBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });
        }
        res.status(200).json({
            success: true,
            data: booking
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// POST /api/bookings
const createBooking = async (req, res) => {
    try {
        const result = await Booking.create(req.body);
        res.status(201).json({
            success: true,
            message: "Booking created successfully",
            booking_id: result.insertId
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// PUT /api/bookings/:id
const updateBooking = async (req, res) => {
    try {
        const result = await Booking.update(req.params.id, req.body);
        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Booking updated successfully"
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// DELETE /api/bookings/:id
const deleteBooking = async (req, res) => {
    try {
        const result = await Booking.delete(req.params.id);
        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Booking deleted successfully"
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

module.exports = {
    getBookings,
    getBooking,
    createBooking,
    updateBooking,
    deleteBooking
};