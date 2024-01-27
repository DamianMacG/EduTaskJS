const { getTeachers, getTeacherById } = require("../models/teacherModel");

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
    const teachers = await getTeacherById(id);
    res.status(200).json({ teachers });
  } catch (error) {
    next(error);
  }
};
