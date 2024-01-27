const { Router } = require("express");
const controller = require("../controllers/assignmentsController");

const router = Router();

router.get("/", controller.getAssignments);
router.get("/:id", controller.getAssignmentById);

module.exports = router;
