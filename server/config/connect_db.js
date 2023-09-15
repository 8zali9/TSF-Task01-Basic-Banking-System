const mysql2 = require("mysql2");
// const fs = require("fs");
// const serverCa = [
//   fs.readFileSync("D:/BaltimoreCyberTrustRoot.crt.pem.pem", "utf8"),
// ];

// const connection = mysql2.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DATABASE,
//   port: process.env.DB_PORT,
//   ssl: {
//     rejectUnauthorized: true,
//     ca: serverCa,
//   },
// });

const connection = mysql2.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT,
});

module.exports = connection;
