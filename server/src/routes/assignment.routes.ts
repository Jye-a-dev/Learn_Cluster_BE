import { Router } from "express";
import { AssignmentController } from "../controllers/assignment.controller.js";
import {
	createAssignmentSchema,
	updateAssignmentSchema,
	assignmentIdParamSchema,
	courseIdParamSchema,
	queryAssignmentsSchema,
} from "../validators/assignment.validator.js";
import { validateBody, validateParams, validateQuery } from "../middlewares/validate.middleware.js";

const router = Router();

router.get("/", validateQuery(queryAssignmentsSchema), AssignmentController.getAll);
router.get("/count", AssignmentController.count);
router.get("/course/:courseId", validateParams(courseIdParamSchema), AssignmentController.getByCourse);
router.get("/:id", validateParams(assignmentIdParamSchema), AssignmentController.getById);

router.post("/", validateBody(createAssignmentSchema), AssignmentController.create);

router.put("/:id", validateParams(assignmentIdParamSchema), validateBody(updateAssignmentSchema), AssignmentController.update);
router.patch("/:id", validateParams(assignmentIdParamSchema), validateBody(updateAssignmentSchema), AssignmentController.update);

router.delete("/:id", validateParams(assignmentIdParamSchema), AssignmentController.delete);
router.delete("/course/:courseId", validateParams(courseIdParamSchema), AssignmentController.deleteByCourse);

export default router;
