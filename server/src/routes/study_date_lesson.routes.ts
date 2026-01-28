import { Router } from "express";
import { StudyDateLessonController } from "../controllers/study_date_lesson.controller.js";
import {
	createStudyDateLessonSchema,
	updateStudyDateLessonSchema,
	idParamSchema,
	queryStudyDateLessonSchema,
} from "../validators/study_date_lesson.validator.js";
import { validateBody, validateParams, validateQuery } from "../middlewares/validate.middleware.js";

const router = Router();

router.get("/", validateQuery(queryStudyDateLessonSchema), StudyDateLessonController.getAll);

router.get("/count", validateQuery(queryStudyDateLessonSchema), StudyDateLessonController.count);

router.get("/:id", validateParams(idParamSchema), StudyDateLessonController.getById);

router.post("/", validateBody(createStudyDateLessonSchema), StudyDateLessonController.create);

router.put("/:id", validateParams(idParamSchema), validateBody(updateStudyDateLessonSchema), StudyDateLessonController.update);

router.patch("/:id", validateParams(idParamSchema), validateBody(updateStudyDateLessonSchema), StudyDateLessonController.update);

router.delete("/:id", validateParams(idParamSchema), StudyDateLessonController.delete);

export default router;
