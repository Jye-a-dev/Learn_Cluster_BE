// src/validators/study_date.validator.ts
import Joi from "joi";

// ===== CREATE =====
export const createStudyDateSchema = Joi.object({
	course_id: Joi.number().integer().required(),
	title: Joi.string().max(255).optional().allow(null, ""),
	lesson_ids: Joi.array().items(Joi.number().integer()).optional().allow(null),
	scheduled_at: Joi.date().optional().allow(null),
	location: Joi.string().optional().allow(null, ""),
	created_by: Joi.string()
		.guid({ version: ["uuidv4", "uuidv5"] })
		.optional()
		.allow(null),
});

// ===== UPDATE =====
export const updateStudyDateSchema = Joi.object({
	course_id: Joi.number().integer().optional(),
	title: Joi.string().max(255).optional().allow(null, ""),
	lesson_ids: Joi.array().items(Joi.number().integer()).optional().allow(null),
	scheduled_at: Joi.date().optional().allow(null),
	location: Joi.string().optional().allow(null, ""),
}).min(1);

// ===== PARAM ID =====
export const idParamSchema = Joi.object({
	id: Joi.number().integer().required(),
});

// ===== QUERY =====
export const queryStudyDatesSchema = Joi.object({
	course_id: Joi.number().integer().optional(),
	created_by: Joi.string()
		.guid({ version: ["uuidv4", "uuidv5"] })
		.optional(),
	page: Joi.number().integer().min(1).optional(),
	limit: Joi.number().integer().min(1).max(100).optional(),
});
