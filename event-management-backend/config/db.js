const knex = require("knex");
require("dotenv").config();

const db = knex({
  client: "mssql",
  connection: {
    host: "localhost",
    user: process.env.DB_USER,                  // Your SQL Server username
    password: process.env.DB_PASSWORD,          // Your SQL Server password
    database: "EventManagementSystem",          // Your database name
    port: 1433,                                 // SQL Server default port
    options: {
      encrypt: true,
      trustServerCertificate: true,
    },
  },
});

db.raw("SELECT 1")
  .then(() => console.log("Connected to SQL Server successfully!!"))
  .catch((err) => console.error("SQL Server connection failed:", err));

module.exports = db;
