import { Router } from "express";
import { StudyMatchController } from "../modules/studyMatch/study_match.controller.js";
import { createStudyMatchSchema, studyMatchIdParamSchema, queryStudyMatchSchema } from "../modules/studyMatch/study_match.schema.js";
import { validateBody, validateParams, validateQuery } from "../middlewares/validate.middleware.js";

const router = Router();

router.get("/", validateQuery(queryStudyMatchSchema), StudyMatchController.getAll);
router.get("/count", StudyMatchController.count);
router.get("/:id", validateParams(studyMatchIdParamSchema), StudyMatchController.getById);

router.post("/", validateBody(createStudyMatchSchema), StudyMatchController.create);
router.delete("/:id", validateParams(studyMatchIdParamSchema), StudyMatchController.delete);

export default router;
