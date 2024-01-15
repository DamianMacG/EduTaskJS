const Pool = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "edutask2",
  password: "Simpson1",
  port: 5432,
});

module.exports = pool;
