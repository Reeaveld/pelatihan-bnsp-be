
// Controller bertindak sebagai jembatan penengah atau "otak" yang mengatur komunikasi antara Model dan View.
// Menerima permintaan (request) atau input dari pengguna (misalnya ketika pengguna mengakses URL tertentu atau menekan tombol kirim).
// Memproses input tersebut, lalu meminta Model untuk mengambil atau memanipulasi data di database jika diperlukan.
// Mengambil hasil dari Model, lalu memilih View mana yang tepat untuk menampilkan hasilnya ke pengguna (di sinilah fungsi res.render() atau res.redirect() yang Anda tanyakan sebelumnya digunakan).
const Auth = require("../models/authModel");

const login = async (req, res) => {
    try {
        const { username, email } = req.body;
        if (!username || !email) {
            return res.status(400).json({
                success: false,
                message: "Username dan email wajib diisi."
            });
        }
        const user = await Auth.login(username, email);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Username atau email tidak sesuai."
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

module.exports = {
    login
};