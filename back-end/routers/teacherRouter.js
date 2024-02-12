const { Router } = require("express");
const controller = require("../controllers/teacherController");

const router = Router();

router.get("/", controller.getTeachers);
router.get("/:teacher_id", controller.getTeacherById);
router.get("/:teacher_id/assignments", controller.getAssignmentsByTeacherId);

module.exports = router;
