const { getTeachers, getTeacherById, getAssignmentsByTeacherId } = require("../models/teacherModel");

exports.getTeachers = async (req, res, next) => {
  try {
    const teachers = await getTeachers();
    res.status(200).json({ teachers });
  } catch (error) {
    next(error);
  }
};

exports.getTeacherById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const teacher = await getTeacherById(id);

    if (teacher.length === 0) {
      res.status(404).json({ msg: "Teacher not found" });
    } else {
      res.status(200).json({ teacher });
    }
  } catch (error) {
    next(error);
  }
};

exports.getAssignmentsByTeacherId = async (req, res, next) => {
  const { teacher_id } = req.params;

  try {
    const assignments = await getAssignmentsByTeacherId(teacher_id);
    if (assignments.length === 0) {
      res.status(404).json({ msg: "No assignments found for this teacher" });
    } else {
      res.status(200).json({ assignments });
    }
  } catch (error) {
    next(error);
  }
};