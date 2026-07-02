


// Model bertanggung jawab langsung atas pengelolaan data dan aturan main (logika bisnis) dari aplikasi .
// Berhubungan langsung dengan database untuk mengambil (select), menyimpan (insert), memperbarui (update), atau menghapus (delete) data.
// Melakukan validasi dan pemrosesan data sebelum disimpan.
// Model tidak peduli bagaimana data tersebut akan ditampilkan; fokusnya murni pada keakuratan dan keamanan data.
const db = require("../config/database");

class Auth {
    static async login(username, email) {
        // Pastikan username diisi dan bukan cuma spasi
        if (!username || username.trim() === "") {
            throw new Error("Username wajib diisi");
        }

        // Pastikan email diisi
        if (!email || email.trim() === "") {
            throw new Error("Email wajib diisi");
        }

        // Validasi format email menggunakan Regular Expression (Regex)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error("Format email tidak valid");
        }
        
        const sql = `
            SELECT
                id,
                username,
                email
            FROM users
            WHERE username = ?
            AND email = ?
            AND deleted_at IS NULL
            LIMIT 1
        `;
        const [rows] = await db.query(sql, [
            username,
            email
        ]);

        return rows[0];
    }

}

module.exports = Auth;