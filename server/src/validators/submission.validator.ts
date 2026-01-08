import Joi from "joi";

// ===== CREATE SUBMISSION =====
export const createSubmissionSchema = Joi.object({
	assignment_id: Joi.number().integer().required(),
	student_id: Joi.string().guid({ version: ["uuidv4", "uuidv5"] }).required(),
	file_url: Joi.string().optional().allow(null, ""),
	text_submission: Joi.string().optional().allow(null, ""),
});

// ===== UPDATE SUBMISSION =====
export const updateSubmissionSchema = Joi.object({
	assignment_id: Joi.number().integer().optional(),
	student_id: Joi.string().guid({ version: ["uuidv4", "uuidv5"] }).optional(),
	file_url: Joi.string().optional().allow(null, ""),
	text_submission: Joi.string().optional().allow(null, ""),
}).min(1);

// ===== GET / DELETE SUBMISSION BY ID =====
export const idParamSchema = Joi.object({
	id: Joi.number().integer().required(),
});
