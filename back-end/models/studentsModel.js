const pool = require("../db");

exports.getStudents = () => {
  return pool.query("SELECT * FROM students").then((result) => {
    return result.rows;
  });
};
exports.getStudentsById = (id) => {
  return pool
    .query("SELECT * FROM students WHERE id = $1", [id])
    .then((result) => {
      return result.rows;
    });
};
