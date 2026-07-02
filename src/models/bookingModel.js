const db = require("../config/database");

const Booking = {
  async findAll() {
    const sql = `
      SELECT
        b.id,
        b.seat_number,
        u.id   AS user_id,
        u.nama AS user_nama,
        u.email,
        m.id    AS movie_id,
        m.title AS movie_title,
        m.status
      FROM bookings b
      INNER JOIN user u   ON b.user_id = u.id
      INNER JOIN movies m ON b.movie_id = m.id
      ORDER BY b.id DESC
    `;
    const [rows] = await db.query(sql);
    return rows;
  },

  async findById(id) {
    const sql = `
      SELECT
        b.id,
        b.seat_number,
        u.id AS user_id, u.nama AS user_nama, u.email,
        m.id AS movie_id, m.title AS movie_title
      FROM bookings b
      INNER JOIN user u   ON b.user_id = u.id
      INNER JOIN movies m ON b.movie_id = m.id
      WHERE b.id = ?
    `;
    const [rows] = await db.query(sql, [id]);
    return rows[0];
  },

  async create(data) {
    const sql = `
      INSERT INTO bookings (user_id, movie_id, seat_number)
      VALUES (?, ?, ?)
    `;
    const [result] = await db.query(sql, [
      data.user_id,
      data.movie_id,
      data.seat_number
    ]);
    return result;
  },

  async update(id, data) {
    const sql = `
      UPDATE bookings
      SET user_id = ?, movie_id = ?, seat_number = ?
      WHERE id = ?
    `;
    const [result] = await db.query(sql, [
      data.user_id,
      data.movie_id,
      data.seat_number,
      id
    ]);
    return result;
  },

  async delete(id) {
    const [result] = await db.query("DELETE FROM bookings WHERE id = ?", [id]);
    return result;
  }
};

module.exports = Booking;