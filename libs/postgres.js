const { Client } = require("pg");

async funtion getConnection() {
    const client = new Client({
    host: "localhost",
    port: 5432,
    user: "miguel",
    password: "admin123",
    database: "my_store"
    });
    await client.connect();
    return client;
}

module.exports = getConnection;