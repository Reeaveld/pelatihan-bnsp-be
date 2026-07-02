const db = require("../config/database");

const Movie = {

    async findAll() {
        const [rows] = await db.query(
            "SELECT * FROM movies WHERE deleted_at IS NULL ORDER BY id DESC"
        );
        return rows;
    },

    async findById(id) {
        const [rows] = await db.query(
            "SELECT * FROM movies WHERE id = ? AND deleted_at IS NULL",
            [id]
        );

        return rows[0];
    },

    async create(data) {
        const sql = `
            INSERT INTO movies
            (movie_name, genre, duration, release_date, price, image)
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        const [result] = await db.query(sql, [
            data.movie_name,
            data.genre,
            data.duration,
            data.release_date,
            data.price,
            data.image
        ]);

        return result;
    },

    async update(id, data) {

        const sql = `
            UPDATE movies
            SET
                movie_name=?,
                genre=?,
                duration=?,
                release_date=?,
                price=?,
                image=?,
                updated_at=NOW()
            WHERE id=?
        `;

        const [result] = await db.query(sql, [
            data.movie_name,
            data.genre,
            data.duration,
            data.release_date,
            data.price,
            data.image,
            id
        ]);

        return result;

    },

    async delete(id) {

        const [result] = await db.query(
            "UPDATE movies SET deleted_at=NOW() WHERE id=?",
            [id]
        );

        return result;
    }

};

module.exports = Movie;