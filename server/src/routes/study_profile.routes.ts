import { Router } from "express";
import { StudyProfileController } from "../modules/studyProfile/study_profile.controller.js";
import {
	createStudyProfileSchema,
	updateStudyProfileSchema,
	studyProfileIdParamSchema,
	userIdParamSchema,
	queryStudyProfileSchema,
} from "../modules/studyProfile/study_profile.schema.js";
import { validateBody, validateParams, validateQuery } from "../middlewares/validate.middleware.js";

const router = Router();

router.get("/", validateQuery(queryStudyProfileSchema), StudyProfileController.getAll);
router.get("/count", StudyProfileController.count);
router.get("/:id", validateParams(studyProfileIdParamSchema), StudyProfileController.getById);
router.get("/user/:userId", validateParams(userIdParamSchema), StudyProfileController.getByUser);

router.post("/", validateBody(createStudyProfileSchema), StudyProfileController.create);
router.put("/:id", validateParams(studyProfileIdParamSchema), validateBody(updateStudyProfileSchema), StudyProfileController.update);
router.patch("/:id", validateParams(studyProfileIdParamSchema), validateBody(updateStudyProfileSchema), StudyProfileController.update);
router.delete("/:id", validateParams(studyProfileIdParamSchema), StudyProfileController.delete);

export default router;
