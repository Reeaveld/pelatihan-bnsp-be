const Order = require("../models/orderModel");

const getHistory = async (req, res) => {
    try {
        const userId = req.query.user_id; // In a real app this comes from auth token
        if (!userId) {
            return res.status(400).json({ success: false, message: "user_id is required" });
        }
        const orders = await Order.findAllByUserId(userId);
        res.status(200).json({
            success: true,
            data: orders
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const createOrder = async (req, res) => {
    try {
        const { user_id, movie_name, watch_at, seat, ticket, price } = req.body;
        // The file is attached via multer
        let payment_proof = null;
        if (req.file) {
            payment_proof = req.file.filename;
        }

        if (!user_id || !movie_name || !watch_at || !seat || !ticket || !price || !payment_proof) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields or payment proof not uploaded."
            });
        }

        const result = await Order.create({
            user_id, movie_name, watch_at, seat, ticket, price, payment_proof
        });

        res.status(201).json({
            success: true,
            message: "Pesanan tiket berhasil dibuat",
            data: { id: result.insertId }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

const cancelOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const userId = req.body.user_id; // Needs user_id to verify ownership

        if (!userId) {
            return res.status(400).json({ success: false, message: "user_id is required" });
        }

        const result = await Order.softDelete(orderId, userId);
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: "Order not found or not yours" });
        }

        res.status(200).json({ success: true, message: "Pesanan berhasil dibatalkan" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

module.exports = {
    getHistory,
    createOrder,
    cancelOrder
};
