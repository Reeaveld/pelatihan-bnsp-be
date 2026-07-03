const db = require("../config/database");

const User = {
  async findAll() {
    const [rows] = await db.query(
      "SELECT id, username, email FROM users ORDER BY id DESC"
    );
    return rows;
  },

  async findById(id) {
    const [rows] = await db.query(
      "SELECT id, username, email FROM users WHERE id = ?",
      [id]
    );
    return rows[0];
  },

  async create(data) {
    const sql = `
      INSERT INTO users (username, email, password)
      VALUES (?, ?, ?)
    `;
    const [result] = await db.query(sql, [
      data.username,
      data.email,
      data.password
    ]);
    return result;
  },

  async update(id, data) {
    const sql = `
      UPDATE users
      SET username = ?, email = ?
      WHERE id = ?
    `;
    const [result] = await db.query(sql, [
      data.username,
      data.email,
      id
    ]);
    return result;
  },

  async delete(id) {
    const [result] = await db.query("DELETE FROM users WHERE id = ?", [id]);
    return result;
  }
};

module.exports = User;