const mysql = require('mysql2');
require('dotenv').config();

const conn = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  // charset: process.env.DB_CHARSET,
  database: process.env.DB_DATABASE,
  // timezone: process.env.DB_TIMEZONE
});

conn.getConnection((err) => {
  if (err) throw err;
  console.log('Connected!');
});

module.exports = conn;
