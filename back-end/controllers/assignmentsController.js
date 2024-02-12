const {
  getAssignments,
  getAssignmentById,
} = require("../models/assignmentsModel");

exports.getAssignments = async (req, res, next) => {
  try {
    const assignments = await getAssignments();
    res.status(200).json({ assignments });
  } catch (error) {
    next(error);
  }
};

exports.getAssignmentById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const assignment = await getAssignmentById(id);
    if (assignment.length === 0) {
      res.status(404).json({ msg: "Assignment not found" });
    } else {
      res.status(200).json({ assignment });
    }
  } catch (error) {
    next(error);
  }
};
