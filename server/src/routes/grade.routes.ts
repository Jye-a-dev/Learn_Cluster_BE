import { Router } from "express";
import { GradeController } from "../controllers/grade.controller.js";
import {
	createGradeSchema,
	updateGradeSchema,
	idParamSchema,
	submissionIdParamSchema,
	graderIdParamSchema,
	updateFeedbackSchema,
} from "../validators/grade.validator.js";
import { validateBody, validateParams } from "../middlewares/validate.middleware.js";

const router = Router();

// ===== EXISTING ROUTES =====
router.get("/", GradeController.getAll);
router.get("/count", GradeController.count);
router.get("/:id", validateParams(idParamSchema), GradeController.getById);

router.post("/", validateBody(createGradeSchema), GradeController.create);
router.put("/:id", validateParams(idParamSchema), validateBody(updateGradeSchema), GradeController.update);
router.delete("/:id", validateParams(idParamSchema), GradeController.delete);

// ===== NEW/EXTRA ROUTES =====
// Get all grades by submission
router.get("/submission/:submission_id", validateParams(submissionIdParamSchema), GradeController.getBySubmission);

// Get all grades by grader
router.get("/grader/:grader_id", validateParams(graderIdParamSchema), GradeController.getByGrader);

// Update feedback only
router.patch("/:id/feedback", validateParams(idParamSchema), validateBody(updateFeedbackSchema), GradeController.updateFeedback);

// Get top N grades
router.get("/top/:n", GradeController.getTop);

export default router;
