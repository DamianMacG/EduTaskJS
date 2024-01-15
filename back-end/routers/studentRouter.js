const { Router } = require("express");
const controller = require("../controllers/studentsController");

const router = Router();

router.get("/", controller.getStudents);
router.get("/:id", controller.getStudentById);

module.exports = router;
