import { Router } from "express";
import { StudyDateLessonController } from "../studyDateLesson/study_date_lesson.controller.js";
import {
	createStudyDateLessonSchema,
	updateStudyDateLessonSchema,
	idParamSchema,
	queryStudyDateLessonSchema,
} from "../studyDateLesson/study_date_lesson.validator.js";
import { validateBody, validateParams, validateQuery } from "../../middlewares/validate.middleware.js";

const router = Router();

router.get("/", validateQuery(queryStudyDateLessonSchema), StudyDateLessonController.getAll);

router.get("/count", validateQuery(queryStudyDateLessonSchema), StudyDateLessonController.count);

router.get("/id/:id", validateParams(idParamSchema), StudyDateLessonController.getById);

router.post("/", validateBody(createStudyDateLessonSchema), StudyDateLessonController.create);

router.put("/id/:id", validateParams(idParamSchema), validateBody(updateStudyDateLessonSchema), StudyDateLessonController.update);

router.patch("/id/:id", validateParams(idParamSchema), validateBody(updateStudyDateLessonSchema), StudyDateLessonController.update);

router.delete("/id/:id", validateParams(idParamSchema), StudyDateLessonController.delete);

export default router;
