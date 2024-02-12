const { getStudents, getStudentById } = require("../models/studentModel");

exports.getStudents = async (req, res, next) => {
  try {
    const students = await getStudents();
    res.status(200).json({ students });
  } catch (error) {
    next(error);
  }
};

exports.getStudentById = async (req, res, next) => {
  const { id } = req.params;
  
  try {
    const student = await getStudentById(id);

    if (student.length === 0) {
      res.status(404).json({ msg: "Student not found" });
    } else {
      res.status(200).json({ student });
    }
  } catch (error) {
    next(error);
  }
};
