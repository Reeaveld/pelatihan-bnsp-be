const db = require("../config/database");

class Auth {
  static async login(email, password) {
    if (!email || !password) throw new Error("Email dan password wajib diisi");
    const sql = `
      SELECT id, username, email
      FROM users
      WHERE email = ? AND password = ?
      LIMIT 1
    `;
    const [rows] = await db.query(sql, [email, password]);
    return rows[0];
  }

  static async findByEmail(email) {
    const sql = `SELECT id FROM users WHERE email = ? LIMIT 1`;
    const [rows] = await db.query(sql, [email]);
    return rows[0];
  }
}

module.exports = Auth;