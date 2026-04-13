import { Router } from "express";
import { StudyDateController } from "../studyDate/controller.js";
import { createStudyDateSchema, updateStudyDateSchema, idParamSchema, queryStudyDatesSchema, courseIdParamSchema, updateLessonsSchema } from "../studyDate/validators.js";
import { validateBody, validateParams, validateQuery } from "../../middlewares/validate.middleware.js";

const router = Router();

router.get("/", validateQuery(queryStudyDatesSchema), StudyDateController.getAll);
router.get("/count", StudyDateController.count);
router.get("/id/:id", validateParams(idParamSchema), StudyDateController.getById);
router.get("/id/:id/full", validateParams(idParamSchema), StudyDateController.getFullById);

router.get("/course/:course_id", validateParams(courseIdParamSchema), StudyDateController.getByCourse);
router.get("/upcoming", StudyDateController.getUpcoming);

router.post("/", validateBody(createStudyDateSchema), StudyDateController.create);
router.put("/id/:id", validateParams(idParamSchema), validateBody(updateStudyDateSchema), StudyDateController.update);
router.patch("/id/:id", validateParams(idParamSchema), validateBody(updateStudyDateSchema), StudyDateController.update);
router.delete("/id/:id", validateParams(idParamSchema), StudyDateController.delete);

export default router;
