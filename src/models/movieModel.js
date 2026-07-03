const db = require("../config/database");

const Movie = {
  async findAll() {
    const [rows] = await db.query(
      "SELECT id, title, description, status, jadwal, image FROM movies ORDER BY id DESC"
    );
    return rows;
  },

  async findById(id) {
    const [rows] = await db.query(
      "SELECT id, title, description, status, jadwal, image FROM movies WHERE id = ?",
      [id]
    );
    return rows[0];
  },

  async create(data) {
    const sql = `
      INSERT INTO movies (title, description, status, jadwal, image)
      VALUES (?, ?, ?, ?, ?)
    `;
    const [result] = await db.query(sql, [
      data.title,
      data.description,
      data.status || "Segera Tayang",
      data.jadwal,
      data.image || null
    ]);
    return result;
  },

  async update(id, data) {
    if (data.image) {
      const sql = `
        UPDATE movies
        SET title = ?, description = ?, status = ?, jadwal = ?, image = ?
        WHERE id = ?
      `;
      const [result] = await db.query(sql, [
        data.title,
        data.description,
        data.status,
        data.jadwal,
        data.image,
        id
      ]);
      return result;
    } else {
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
    }
  },

  async delete(id) {
    const [result] = await db.query("DELETE FROM movies WHERE id = ?", [id]);
    return result;
  }
};

module.exports = Movie;