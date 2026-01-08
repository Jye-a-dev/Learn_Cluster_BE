import Joi from "joi";

// ===== CREATE MESSAGE =====
export const createMessageSchema = Joi.object({
	study_date_id: Joi.number().integer().positive().required(),

	sender_id: Joi.string()
		.guid({ version: ["uuidv4", "uuidv5"] })
		.optional()
		.allow(null),

	content: Joi.string().optional().allow(null),
});

// ===== PARAM :id =====
export const messageIdParamSchema = Joi.object({
	id: Joi.number().integer().positive().required(),
});

// ===== PARAM :study_date_id =====
export const messageStudyDateParamSchema = Joi.object({
	study_date_id: Joi.number().integer().positive().required(),
});

export const updateMessageSchema = Joi.object({
	content: Joi.string().optional().allow(null, "")
}).min(1);
