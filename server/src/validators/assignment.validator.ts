import Joi from "joi";

// ===== CREATE ASSIGNMENT =====
export const createAssignmentSchema = Joi.object({
	course_id: Joi.number().integer().required(),
	title: Joi.string().optional().allow(null, ""),
	description: Joi.string().optional().allow(null, ""),
	file_url: Joi.string().optional().allow(null, ""),
	deadline: Joi.date().optional().allow(null),
});

// ===== UPDATE ASSIGNMENT =====
export const updateAssignmentSchema = Joi.object({
	course_id: Joi.number().integer().optional(),
	title: Joi.string().optional().allow(null, ""),
	description: Joi.string().optional().allow(null, ""),
	file_url: Joi.string().optional().allow(null, ""),
	deadline: Joi.date().optional().allow(null),
}).min(1);

// ===== GET / DELETE ASSIGNMENT BY ID =====
export const idParamSchema = Joi.object({
	id: Joi.number().integer().required(),
});
