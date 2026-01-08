// src/routes/study_date_participant.routes.ts
import { Router } from "express";
import { StudyDateParticipantController } from "../controllers/study_date_participant.controller.js";
import {
	validateBody,
	validateParams,
} from "../middlewares/validate.middleware.js";
import {
	studyDateIdParamSchema,
	joinStudyDateSchema,
} from "../validators/study_date_participant.validator.js";

const router = Router();

// ===== GET ALL (ADMIN) =====
router.get("/", StudyDateParticipantController.getAll);

// ===== GET BY STUDY DATE =====
router.get(
	"/study-date/:study_date_id",
	validateParams(studyDateIdParamSchema),
	StudyDateParticipantController.getByStudyDate
);

// ===== COUNT BY STUDY DATE =====
router.get(
	"/study-date/:study_date_id/count",
	validateParams(studyDateIdParamSchema),
	StudyDateParticipantController.count
);

// ===== JOIN STUDY DATE =====
router.post(
	"/join",
	validateBody(joinStudyDateSchema),
	StudyDateParticipantController.join
);

// ===== LEAVE STUDY DATE =====
router.post(
	"/leave",
	validateBody(joinStudyDateSchema),
	StudyDateParticipantController.leave
);

export default router;
