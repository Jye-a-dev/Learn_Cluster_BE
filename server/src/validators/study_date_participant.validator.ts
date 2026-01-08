// src/validators/study_date_participant.validator.ts
import Joi from "joi";

// ===== PARAM :study_date_id =====
export const studyDateIdParamSchema = Joi.object({
	study_date_id: Joi.number().integer().positive().required(),
});

// ===== JOIN / LEAVE STUDY DATE (BODY) =====
export const joinStudyDateSchema = Joi.object({
	study_date_id: Joi.number().integer().positive().required(),
	user_id: Joi.string()
		.guid({ version: ["uuidv4", "uuidv5"] })
		.required(),
});
