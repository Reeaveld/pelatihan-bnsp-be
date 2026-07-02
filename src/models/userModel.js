const db = require("../config/database");

const User = {
  async findAll() {
    const [rows] = await db.query(
      "SELECT id, nama, nohp, email, gender FROM user ORDER BY id DESC"
    );
    return rows;
  },

  async findById(id) {
    const [rows] = await db.query(
      "SELECT id, nama, nohp, email, gender FROM user WHERE id = ?",
      [id]
    );
    return rows[0];
  },

  async create(data) {
    const sql = `
      INSERT INTO user (nama, nohp, email, gender)
      VALUES (?, ?, ?, ?)
    `;
    const [result] = await db.query(sql, [
      data.nama,
      data.nohp,
      data.email,
      data.gender
    ]);
    return result;
  },

  async update(id, data) {
    const sql = `
      UPDATE user
      SET nama = ?, nohp = ?, email = ?, gender = ?
      WHERE id = ?
    `;
    const [result] = await db.query(sql, [
      data.nama,
      data.nohp,
      data.email,
      data.gender,
      id
    ]);
    return result;
  },

  async delete(id) {
    const [result] = await db.query("DELETE FROM user WHERE id = ?", [id]);
    return result;
  }
};

module.exports = User;