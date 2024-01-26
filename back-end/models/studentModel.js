const pool = require("../db/connection");

exports.getStudents = async () => {
  try {
    const result = await pool.query("SELECT * FROM students");
    return result.rows;
  } catch (error) {
    throw error;
  }
};

exports.getStudentById = async (id) => {
  try {
    const result = await pool.query("SELECT * FROM students WHERE id = $1", [id]);
    return result.rows;
  } catch (error) {
    throw error;
  }
};
