// src/routes/study_date_participant.routes.ts
import { Router } from "express";
import { StudyDateParticipantController } from "../controllers/study_date_participant.controller.js";
import { validateBody, validateParams } from "../middlewares/validate.middleware.js";
import { studyDateIdParamSchema, userIdParamSchema, studyDateUserParamSchema, joinStudyDateSchema } from "../validators/study_date_participant.validator.js";

const router = Router();

router.get("/", StudyDateParticipantController.getAll);

router.get("/study-date/:study_date_id", validateParams(studyDateIdParamSchema), StudyDateParticipantController.getByStudyDate);

router.get("/study-date/:study_date_id/count", validateParams(studyDateIdParamSchema), StudyDateParticipantController.count);

router.get("/user/:user_id", validateParams(userIdParamSchema), StudyDateParticipantController.getByUser);

router.get("/user/:user_id/count", validateParams(userIdParamSchema), StudyDateParticipantController.countByUser);

router.get("/study-date/:study_date_id/user/:user_id", validateParams(studyDateUserParamSchema), StudyDateParticipantController.checkJoined);

router.post("/join", validateBody(joinStudyDateSchema), StudyDateParticipantController.join);

router.post("/leave", validateBody(joinStudyDateSchema), StudyDateParticipantController.leave);

router.delete("/study-date/:study_date_id/user/:user_id", validateParams(studyDateUserParamSchema), StudyDateParticipantController.kick);

export default router;
