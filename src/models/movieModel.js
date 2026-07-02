const db = require("../config/database");

const Movie = {
  async findAll() {
    const [rows] = await db.query(
      "SELECT id, title, description, status, jadwal FROM movies ORDER BY id DESC"
    );
    return rows;
  },

  async findById(id) {
    const [rows] = await db.query(
      "SELECT id, title, description, status, jadwal FROM movies WHERE id = ?",
      [id]
    );
    return rows[0];
  },

  async create(data) {
    const sql = `
      INSERT INTO movies (title, description, status, jadwal)
      VALUES (?, ?, ?, ?)
    `;
    const [result] = await db.query(sql, [
      data.title,
      data.description,
      data.status || "Segera Tayang",
      data.jadwal
    ]);
    return result;
  },

  async update(id, data) {
    const sql = `
      UPDATE movies
      SET title = ?, description = ?, status = ?, jadwal = ?
      WHERE id = ?
    `;
    const [result] = await db.query(sql, [
      data.title,
      data.description,
      data.status,
      data.jadwal,
      id
    ]);
    return result;
  },

  async delete(id) {
    const [result] = await db.query("DELETE FROM movies WHERE id = ?", [id]);
    return result;
  }
};

module.exports = Movie;