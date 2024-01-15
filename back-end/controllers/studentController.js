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
    res.status(200).json({ student });
  } catch (error) {
    next(error);
  }
};
