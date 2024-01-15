const { getStudents, getStudentsById } = require("./models");

exports.getStudents = (req, res, next) => {
  getStudents()
    .then((students) => {
      res.status(200).json({ students });
    })
    .catch(next);
};
exports.getStudentById = (req, res, next) => {
  const { id } = req.params;
  getStudentsById(id)
    .then((students) => {
      res.status(200).json({ students });
    })
    .catch(next);
};
