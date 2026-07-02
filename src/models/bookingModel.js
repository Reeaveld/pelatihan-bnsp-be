const db = require("../config/database");

const Booking = {

    async findAll() {

        const sql = `
            SELECT
                b.id,
                b.watch_at,
                b.seat,
                b.ticket_qty,
                b.price,

                u.id AS user_id,
                u.username,
                u.email,

                m.id AS movie_id,
                m.movie_name,
                m.genre,
                m.image

            FROM bookings b

            INNER JOIN users u
                ON b.user_id=u.id

            INNER JOIN movies m
                ON b.movie_id=m.id

            WHERE b.deleted_at IS NULL

            ORDER BY b.id DESC
        `;

        const [rows]=await db.query(sql);

        return rows;

    },

    async findById(id){

        const sql=`
            SELECT
                b.*,
                u.username,
                u.email,
                m.movie_name,
                m.genre,
                m.image

            FROM bookings b

            INNER JOIN users u
                ON b.user_id=u.id

            INNER JOIN movies m
                ON b.movie_id=m.id

            WHERE b.id=?
        `;

        const [rows]=await db.query(sql,[id]);

        return rows[0];

    },

    async create(data){

        const sql=`
            INSERT INTO bookings
            (user_id,movie_id,watch_at,seat,ticket_qty,price)
            VALUES(?,?,?,?,?,?)
        `;

        const [result]=await db.query(sql,[
            data.user_id,
            data.movie_id,
            data.watch_at,
            data.seat,
            data.ticket_qty,
            data.price
        ]);

        return result;

    },

    async update(id,data){

        const sql=`
            UPDATE bookings
            SET
                user_id=?,
                movie_id=?,
                watch_at=?,
                seat=?,
                ticket_qty=?,
                price=?,
                updated_at=NOW()
            WHERE id=?
        `;

        const [result]=await db.query(sql,[
            data.user_id,
            data.movie_id,
            data.watch_at,
            data.seat,
            data.ticket_qty,
            data.price,
            id
        ]);

        return result;

    },

    async delete(id){

        const [result]=await db.query(
            "UPDATE bookings SET deleted_at=NOW() WHERE id=?",
            [id]
        );

        return result;

    }

};

module.exports = Booking;