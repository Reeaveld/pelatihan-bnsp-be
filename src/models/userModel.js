const db = require("../config/database");

const User = {

    async findAll() {

        const [rows] = await db.query(
            "SELECT id, username, email, created_at, updated_at FROM users WHERE deleted_at IS NULL ORDER BY id DESC"
        );

        return rows;

    },

    async findById(id) {

        const [rows] = await db.query(
            "SELECT id, username, email, created_at, updated_at FROM users WHERE id=? AND deleted_at IS NULL",
            [id]
        );

        return rows[0];

    },

    async create(data) {

        const sql = `
            INSERT INTO users
            (username,email,password)
            VALUES(?,?,?)
        `;

        const [result] = await db.query(sql, [
            data.username,
            data.email,
            data.password
        ]);

        return result;

    },

    async update(id,data){

        const sql=`
            UPDATE users
            SET
                username=?,
                email=?,
                password=?,
                updated_at=NOW()
            WHERE id=?
        `;

        const [result]=await db.query(sql,[
            data.username,
            data.email,
            data.password,
            id
        ]);

        return result;

    },

    async delete(id){

        const [result]=await db.query(
            "UPDATE users SET deleted_at=NOW() WHERE id=?",
            [id]
        );

        return result;

    }

};

module.exports = User;