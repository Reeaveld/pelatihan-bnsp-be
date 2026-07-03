const Auth = require("../models/authModel");
const User = require("../models/userModel");

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email dan password wajib diisi."
            });
        }
        const user = await Auth.login(email, password);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Email atau password tidak sesuai."
            });
        }
        return res.status(200).json({
            success: true,
            message: "Login berhasil.",
            data: user
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Semua field (username, email, password) wajib diisi."
            });
        }

        const existing = await Auth.findByEmail(email);
        if (existing) {
            return res.status(400).json({
                success: false,
                message: "Email sudah digunakan."
            });
        }

        const result = await User.create({ username, email, password });
        return res.status(201).json({
            success: true,
            message: "Registrasi berhasil",
            data: { id: result.insertId, username, email }
        });
    } catch (err) {
         return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

module.exports = {
    login,
    register
};