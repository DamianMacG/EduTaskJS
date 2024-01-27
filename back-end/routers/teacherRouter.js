const { Router } = require("express");
const controller = require("../controllers/teacherController");

const router = Router();

router.get("/", controller.getTeachers);
router.get("/:id", controller.getTeacherById);

module.exports = router;
