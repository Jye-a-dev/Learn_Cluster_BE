import { Router } from "express";
import { StudyProfileController } from "../studyProfile/controller.js";
import {
	createStudyProfileSchema,
	updateStudyProfileSchema,
	studyProfileIdParamSchema,
	userIdParamSchema,
	queryStudyProfileSchema,
} from "../studyProfile/validators.js";
import { validateBody, validateParams, validateQuery } from "../../middlewares/validate.middleware.js";

const router = Router();

router.get("/", validateQuery(queryStudyProfileSchema), StudyProfileController.getAll);
router.get("/count", StudyProfileController.count);
router.get("/id/:id", validateParams(studyProfileIdParamSchema), StudyProfileController.getById);
router.get("/user/:userId", validateParams(userIdParamSchema), StudyProfileController.getByUser);

router.post("/", validateBody(createStudyProfileSchema), StudyProfileController.create);
router.put("/id/:id", validateParams(studyProfileIdParamSchema), validateBody(updateStudyProfileSchema), StudyProfileController.update);
router.patch("/id/:id", validateParams(studyProfileIdParamSchema), validateBody(updateStudyProfileSchema), StudyProfileController.update);
router.delete("/id/:id", validateParams(studyProfileIdParamSchema), StudyProfileController.delete);

export default router;
