


// Model bertanggung jawab langsung atas pengelolaan data dan aturan main (logika bisnis) dari aplikasi .
// Berhubungan langsung dengan database untuk mengambil (select), menyimpan (insert), memperbarui (update), atau menghapus (delete) data.
// Melakukan validasi dan pemrosesan data sebelum disimpan.
// Model tidak peduli bagaimana data tersebut akan ditampilkan; fokusnya murni pada keakuratan dan keamanan data.
const db = require("../config/database");

class Auth {
  static async login(nama, email) {
    if (!nama || !email) throw new Error("Nama dan email wajib diisi");
    const sql = `
      SELECT id, nama, email, nohp, gender
      FROM user
      WHERE nama = ? AND email = ?
      LIMIT 1
    `;
    const [rows] = await db.query(sql, [nama, email]);
    return rows[0];
  }
}

module.exports = Auth;