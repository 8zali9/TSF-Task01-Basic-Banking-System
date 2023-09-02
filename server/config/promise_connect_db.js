const mysql2 = require("mysql2");

const connection = mysql2.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
});

const db = connection.promise();

// used in queries
module.exports = db;
