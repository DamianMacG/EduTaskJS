const { getStudents } = require("./models");

exports.getStudents = (req, res, next) => {
  getStudents()
    .then((students) => {
      res.status(200).json({ students });
    })
    .catch(next);
};
