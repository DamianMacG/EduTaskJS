const pool = require("../../db");

exports.getStudents = () => {
  return pool.query("SELECT * FROM students").then((result) => {
    return result.rows;
  });
};
