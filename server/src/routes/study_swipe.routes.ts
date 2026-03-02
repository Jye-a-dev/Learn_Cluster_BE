import { Router } from "express";
import { StudySwipeController } from "../modules/studySwipe/study_swipe.controller.js";
import { createStudySwipeSchema, updateStudySwipeSchema, studySwipeIdParamSchema, queryStudySwipeSchema } from "../modules/studySwipe/study_swipe.schema.js";
import { validateBody, validateParams, validateQuery } from "../middlewares/validate.middleware.js";

const router = Router();

router.get("/", validateQuery(queryStudySwipeSchema), StudySwipeController.getAll);
router.get("/count", StudySwipeController.count);
router.get("/:id", validateParams(studySwipeIdParamSchema), StudySwipeController.getById);

router.post("/", validateBody(createStudySwipeSchema), StudySwipeController.create);
router.put("/:id", validateParams(studySwipeIdParamSchema), validateBody(updateStudySwipeSchema), StudySwipeController.update);
router.patch("/:id", validateParams(studySwipeIdParamSchema), validateBody(updateStudySwipeSchema), StudySwipeController.update);
router.delete("/:id", validateParams(studySwipeIdParamSchema), StudySwipeController.delete);

export default router;
