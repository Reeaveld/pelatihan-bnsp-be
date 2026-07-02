const db = require("./src/config/database");

async function testConnection() {
    try {
        const conn = await db.getConnection();
        console.log("✅ Database Connected");
        conn.release();
    } catch (err) {
        console.log(err);
    }
}

testConnection();