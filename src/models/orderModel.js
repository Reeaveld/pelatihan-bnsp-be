const db = require("../config/database");

const Order = {
  async findAllByUserId(userId) {
    const [rows] = await db.query(
      "SELECT id, user_id, movie_name, watch_at, seat, ticket, price, payment_proof, created_at, updated_at, deleted_at FROM orders WHERE user_id = ? AND deleted_at IS NULL ORDER BY id DESC",
      [userId]
    );
    return rows;
  },

  async create(data) {
    const sql = `
      INSERT INTO orders (user_id, movie_name, watch_at, seat, ticket, price, payment_proof, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
    `;
    const [result] = await db.query(sql, [
      data.user_id,
      data.movie_name,
      data.watch_at,
      data.seat,
      data.ticket,
      data.price,
      data.payment_proof
    ]);
    return result;
  },

  async softDelete(id, userId) {
    const sql = `
      UPDATE orders
      SET deleted_at = NOW()
      WHERE id = ? AND user_id = ?
    `;
    const [result] = await db.query(sql, [id, userId]);
    return result;
  }
};

module.exports = Order;
