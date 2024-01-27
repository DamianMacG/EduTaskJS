const { Router } = require("express");
const controller = require("../controllers/teachersController");

const router = Router();

router.get("/", controller.getTeachers);
router.get("/:id", controller.getTeachersById);

module.exports = router;
