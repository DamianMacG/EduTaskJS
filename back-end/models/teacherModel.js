const pool = require("../db/connection");

exports.getTeachers = async () => {
  try {
    const result = await pool.query("SELECT * FROM teachers");
    return result.rows;
  } catch (error) {
    throw error;
  }
};

exports.getTeacherById = async (id) => {
  try {
    const result = await pool.query("SELECT * FROM teachers WHERE id = $1", [id]);
    return result.rows;
  } catch (error) {
    throw error;
  }
};

exports.getAssignmentsByTeacherId = async (id) => {
  try {
    const result = await pool.query(
      "SELECT * FROM assignments WHERE teacher_id = $1",
      [id]
    );
    return result.rows;
  } catch (error) {
    throw error;
  }
};
