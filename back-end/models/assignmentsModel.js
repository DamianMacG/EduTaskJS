const pool = require("../db/connection");

exports.getAssignments = async () => {
  try {
    const result = await pool.query("SELECT * FROM assignments");
    return result.rows;
  } catch (error) {
    throw error;
  }
};

exports.getAssignmentById = async (id) => {
  try {
    const result = await pool.query("SELECT * FROM assignments WHERE id = $1", [id]);
    return result.rows;
  } catch (error) {
    throw error;
  }
};