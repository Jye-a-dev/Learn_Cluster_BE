// src/validators/study_date_participant.validator.ts
import Joi from "joi";

export const studyDateIdParamSchema = Joi.object({
	study_date_id: Joi.number().integer().positive().required(),
});

export const userIdParamSchema = Joi.object({
	user_id: Joi.string()
		.guid({ version: ["uuidv4", "uuidv5"] })
		.required(),
});

export const studyDateUserParamSchema = Joi.object({
	study_date_id: Joi.number().integer().positive().required(),
	user_id: Joi.string()
		.guid({ version: ["uuidv4", "uuidv5"] })
		.required(),
});

export const joinStudyDateSchema = Joi.object({
	study_date_id: Joi.number().integer().positive().required(),
	user_id: Joi.string()
		.guid({ version: ["uuidv4", "uuidv5"] })
		.required(),
});
